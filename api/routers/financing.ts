import { z } from "zod";
import { publicQuery, createRouter } from "../middleware";
import { getDb } from "../queries/connection";
import { financingOptions } from "../../db/schema";
import { eq } from "drizzle-orm";

export const financingRouter = createRouter({
  list: publicQuery
    .input(z.object({ loanType: z.string().optional() }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      const where = input?.loanType ? eq(financingOptions.loanType, input.loanType) : eq(financingOptions.isActive, true);
      return (await db.query.financingOptions.findMany({ where })).map(r => ({
        ...r,
        disclaimer: "Educational information only. Landrealm is NOT a mortgage broker or lender.",
      }));
    }),
});
