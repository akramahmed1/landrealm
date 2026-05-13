import { createRouter } from "./middleware";
import { authRouter } from "./auth-router";

// Feature routers
import { zoningRouter } from "./routers/zoning";
import { contractorRouter } from "./routers/contractor";
import { propertyRouter } from "./routers/property";
import { permitRouter } from "./routers/permit";
import { financingRouter } from "./routers/financing";
import { alertRouter } from "./routers/alert";
import { userRouter } from "./routers/user";

export const appRouter = createRouter({
  auth: authRouter,
  zoning: zoningRouter,
  contractor: contractorRouter,
  property: propertyRouter,
  permit: permitRouter,
  financing: financingRouter,
  alert: alertRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
