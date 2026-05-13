import { z } from "zod";
import { publicQuery, createRouter } from "../middleware";
import { getDb } from "../queries/connection";
import { contractors } from "../../db/schema";
import { eq, and, gte, like, desc, type SQL } from "drizzle-orm";

export const contractorRouter = createRouter({
  list: publicQuery
    .input(z.object({
      specialty: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      minRating: z.number().min(0).max(5).optional(),
      isVerified: z.boolean().optional(),
      limit: z.number().max(50).default(20),
    }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      let where: SQL = eq(contractors.isActive, true);
      if (input?.specialty) where = and(where, like(contractors.specialty, `%${input.specialty}%`)) ?? where;
      if (input?.city) where = and(where, eq(contractors.city, input.city)) ?? where;
      if (input?.state) where = and(where, eq(contractors.state, input.state)) ?? where;
      if (input?.minRating) where = and(where, gte(contractors.rating, String(input.minRating))) ?? where;
      if (input?.isVerified !== undefined) where = and(where, eq(contractors.isVerified, input.isVerified)) ?? where;
      return db.query.contractors.findMany({ where, orderBy: desc(contractors.rating), limit: input?.limit || 20 });
    }),

  byId: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db.query.contractors.findFirst({ where: eq(contractors.id, input.id) });
    }),
});
