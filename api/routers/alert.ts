import { z } from "zod";
import { publicQuery, createRouter } from "../middleware";
import { getDb } from "../queries/connection";
import { regulatoryAlerts } from "../../db/schema";
import { eq, and, desc, type SQL } from "drizzle-orm";

export const alertRouter = createRouter({
  list: publicQuery
    .input(z.object({
      jurisdiction: z.string().optional(),
      type: z.string().optional(),
    }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      let where: SQL = eq(regulatoryAlerts.isActive, true);
      if (input?.jurisdiction) where = and(where, eq(regulatoryAlerts.jurisdiction, input.jurisdiction)) ?? where;
      if (input?.type) where = and(where, eq(regulatoryAlerts.alertType, input.type)) ?? where;
      return db.query.regulatoryAlerts.findMany({ where, orderBy: desc(regulatoryAlerts.createdAt) });
    }),
});
