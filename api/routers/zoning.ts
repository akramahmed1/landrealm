import { z } from "zod";
import { publicQuery, createRouter } from "../middleware";
import { getDb } from "../queries/connection";
import { zoningRules, overlayLayers } from "../../db/schema";
import { eq, and, type SQL } from "drizzle-orm";

export const zoningRouter = createRouter({
  lookupByZone: publicQuery
    .input(z.object({
      jurisdictionCode: z.string().default("AUS-TX"),
      zoneCode: z.string().min(1),
    }))
    .query(async ({ input }) => {
      const db = getDb();
      const rule = await db.query.zoningRules.findFirst({
        where: and(
          eq(zoningRules.jurisdictionCode, input.jurisdictionCode),
          eq(zoningRules.zoneCode, input.zoneCode)
        ),
      });
      if (!rule) return null;
      return {
        ...rule,
        disclaimer: "This is general zoning information only. Verify with the City of Austin Planning Department before making decisions.",
      };
    }),

  listRules: publicQuery
    .input(z.object({
      jurisdictionCode: z.string().default("AUS-TX"),
      category: z.string().optional(),
    }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      let where: SQL;
      if (input?.category) {
        where = and(
          eq(zoningRules.jurisdictionCode, input.jurisdictionCode || "AUS-TX"),
          eq(zoningRules.zoneCategory, input.category)
        ) ?? eq(zoningRules.jurisdictionCode, input.jurisdictionCode || "AUS-TX");
      } else {
        where = eq(zoningRules.jurisdictionCode, input?.jurisdictionCode || "AUS-TX");
      }
      return db.query.zoningRules.findMany({ where });
    }),

  getOverlays: publicQuery
    .input(z.object({
      jurisdiction: z.string().default("City of Austin"),
      types: z.array(z.string()).optional(),
    }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      const layers = await db.query.overlayLayers.findMany({
        where: and(
          eq(overlayLayers.isActive, true),
          eq(overlayLayers.jurisdiction, input?.jurisdiction || "City of Austin")
        ) ?? eq(overlayLayers.isActive, true),
      });
      return layers.map(l => ({
        ...l,
        disclaimer: "Data sourced from public GIS records. Verify directly with the issuing authority.",
      }));
    }),
});
