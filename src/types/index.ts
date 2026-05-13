export type Tier = 'free' | 'pro' | 'premium';

export type ZoningType = 'Single Family' | 'Multi Family' | 'Commercial' | 'Mixed Use';

export type ArchitecturalStyle = 'Modern' | 'Traditional' | 'Craftsman';

export interface PropertyPoint {
  x: number;
  y: number;
}

export interface WizardState {
  step: number;
  propertyPoints: PropertyPoint[];
  propertyWidth: number;
  propertyDepth: number;
  totalArea: number;
  frontSetback: number;
  rearSetback: number;
  side1Setback: number;
  side2Setback: number;
  hasHeightRestriction: boolean;
  heightLimit: number;
  hasSlope: boolean;
  slopeGrade: number;
  zoningType: ZoningType;
  lotCoverage: number;
  parkingSpaces: number;
  maxBuildableArea: number;
  stories: number;
  architecturalStyle: ArchitecturalStyle;
  estCostPerSqFt: number;
  feasibilityScore: number;
  verdict: string;
  verdictColor: string;
}

export interface Feature {
  id: number;
  name: string;
  tier: Tier;
  legalStatus: string;
  shield: string;
  icon: string;
  category: string;
}

export interface PricingPlan {
  tier: Tier;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
}

export interface Contractor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  phone: string;
  email: string;
  license: string;
  yearsExperience: number;
  projects: number;
  avatar: string;
}

export interface PermitStep {
  id: string;
  name: string;
  description: string;
  estimatedDays: number;
  dependencies: string[];
  status: 'pending' | 'in_progress' | 'completed';
}

export interface BidItem {
  id: string;
  contractorName: string;
  totalCost: number;
  timeline: number;
  materials: string[];
  breakdown: { item: string; cost: number }[];
  notes: string;
}

export interface Milestone {
  id: string;
  name: string;
  dueDate: string;
  status: 'upcoming' | 'in_progress' | 'completed' | 'overdue';
  description: string;
  documents: string[];
}

export interface FeasibilityFactor {
  name: string;
  score: number;
  weight: number;
  details: string;
}

export interface ActionItem {
  id: string;
  title: string;
  category: 'immediate' | 'pre-construction' | 'design';
  status: 'check' | 'warning' | 'info';
  description: string;
  expanded: boolean;
}

export interface OverlayLayer {
  name: string;
  type: string;
  description: string;
  color: string;
  active: boolean;
}

export interface CommunityStat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface FinancingOption {
  lender: string;
  type: string;
  rate: string;
  term: string;
  minDown: string;
  features: string[];
}
