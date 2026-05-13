import { relations } from "drizzle-orm";
import {
  users, properties, zoningRules, zoningResults,
  projects, permits, milestones, documents, contractors, bids,
  aiResponses, subscriptions, savedSearches, activityLog,
} from "./schema";

export const usersRelations = relations(users, ({ many }) => ({
  properties: many(properties),
  projects: many(projects),
  documents: many(documents),
  subscriptions: many(subscriptions),
  savedSearches: many(savedSearches),
  aiResponses: many(aiResponses),
}));

export const propertiesRelations = relations(properties, ({ one, many }) => ({
  user: one(users, { fields: [properties.userId], references: [users.id] }),
  projects: many(projects),
  zoningResults: many(zoningResults),
  aiResponses: many(aiResponses),
}));

export const zoningRulesRelations = relations(zoningRules, ({ many }) => ({
  results: many(zoningResults),
}));

export const zoningResultsRelations = relations(zoningResults, ({ one }) => ({
  property: one(properties, { fields: [zoningResults.propertyId], references: [properties.id] }),
  rule: one(zoningRules, { fields: [zoningResults.zoningRuleId], references: [zoningRules.id] }),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  user: one(users, { fields: [projects.userId], references: [users.id] }),
  property: one(properties, { fields: [projects.propertyId], references: [properties.id] }),
  permits: many(permits),
  milestones: many(milestones),
  documents: many(documents),
}));

export const permitsRelations = relations(permits, ({ one }) => ({
  project: one(projects, { fields: [permits.projectId], references: [projects.id] }),
}));

export const milestonesRelations = relations(milestones, ({ one, many }) => ({
  project: one(projects, { fields: [milestones.projectId], references: [projects.id] }),
  documents: many(documents),
}));

export const documentsRelations = relations(documents, ({ one }) => ({
  user: one(users, { fields: [documents.userId], references: [users.id] }),
  project: one(projects, { fields: [documents.projectId], references: [projects.id] }),
  milestone: one(milestones, { fields: [documents.milestoneId], references: [milestones.id] }),
}));

export const contractorsRelations = relations(contractors, ({ many }) => ({
  bids: many(bids),
}));

export const bidsRelations = relations(bids, ({ one }) => ({
  project: one(projects, { fields: [bids.projectId], references: [projects.id] }),
  contractor: one(contractors, { fields: [bids.contractorId], references: [contractors.id] }),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, { fields: [subscriptions.userId], references: [users.id] }),
}));

export const savedSearchesRelations = relations(savedSearches, ({ one }) => ({
  user: one(users, { fields: [savedSearches.userId], references: [users.id] }),
}));

export const aiResponsesRelations = relations(aiResponses, ({ one }) => ({
  user: one(users, { fields: [aiResponses.userId], references: [users.id] }),
  property: one(properties, { fields: [aiResponses.propertyId], references: [properties.id] }),
}));

export const activityLogRelations = relations(activityLog, ({ one }) => ({
  user: one(users, { fields: [activityLog.userId], references: [users.id] }),
}));
