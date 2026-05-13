import { z } from "zod";
import { authedQuery, createRouter } from "../middleware";
import { getDb } from "../queries/connection";
import { properties } from "../../db/schema";
import { eq, and, desc } from "drizzle-orm";

export const propertyRouter = createRouter({
  list: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    return db.query.properties.findMany({
      where: eq(properties.userId, ctx.user.id),
      orderBy: desc(properties.createdAt),
    });
  }),

  byId: authedQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = getDb();
      return db.query.properties.findFirst({
        where: and(eq(properties.id, input.id), eq(properties.userId, ctx.user.id)),
      });
    }),

  create: authedQuery
    .input(z.object({
      address: z.string().min(5), city: z.string().min(2),
      state: z.string().length(2), zip: z.string().min(5),
      lat: z.number().optional(), lng: z.number().optional(),
      lotSizeSqft: z.number().optional(),
      zoningDistrict: z.string().optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const [result] = await db.insert(properties).values({
        userId: ctx.user.id, ...input,
      }).$returningId();
      return { id: result.id, ...input };
    }),

  delete: authedQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      await db.delete(properties).where(
        and(eq(properties.id, input.id), eq(properties.userId, ctx.user.id))
      );
      return { success: true };
    }),
});
