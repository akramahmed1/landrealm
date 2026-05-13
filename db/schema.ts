import {
  mysqlTable, serial, varchar, text, int, bigint,
  decimal, boolean, datetime, json, index, uniqueIndex, float,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

// ─── USERS ───
export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  unionId: varchar('union_id', { length: 255 }).unique(),
  email: varchar('email', { length: 255 }).unique(),
  name: varchar('name', { length: 255 }),
  avatar: varchar('avatar', { length: 500 }),
  phone: varchar('phone', { length: 20 }),
  company: varchar('company', { length: 255 }),
  tier: varchar('tier', { length: 20 }).notNull().default('free'),
  role: varchar('role', { length: 20 }).notNull().default('user'),
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),
  onboardingComplete: boolean('onboarding_complete').default(false),
  lastSignInAt: datetime('last_sign_in_at', { mode: 'date', fsp: 3 }),
  createdAt: datetime('created_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`),
  updatedAt: datetime('updated_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).$onUpdate(() => new Date()),
}, (table) => [
  index('idx_users_tier').on(table.tier),
  index('idx_users_email').on(table.email),
  index('idx_users_union').on(table.unionId),
]);

// ─── PROPERTIES ───
export const properties = mysqlTable('properties', {
  id: serial('id').primaryKey(),
  userId: bigint('user_id', { mode: 'number', unsigned: true }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  address: varchar('address', { length: 500 }).notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  state: varchar('state', { length: 10 }).notNull(),
  zip: varchar('zip', { length: 20 }).notNull(),
  lat: float('lat'),
  lng: float('lng'),
  lotSizeSqft: int('lot_size_sqft', { unsigned: true }),
  lotWidthFt: int('lot_width_ft', { unsigned: true }),
  lotDepthFt: int('lot_depth_ft', { unsigned: true }),
  zoningDistrict: varchar('zoning_district', { length: 50 }),
  zoningName: varchar('zoning_name', { length: 255 }),
  stories: int('stories', { unsigned: true }).default(1),
  architecturalStyle: varchar('architectural_style', { length: 50 }),
  isFavorite: boolean('is_favorite').default(false),
  notes: text('notes'),
  createdAt: datetime('created_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`),
  updatedAt: datetime('updated_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).$onUpdate(() => new Date()),
}, (table) => [
  index('idx_props_user').on(table.userId),
  index('idx_props_address').on(table.address),
  index('idx_props_zoning').on(table.zoningDistrict),
]);

// ─── ZONING RULES (Reference) ───
export const zoningRules = mysqlTable('zoning_rules', {
  id: serial('id').primaryKey(),
  jurisdiction: varchar('jurisdiction', { length: 100 }).notNull(),
  jurisdictionCode: varchar('jurisdiction_code', { length: 20 }).notNull(),
  zoneCode: varchar('zone_code', { length: 50 }).notNull(),
  zoneName: varchar('zone_name', { length: 255 }).notNull(),
  zoneCategory: varchar('zone_category', { length: 50 }).notNull(),
  lotSizeMinSqft: int('lot_size_min_sqft', { unsigned: true }),
  lotWidthMinFt: int('lot_width_min_ft', { unsigned: true }),
  frontSetbackFt: int('front_setback_ft', { unsigned: true }),
  rearSetbackFt: int('rear_setback_ft', { unsigned: true }),
  sideSetbackFt: int('side_setback_ft', { unsigned: true }),
  maxHeightFt: int('max_height_ft', { unsigned: true }),
  maxStories: int('max_stories', { unsigned: true }),
  farMax: decimal('far_max', { precision: 4, scale: 2 }),
  coverageMaxPct: int('coverage_max_pct', { unsigned: true }),
  parkingRequired: varchar('parking_required', { length: 255 }),
  permittedUses: json('permitted_uses'),
  prohibitedUses: json('prohibited_uses'),
  overlayDistricts: json('overlay_districts'),
  specialRequirements: text('special_requirements'),
  ordinanceUrl: varchar('ordinance_url', { length: 500 }),
  effectiveDate: datetime('effective_date', { mode: 'date' }),
  lastVerifiedAt: datetime('last_verified_at', { mode: 'date' }),
  source: varchar('source', { length: 255 }),
  createdAt: datetime('created_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`),
  updatedAt: datetime('updated_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).$onUpdate(() => new Date()),
}, (table) => [
  uniqueIndex('idx_zoning_unique').on(table.jurisdictionCode, table.zoneCode),
  index('idx_zoning_jurisdiction').on(table.jurisdictionCode),
  index('idx_zoning_category').on(table.zoneCategory),
]);

// ─── ZONING RESULTS (User-specific) ───
export const zoningResults = mysqlTable('zoning_results', {
  id: serial('id').primaryKey(),
  propertyId: bigint('property_id', { mode: 'number', unsigned: true }).notNull().references(() => properties.id, { onDelete: 'cascade' }),
  zoningRuleId: bigint('zoning_rule_id', { mode: 'number', unsigned: true }).references(() => zoningRules.id),
  isCompliant: boolean('is_compliant'),
  buildableAreaSqft: int('buildable_area_sqft', { unsigned: true }),
  aiSummary: text('ai_summary'),
  createdAt: datetime('created_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`),
}, (table) => [
  index('idx_zr_property').on(table.propertyId),
]);

// ─── OVERLAY LAYERS ───
export const overlayLayers = mysqlTable('overlay_layers', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  displayName: varchar('display_name', { length: 255 }).notNull(),
  description: text('description'),
  jurisdiction: varchar('jurisdiction', { length: 100 }).notNull(),
  polygonData: json('polygon_data'),
  metadata: json('metadata'),
  source: varchar('source', { length: 255 }),
  lastUpdated: datetime('last_updated', { mode: 'date' }),
  isActive: boolean('is_active').default(true),
  createdAt: datetime('created_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`),
}, (table) => [
  index('idx_ol_type').on(table.type),
  index('idx_ol_jurisdiction').on(table.jurisdiction),
  index('idx_ol_active').on(table.isActive),
]);

// ─── PROJECTS ───
export const projects = mysqlTable('projects', {
  id: serial('id').primaryKey(),
  userId: bigint('user_id', { mode: 'number', unsigned: true }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  propertyId: bigint('property_id', { mode: 'number', unsigned: true }).references(() => properties.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  status: varchar('status', { length: 20 }).notNull().default('draft'),
  projectType: varchar('project_type', { length: 50 }),
  budgetTotal: decimal('budget_total', { precision: 14, scale: 2 }),
  startDate: datetime('start_date', { mode: 'date' }),
  targetCompletion: datetime('target_completion', { mode: 'date' }),
  createdAt: datetime('created_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`),
  updatedAt: datetime('updated_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).$onUpdate(() => new Date()),
}, (table) => [
  index('idx_proj_user').on(table.userId),
  index('idx_proj_status').on(table.status),
  index('idx_proj_property').on(table.propertyId),
]);

// ─── PERMITS ───
export const permits = mysqlTable('permits', {
  id: serial('id').primaryKey(),
  projectId: bigint('project_id', { mode: 'number', unsigned: true }).notNull().references(() => projects.id, { onDelete: 'cascade' }),
  permitNumber: varchar('permit_number', { length: 100 }),
  permitType: varchar('permit_type', { length: 100 }).notNull(),
  status: varchar('status', { length: 20 }).notNull().default('pending'),
  jurisdiction: varchar('jurisdiction', { length: 100 }).notNull(),
  submittedAt: datetime('submitted_at', { mode: 'date' }),
  approvedAt: datetime('approved_at', { mode: 'date' }),
  expiresAt: datetime('expires_at', { mode: 'date' }),
  estimatedDays: int('estimated_days', { unsigned: true }),
  fees: decimal('fees', { precision: 10, scale: 2 }),
  dependencies: json('dependencies'),
  createdAt: datetime('created_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`),
  updatedAt: datetime('updated_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).$onUpdate(() => new Date()),
}, (table) => [
  index('idx_permit_project').on(table.projectId),
  index('idx_permit_status').on(table.status),
  index('idx_permit_type').on(table.permitType),
]);

// ─── MILESTONES ───
export const milestones = mysqlTable('milestones', {
  id: serial('id').primaryKey(),
  projectId: bigint('project_id', { mode: 'number', unsigned: true }).notNull().references(() => projects.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  status: varchar('status', { length: 20 }).notNull().default('upcoming'),
  dueDate: datetime('due_date', { mode: 'date' }),
  completedAt: datetime('completed_at', { mode: 'date' }),
  createdAt: datetime('created_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`),
  updatedAt: datetime('updated_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).$onUpdate(() => new Date()),
}, (table) => [
  index('idx_ms_project').on(table.projectId),
  index('idx_ms_status').on(table.status),
  index('idx_ms_due').on(table.dueDate),
]);

// ─── DOCUMENTS ───
export const documents = mysqlTable('documents', {
  id: serial('id').primaryKey(),
  userId: bigint('user_id', { mode: 'number', unsigned: true }).notNull().references(() => users.id),
  projectId: bigint('project_id', { mode: 'number', unsigned: true }).references(() => projects.id, { onDelete: 'cascade' }),
  milestoneId: bigint('milestone_id', { mode: 'number', unsigned: true }).references(() => milestones.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 255 }).notNull(),
  docType: varchar('doc_type', { length: 50 }).notNull(),
  storageKey: varchar('storage_key', { length: 500 }).notNull(),
  fileSize: int('file_size', { unsigned: true }),
  mimeType: varchar('mime_type', { length: 100 }),
  isGenerated: boolean('is_generated').default(false),
  generatedByAi: boolean('generated_by_ai').default(false),
  createdAt: datetime('created_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`),
}, (table) => [
  index('idx_doc_user').on(table.userId),
  index('idx_doc_project').on(table.projectId),
]);

// ─── CONTRACTORS ───
export const contractors = mysqlTable('contractors', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  specialty: varchar('specialty', { length: 100 }).notNull(),
  licenseNumber: varchar('license_number', { length: 100 }),
  licenseState: varchar('license_state', { length: 10 }),
  rating: decimal('rating', { precision: 3, scale: 2 }),
  reviewCount: int('review_count', { unsigned: true }).default(0),
  yearsExperience: int('years_experience', { unsigned: true }),
  projectsCompleted: int('projects_completed', { unsigned: true }),
  phone: varchar('phone', { length: 20 }),
  email: varchar('email', { length: 255 }),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 10 }),
  bio: text('bio'),
  services: json('services'),
  isVerified: boolean('is_verified').default(false),
  disclaimer: text('disclaimer'),
  isActive: boolean('is_active').default(true),
  createdAt: datetime('created_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`),
}, (table) => [
  index('idx_contractor_specialty').on(table.specialty),
  index('idx_contractor_location').on(table.city, table.state),
  index('idx_contractor_rating').on(table.rating),
  index('idx_contractor_active').on(table.isActive),
]);

// ─── BIDS ───
export const bids = mysqlTable('bids', {
  id: serial('id').primaryKey(),
  projectId: bigint('project_id', { mode: 'number', unsigned: true }).notNull().references(() => projects.id, { onDelete: 'cascade' }),
  contractorId: bigint('contractor_id', { mode: 'number', unsigned: true }).references(() => contractors.id),
  contractorName: varchar('contractor_name', { length: 255 }).notNull(),
  status: varchar('status', { length: 20 }).notNull().default('draft'),
  totalCost: decimal('total_cost', { precision: 14, scale: 2 }).notNull(),
  timelineMonths: int('timeline_months', { unsigned: true }),
  materials: json('materials'),
  breakdown: json('breakdown'),
  notes: text('notes'),
  submittedAt: datetime('submitted_at', { mode: 'date' }),
  createdAt: datetime('created_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`),
}, (table) => [
  index('idx_bid_project').on(table.projectId),
  index('idx_bid_contractor').on(table.contractorId),
]);

// ─── REGULATORY ALERTS ───
export const regulatoryAlerts = mysqlTable('regulatory_alerts', {
  id: serial('id').primaryKey(),
  jurisdiction: varchar('jurisdiction', { length: 100 }).notNull(),
  alertType: varchar('alert_type', { length: 50 }).notNull(),
  severity: varchar('severity', { length: 20 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  summary: text('summary').notNull(),
  fullText: text('full_text'),
  effectiveDate: datetime('effective_date', { mode: 'date' }),
  source: varchar('source', { length: 255 }).notNull(),
  sourceUrl: varchar('source_url', { length: 500 }),
  isActive: boolean('is_active').default(true),
  createdAt: datetime('created_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`),
}, (table) => [
  index('idx_alert_jurisdiction').on(table.jurisdiction),
  index('idx_alert_type').on(table.alertType),
  index('idx_alert_severity').on(table.severity),
  index('idx_alert_active').on(table.isActive),
]);

// ─── FINANCING OPTIONS ───
export const financingOptions = mysqlTable('financing_options', {
  id: serial('id').primaryKey(),
  lenderName: varchar('lender_name', { length: 255 }).notNull(),
  loanType: varchar('loan_type', { length: 100 }).notNull(),
  rateApr: varchar('rate_apr', { length: 20 }),
  term: varchar('term', { length: 50 }),
  minDownPayment: varchar('min_down_payment', { length: 20 }),
  features: json('features'),
  requirements: json('requirements'),
  contactInfo: json('contact_info'),
  isActive: boolean('is_active').default(true),
  disclaimer: text('disclaimer'),
  createdAt: datetime('created_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`),
}, (table) => [
  index('idx_fin_type').on(table.loanType),
  index('idx_fin_active').on(table.isActive),
]);

// ─── AI RESPONSES (Cache) ───
export const aiResponses = mysqlTable('ai_responses', {
  id: serial('id').primaryKey(),
  userId: bigint('user_id', { mode: 'number', unsigned: true }).references(() => users.id),
  propertyId: bigint('property_id', { mode: 'number', unsigned: true }).references(() => properties.id),
  feature: varchar('feature', { length: 50 }).notNull(),
  promptHash: varchar('prompt_hash', { length: 64 }).notNull(),
  prompt: text('prompt'),
  response: json('response').notNull(),
  model: varchar('model', { length: 50 }).default('gpt-4o'),
  tokensUsed: int('tokens_used', { unsigned: true }),
  costUsd: decimal('cost_usd', { precision: 8, scale: 6 }),
  createdAt: datetime('created_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`),
}, (table) => [
  index('idx_ai_feature').on(table.feature),
  index('idx_ai_property').on(table.propertyId),
  index('idx_ai_created').on(table.createdAt),
]);

// ─── SUBSCRIPTIONS ───
export const subscriptions = mysqlTable('subscriptions', {
  id: serial('id').primaryKey(),
  userId: bigint('user_id', { mode: 'number', unsigned: true }).notNull().references(() => users.id),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }).notNull().unique(),
  stripePriceId: varchar('stripe_price_id', { length: 255 }).notNull(),
  tier: varchar('tier', { length: 20 }).notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  currentPeriodStart: datetime('current_period_start', { mode: 'date' }),
  currentPeriodEnd: datetime('current_period_end', { mode: 'date' }),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false),
  amount: int('amount', { unsigned: true }),
  currency: varchar('currency', { length: 3 }).default('usd'),
  createdAt: datetime('created_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`),
  updatedAt: datetime('updated_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).$onUpdate(() => new Date()),
}, (table) => [
  index('idx_sub_user').on(table.userId),
  index('idx_sub_stripe').on(table.stripeSubscriptionId),
]);

// ─── SAVED SEARCHES ───
export const savedSearches = mysqlTable('saved_searches', {
  id: serial('id').primaryKey(),
  userId: bigint('user_id', { mode: 'number', unsigned: true }).notNull().references(() => users.id),
  name: varchar('name', { length: 255 }).notNull(),
  address: varchar('address', { length: 500 }),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 10 }),
  zip: varchar('zip', { length: 20 }),
  alertEnabled: boolean('alert_enabled').default(false),
  createdAt: datetime('created_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`),
}, (table) => [
  index('idx_saved_user').on(table.userId),
]);

// ─── ACTIVITY LOG (Audit) ───
export const activityLog = mysqlTable('activity_log', {
  id: serial('id').primaryKey(),
  userId: bigint('user_id', { mode: 'number', unsigned: true }).references(() => users.id),
  action: varchar('action', { length: 50 }).notNull(),
  entityType: varchar('entity_type', { length: 50 }).notNull(),
  entityId: bigint('entity_id', { mode: 'number', unsigned: true }),
  details: json('details'),
  createdAt: datetime('created_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`),
}, (table) => [
  index('idx_act_user').on(table.userId),
  index('idx_act_action').on(table.action),
  index('idx_act_created').on(table.createdAt),
]);

// ─── AI PROMPT TEMPLATES ───
export const promptTemplates = mysqlTable('prompt_templates', {
  id: serial('id').primaryKey(),
  feature: varchar('feature', { length: 50 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  systemPrompt: text('system_prompt').notNull(),
  userPromptTemplate: text('user_prompt_template').notNull(),
  model: varchar('model', { length: 50 }).default('gpt-4o'),
  temperature: float('temperature').default(0.3),
  maxTokens: int('max_tokens', { unsigned: true }).default(2000),
  bannedWords: json('banned_words'),
  requiredDisclaimers: json('required_disclaimers'),
  isActive: boolean('is_active').default(true),
  createdAt: datetime('created_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`),
  updatedAt: datetime('updated_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).$onUpdate(() => new Date()),
}, (table) => [
  index('idx_pt_feature').on(table.feature),
  index('idx_pt_active').on(table.isActive),
]);

// ─── Type exports for auth compatibility ───
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
