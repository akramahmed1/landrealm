import type { Feature, PricingPlan, Contractor, PermitStep, BidItem, Milestone, ActionItem, OverlayLayer, CommunityStat, FinancingOption, FeasibilityFactor } from '@/types';

export const allFeatures: Feature[] = [
  { id: 1, name: 'Address to Zoning Rules Q&A', tier: 'free', legalStatus: 'Defensible', shield: 'General information only, not legal advice. Verify with City Planning Dept.', icon: 'MapPin', category: 'Zoning Intelligence' },
  { id: 2, name: 'Multi-Jurisdiction Overlay Detection', tier: 'free', legalStatus: 'Defensible', shield: 'Source: FEMA/County GIS, last updated [date]. Verify directly.', icon: 'Layers', category: 'Zoning Intelligence' },
  { id: 3, name: 'Land Value Estimator', tier: 'free', legalStatus: 'Defensible', shield: 'Estimate only. Verify with licensed appraiser before purchase.', icon: 'TrendingUp', category: 'Financial Estimation' },
  { id: 4, name: 'Basic Cost Calculator', tier: 'free', legalStatus: 'Defensible', shield: 'Range estimate for planning. Obtain binding bids from licensed contractors.', icon: 'Calculator', category: 'Financial Estimation' },
  { id: 5, name: 'Should I Buy? Score', tier: 'pro', legalStatus: 'Manageable', shield: 'Analytical composite, NOT investment advice. No guarantee.', icon: 'BarChart3', category: 'Zoning Intelligence' },
  { id: 6, name: 'Full Feasibility Report', tier: 'pro', legalStatus: 'Manageable', shield: 'For planning only. Verify all data with authorities.', icon: 'FileCheck', category: 'Permit Workflow' },
  { id: 7, name: 'Pro Forma Generator', tier: 'pro', legalStatus: 'Manageable', shield: 'Hypothetical projections. Consult licensed CPA/advisor.', icon: 'PieChart', category: 'Financial Estimation' },
  { id: 8, name: 'Permit Dependency Mapper', tier: 'pro', legalStatus: 'Manageable', shield: 'General guide. Confirm complete requirements with authority.', icon: 'GitBranch', category: 'Permit Workflow' },
  { id: 9, name: 'Pre-Submission Health Check', tier: 'pro', legalStatus: 'Manageable', shield: 'Not substitute for professional review.', icon: 'ClipboardCheck', category: 'Permit Workflow' },
  { id: 10, name: 'Document Checklist + Form Pre-Filler', tier: 'pro', legalStatus: 'Manageable', shield: 'Drafts only. You review, sign, and submit.', icon: 'ListChecks', category: 'Permit Workflow' },
  { id: 11, name: 'Detailed Construction Cost Estimator', tier: 'pro', legalStatus: 'Manageable', shield: 'Range: X-Y/sqft. Obtain binding bids from licensed contractors.', icon: 'Calculator', category: 'Financial Estimation' },
  { id: 12, name: 'Permit Timeline Estimator', tier: 'pro', legalStatus: 'Manageable', shield: 'Based on historical data. Actual times vary significantly.', icon: 'Clock', category: 'Permit Workflow' },
  { id: 13, name: 'Community Context Dashboard', tier: 'pro', legalStatus: 'Defensible', shield: 'Based on public records. No individual data included.', icon: 'Users', category: 'Community' },
  { id: 14, name: 'Contractor Directory', tier: 'premium', legalStatus: 'Manageable', shield: 'Independent third parties. NO endorsement. Conduct your own due diligence.', icon: 'Briefcase', category: 'Contractor Marketplace' },
  { id: 15, name: 'Bid Comparison Tool', tier: 'premium', legalStatus: 'Manageable', shield: 'Identifies differences only. Does not determine superiority.', icon: 'Scale', category: 'Contractor Marketplace' },
  { id: 16, name: 'Milestone Tracker + Document Vault', tier: 'premium', legalStatus: 'Defensible', shield: 'Standard SaaS ToS', icon: 'FolderCheck', category: 'Contractor Marketplace' },
  { id: 17, name: 'Live Permit Status Dashboard', tier: 'premium', legalStatus: 'Gray area', shield: 'API-only. For others, manual update required. No password storage.', icon: 'Activity', category: 'Permit Workflow' },
  { id: 18, name: 'Regulatory Change Alert System', tier: 'premium', legalStatus: 'Defensible', shield: 'Informational summary only. No legal interpretation.', icon: 'Bell', category: 'Regulatory Intelligence' },
  { id: 19, name: 'Post-Disaster Fast-Track Navigator', tier: 'premium', legalStatus: 'Defensible', shield: 'Subject to change. Verify with emergency management.', icon: 'Zap', category: 'Regulatory Intelligence' },
  { id: 20, name: 'Cost-of-Delay Calculator', tier: 'premium', legalStatus: 'Defensible', shield: 'Estimate for planning only. Actual costs depend on specific terms.', icon: 'Timer', category: 'Financial Estimation' },
  { id: 21, name: 'Financing Options Directory', tier: 'premium', legalStatus: 'Manageable', shield: 'Educational only. NOT a mortgage broker, lender, or advisor.', icon: 'Banknote', category: 'Financing' },
  { id: 22, name: 'Application Prep Assistant', tier: 'premium', legalStatus: 'Manageable', shield: 'We prepare drafts. You review, sign, and submit.', icon: 'FileEdit', category: 'Permit Workflow' },
];

export const pricingPlans: PricingPlan[] = [
  {
    tier: 'free',
    name: 'Free',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'Essential tools to start your property research.',
    features: [
      'Address to Zoning Rules Q&A',
      'Multi-Jurisdiction Overlay Detection',
      'Land Value Estimator',
      'Basic Cost Calculator',
    ],
  },
  {
    tier: 'pro',
    name: 'Pro',
    monthlyPrice: 99,
    annualPrice: 990,
    description: 'Professional-grade analysis and permit planning.',
    features: [
      'Everything in Free',
      '"Should I Buy?" Score',
      'Full Feasibility Report',
      'Pro Forma Generator',
      'Permit Dependency Mapper',
      'Pre-Submission Health Check',
      'Document Checklist + Form Pre-Filler',
      'Detailed Construction Cost Estimator',
      'Permit Timeline Estimator',
      'Community Context Dashboard',
    ],
  },
  {
    tier: 'premium',
    name: 'Premium',
    monthlyPrice: 299,
    annualPrice: 2990,
    description: 'Full-service platform for serious builders.',
    features: [
      'Everything in Pro',
      'Contractor Directory',
      'Bid Comparison Tool',
      'Milestone Tracker + Document Vault',
      'Live Permit Status Dashboard',
      'Regulatory Change Alert System',
      'Post-Disaster Fast-Track Navigator',
      'Cost-of-Delay Calculator',
      'Financing Options Directory',
      'Application Prep Assistant',
    ],
  },
];

export const contractors: Contractor[] = [
  { id: '1', name: 'Apex Construction Group', specialty: 'Custom Residential', rating: 4.9, reviews: 47, location: 'Austin, TX', phone: '(512) 555-0142', email: 'info@apexconstruction.com', license: 'TDLR #12345', yearsExperience: 18, projects: 312, avatar: '/contractor-1.jpg' },
  { id: '2', name: 'Hill Country Builders', specialty: 'Luxury Homes', rating: 4.7, reviews: 63, location: 'Austin, TX', phone: '(512) 555-0287', email: 'hello@hillcountry.build', license: 'TDLR #23456', yearsExperience: 22, projects: 278, avatar: '/contractor-2.jpg' },
  { id: '3', name: 'GreenBuild Austin', specialty: 'Sustainable/Eco', rating: 4.8, reviews: 34, location: 'Austin, TX', phone: '(512) 555-0391', email: 'contact@greenbuildaustin.com', license: 'TDLR #34567', yearsExperience: 12, projects: 156, avatar: '/contractor-3.jpg' },
  { id: '4', name: 'Foundation First LLC', specialty: 'Foundations & Concrete', rating: 4.6, reviews: 89, location: 'Austin, TX', phone: '(512) 555-0415', email: 'jobs@foundationfirst.com', license: 'TDLR #45678', yearsExperience: 25, projects: 534, avatar: '/contractor-4.jpg' },
  { id: '5', name: 'Skyline Framing Co', specialty: 'Framing & Structural', rating: 4.5, reviews: 52, location: 'Austin, TX', phone: '(512) 555-0529', email: 'estimates@skylineframing.com', license: 'TDLR #56789', yearsExperience: 15, projects: 423, avatar: '/contractor-5.jpg' },
  { id: '6', name: 'Texas Electrical Pros', specialty: 'Electrical', rating: 4.8, reviews: 112, location: 'Austin, TX', phone: '(512) 555-0633', email: 'service@txelectrical.com', license: 'TDLR #67890', yearsExperience: 20, projects: 891, avatar: '/contractor-6.jpg' },
];

export const permitSteps: PermitStep[] = [
  { id: '1', name: 'Site Plan Review', description: 'Submit site plan showing property boundaries, setbacks, and building placement.', estimatedDays: 14, dependencies: [], status: 'completed' },
  { id: '2', name: 'Zoning Verification', description: 'City verifies project complies with zoning district requirements.', estimatedDays: 7, dependencies: ['1'], status: 'completed' },
  { id: '3', name: 'Foundation Permit', description: 'Permit for foundation work including footings and slab.', estimatedDays: 5, dependencies: ['1', '2'], status: 'in_progress' },
  { id: '4', name: 'Building Permit', description: 'Primary permit for construction of the structure.', estimatedDays: 10, dependencies: ['3'], status: 'pending' },
  { id: '5', name: 'Electrical Permit', description: 'Separate permit for all electrical work.', estimatedDays: 5, dependencies: ['4'], status: 'pending' },
  { id: '6', name: 'Plumbing Permit', description: 'Permit for plumbing and sewer connections.', estimatedDays: 5, dependencies: ['4'], status: 'pending' },
  { id: '7', name: 'HVAC Permit', description: 'Permit for heating, ventilation, and air conditioning.', estimatedDays: 5, dependencies: ['4'], status: 'pending' },
  { id: '8', name: 'Final Inspection', description: 'Comprehensive inspection of all completed work.', estimatedDays: 3, dependencies: ['4', '5', '6', '7'], status: 'pending' },
  { id: '9', name: 'Certificate of Occupancy', description: 'Final approval to occupy the building.', estimatedDays: 2, dependencies: ['8'], status: 'pending' },
];

export const sampleBids: BidItem[] = [
  {
    id: '1', contractorName: 'Apex Construction Group', totalCost: 485000, timeline: 8,
    materials: ['Hardie Board siding', ' Andersen windows', ' GAF shingles', ' Kohler fixtures'],
    breakdown: [
      { item: 'Foundation', cost: 75000 }, { item: 'Framing', cost: 95000 },
      { item: 'Roofing', cost: 42000 }, { item: 'Electrical', cost: 38000 },
      { item: 'Plumbing', cost: 35000 }, { item: 'HVAC', cost: 28000 },
      { item: 'Interior Finish', cost: 95000 }, { item: 'Exterior Finish', cost: 52000 },
      { item: 'Contingency', cost: 30000 },
    ],
    notes: 'Includes 1-year warranty. Licensed and insured. References available.'
  },
  {
    id: '2', contractorName: 'Hill Country Builders', totalCost: 562000, timeline: 10,
    materials: ['Brick veneer', ' Pella windows', ' standing seam metal roof', ' Delta fixtures'],
    breakdown: [
      { item: 'Foundation', cost: 85000 }, { item: 'Framing', cost: 110000 },
      { item: 'Roofing', cost: 65000 }, { item: 'Electrical', cost: 42000 },
      { item: 'Plumbing', cost: 40000 }, { item: 'HVAC', cost: 32000 },
      { item: 'Interior Finish', cost: 108000 }, { item: 'Exterior Finish', cost: 55000 },
      { item: 'Contingency', cost: 25000 },
    ],
    notes: 'Premium materials included. 2-year warranty. LEED-certified options.'
  },
  {
    id: '3', contractorName: 'GreenBuild Austin', totalCost: 425000, timeline: 9,
    materials: ['Recycled siding', ' Energy Star windows', ' solar panels', ' low-flow fixtures'],
    breakdown: [
      { item: 'Foundation', cost: 70000 }, { item: 'Framing', cost: 88000 },
      { item: 'Roofing', cost: 38000 }, { item: 'Electrical', cost: 35000 },
      { item: 'Plumbing', cost: 32000 }, { item: 'HVAC', cost: 25000 },
      { item: 'Interior Finish', cost: 78000 }, { item: 'Exterior Finish', cost: 35000 },
      { item: 'Solar/Geo', cost: 19000 },
    ],
    notes: 'Eco-friendly materials. Energy rebates available. Net-zero capable.'
  },
];

export const milestones: Milestone[] = [
  { id: '1', name: 'Site Survey Complete', dueDate: '2026-05-15', status: 'completed', description: 'Professional survey of property boundaries and elevation.', documents: ['survey-report.pdf', 'boundary-map.pdf'] },
  { id: '2', name: 'Soil Testing', dueDate: '2026-05-22', status: 'completed', description: 'Geotechnical analysis for foundation design.', documents: ['soil-report.pdf'] },
  { id: '3', name: 'Architectural Plans Finalized', dueDate: '2026-06-10', status: 'in_progress', description: 'Final construction drawings approved by architect.', documents: ['floor-plans.pdf', 'elevations.pdf'] },
  { id: '4', name: 'Permit Applications Submitted', dueDate: '2026-06-20', status: 'upcoming', description: 'All required permits filed with City of Austin.', documents: [] },
  { id: '5', name: 'Foundation Pour', dueDate: '2026-07-15', status: 'upcoming', description: 'Concrete foundation slab and footings.', documents: [] },
  { id: '6', name: 'Framing Complete', dueDate: '2026-09-01', status: 'upcoming', description: 'Structural framing, roof trusses installed.', documents: [] },
  { id: '7', name: 'Rough-In Inspection', dueDate: '2026-10-01', status: 'upcoming', description: 'Electrical, plumbing, HVAC rough-in approved.', documents: [] },
  { id: '8', name: 'Final Inspection', dueDate: '2026-12-15', status: 'upcoming', description: 'Final walkthrough and certificate of occupancy.', documents: [] },
];

export const actionItems: ActionItem[] = [
  { id: '1', title: 'Verify Zoning with City Planner', category: 'immediate', status: 'warning', description: 'Schedule a pre-application meeting with the Austin Planning Department to confirm zoning classification and discuss any special use permits required.', expanded: false },
  { id: '2', title: 'Conduct Soil Test', category: 'immediate', status: 'check', description: 'Hire a geotechnical engineer to perform soil boring and analysis. Required for foundation design. Cost: $2,000-$5,000.', expanded: false },
  { id: '3', title: 'Hire Licensed Architect', category: 'design', status: 'info', description: 'Select and contract with a licensed architect familiar with Austin building codes. Typical fees: 8-15% of construction cost.', expanded: false },
  { id: '4', title: 'Survey Property Lines', category: 'immediate', status: 'check', description: 'Commission a professional boundary survey to confirm exact property lines and setback requirements.', expanded: false },
  { id: '5', title: 'Check HOA Restrictions', category: 'pre-construction', status: 'warning', description: 'Review Homeowners Association bylaws for architectural guidelines, height restrictions, and approval process.', expanded: false },
  { id: '6', title: 'Finalize Construction Financing', category: 'pre-construction', status: 'info', description: 'Secure construction-to-permanent loan. Typical down payment: 20-25%. Compare rates from at least 3 lenders.', expanded: false },
  { id: '7', title: 'Apply for Building Permit', category: 'pre-construction', status: 'info', description: 'Submit complete permit application with architectural plans, engineering reports, and fee payment.', expanded: false },
  { id: '8', title: 'Select General Contractor', category: 'design', status: 'info', description: 'Obtain at least 3 bids from licensed contractors. Verify insurance, references, and past project quality.', expanded: false },
];

export const overlayLayers: OverlayLayer[] = [
  { name: 'Zoning Districts', type: 'vector', description: 'City of Austin zoning classifications', color: '#6D28D9', active: true },
  { name: 'FEMA Flood Zones', type: 'raster', description: '100-year and 500-year flood plains', color: '#3B82F6', active: false },
  { name: 'Historic Districts', type: 'vector', description: 'Locally designated historic landmarks', color: '#F59E0B', active: false },
  { name: 'Wildfire Risk', type: 'raster', description: 'Texas A&M Forest Service wildfire risk zones', color: '#EF4444', active: false },
  { name: 'Utility Easements', type: 'vector', description: 'Electric, gas, water line easements', color: '#10B981', active: false },
  { name: 'Transit-Oriented Development', type: 'vector', description: 'TOD zones near transit corridors', color: '#8B5CF6', active: false },
];

export const communityStats: CommunityStat[] = [
  { label: 'Median Home Price', value: '$685,000', change: '+12.3%', trend: 'up' },
  { label: 'Days on Market', value: '18 days', change: '-4 days', trend: 'down' },
  { label: 'Price per Sq Ft', value: '$312', change: '+8.7%', trend: 'up' },
  { label: 'Building Permits (YoY)', value: '1,247', change: '+23%', trend: 'up' },
  { label: 'Avg. Construction Cost', value: '$185/sqft', change: '+5.2%', trend: 'up' },
  { label: 'Population Growth', value: '+2.4%', change: 'Stable', trend: 'neutral' },
];

export const financingOptions: FinancingOption[] = [
  { lender: 'First Texas Bank', type: 'Construction-to-Perm', rate: '7.125%', term: '30 years', minDown: '20%', features: ['One-time close', 'Rate lock available', 'Local underwriting'] },
  { lender: 'Austin Capital Mortgage', type: 'Construction Only', rate: '6.875%', term: '12 months', minDown: '25%', features: ['Interest-only payments', 'Fast approval', 'Jumbo loans available'] },
  { lender: 'Lone Star Credit Union', type: 'Owner-Builder Loan', rate: '7.50%', term: '24 months', minDown: '30%', features: ['No builder required', 'Flexible draws', 'Member discounts'] },
  { lender: 'Texas Builder Finance', type: 'Spec Construction', rate: '8.25%', term: '18 months', minDown: '15%', features: ['Investor-friendly', 'No income docs', 'Fast closings'] },
];

export const feasibilityFactors: FeasibilityFactor[] = [
  { name: 'Zoning Compatibility', score: 92, weight: 25, details: 'Property zoned SF-3, supports single-family detached. No variances needed.' },
  { name: 'Setback Compliance', score: 88, weight: 20, details: 'All setbacks met with comfortable margins. Buildable envelope: 4,200 sq ft.' },
  { name: 'Market Conditions', score: 78, weight: 20, details: 'Strong demand in 78704. Median price up 12% YoY. Days on market: 18.' },
  { name: 'Infrastructure Access', score: 85, weight: 15, details: 'City water, sewer, and electric available at street. No extension costs.' },
  { name: 'Environmental Factors', score: 72, weight: 15, details: 'Not in flood zone. No wetlands. Some tree preservation requirements apply.' },
  { name: 'Permit Timeline', score: 65, weight: 5, details: 'Current backlog: 6-8 weeks for residential permits. Plan accordingly.' },
];

export const sampleAddresses = [
  '2100 Barton Springs Rd, Austin, TX 78704',
  '1500 W 35th St, Austin, TX 78703',
  '3200 E Cesar Chavez St, Austin, TX 78702',
  '8901 N Capital of Texas Hwy, Austin, TX 78759',
  '4500 S Congress Ave, Austin, TX 78745',
];

export const bannedWords = [
  { category: 'Zoning', banned: '"Approved," "You can build," "Guaranteed"', approved: '"May include," "Typically permits," "Zoning district allows"' },
  { category: 'Costs', banned: '"Exact cost," "Final price," "You will pay"', approved: '"Range: X-Y," "Based on [source]," "Historical average"' },
  { category: 'Timelines', banned: '"Guaranteed timeline," "Will be done by"', approved: '"Historical average is...," "Typically takes..."' },
  { category: 'Contractors', banned: '"Trusted," "Vetted," "Our recommended"', approved: '"Listed on platform," "License on file"' },
];
