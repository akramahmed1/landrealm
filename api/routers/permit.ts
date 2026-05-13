import { z } from "zod";
import { publicQuery, createRouter } from "../middleware";
import { getDb } from "../queries/connection";
import { permits, milestones } from "../../db/schema";
import { eq } from "drizzle-orm";

export const permitRouter = createRouter({
  listByProject: publicQuery
    .input(z.object({ projectId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db.query.permits.findMany({ where: eq(permits.projectId, input.projectId) });
    }),

  estimateTimeline: publicQuery
    .input(z.object({
      projectType: z.enum(["new_construction", "addition", "adu", "commercial"]),
    }))
    .query(({ input }) => {
      const timelines = {
        new_construction: [
          { phase: "Pre-Application", steps: [{ name: "Pre-application meeting", days: 10 }, { name: "Site survey & soil test", days: 17 }, { name: "Architectural design", days: 42 }] },
          { phase: "Application Review", steps: [{ name: "Plan submission & intake", days: 4 }, { name: "Initial plan review", days: 21 }, { name: "Revisions & resubmission", days: 14 }, { name: "Final approval", days: 10 }] },
          { phase: "Construction Permits", steps: [{ name: "Foundation permit", days: 4 }, { name: "Building permit", days: 7 }, { name: "Trade permits (MEP)", days: 4 }] },
          { phase: "Inspections", steps: [{ name: "Foundation inspection", days: 1 }, { name: "Framing inspection", days: 1 }, { name: "Rough-in inspection", days: 1 }, { name: "Final inspection", days: 2 }, { name: "Certificate of Occupancy", days: 1 }] },
        ],
        addition: [
          { phase: "Application Review", steps: [{ name: "Plan submission", days: 4 }, { name: "Initial review", days: 14 }, { name: "Approval", days: 7 }] },
          { phase: "Permits", steps: [{ name: "Building permit", days: 5 }, { name: "Trade permits", days: 3 }] },
          { phase: "Inspections", steps: [{ name: "Foundation", days: 1 }, { name: "Framing", days: 1 }, { name: "Final", days: 2 }] },
        ],
        adu: [
          { phase: "Application Review", steps: [{ name: "Plan submission", days: 4 }, { name: "Streamlined review", days: 10 }, { name: "Approval", days: 5 }] },
          { phase: "Permits", steps: [{ name: "Building permit", days: 3 }] },
          { phase: "Inspections", steps: [{ name: "Foundation", days: 1 }, { name: "Final", days: 1 }] },
        ],
        commercial: [
          { phase: "Pre-Application", steps: [{ name: "Pre-application meeting", days: 14 }, { name: "Site plan review", days: 30 }] },
          { phase: "Application Review", steps: [{ name: "Plan submission", days: 5 }, { name: "Initial review", days: 30 }, { name: "Revisions", days: 21 }, { name: "Final approval", days: 14 }] },
          { phase: "Permits", steps: [{ name: "Building permit", days: 10 }, { name: "Trade permits", days: 5 }] },
          { phase: "Inspections", steps: [{ name: "Foundation", days: 2 }, { name: "Framing", days: 2 }, { name: "Rough-in", days: 3 }, { name: "Final", days: 3 }] },
        ],
      };
      const t = timelines[input.projectType];
      return {
        timeline: t,
        totalDays: t.reduce((acc, p) => acc + p.steps.reduce((s, st) => s + st.days, 0), 0),
        disclaimer: "Based on historical data. Actual times vary significantly.",
      };
    }),

  milestones: publicQuery
    .input(z.object({ projectId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db.query.milestones.findMany({ where: eq(milestones.projectId, input.projectId) });
    }),
});
