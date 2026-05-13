import { authedQuery, createRouter } from "../middleware";
import { getDb } from "../queries/connection";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

export const userRouter = createRouter({
  me: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    return db.query.users.findFirst({
      where: eq(users.id, ctx.user.id),
      columns: {
        id: true, email: true, name: true, avatar: true,
        phone: true, company: true, tier: true, role: true,
        createdAt: true,
      },
    });
  }),
});
