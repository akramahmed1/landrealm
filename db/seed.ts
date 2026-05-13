import { createConnection } from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import {
  zoningRules, contractors, overlayLayers, financingOptions,
  regulatoryAlerts, promptTemplates,
} from "./schema";

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error("DATABASE_URL not set");

  const client = await createConnection(dbUrl);
  const db = drizzle(client);

  console.log("Truncating seed tables...");
  await client.execute("SET FOREIGN_KEY_CHECKS = 0");
  await client.execute("TRUNCATE TABLE zoning_rules");
  await client.execute("TRUNCATE TABLE contractors");
  await client.execute("TRUNCATE TABLE overlay_layers");
  await client.execute("TRUNCATE TABLE financing_options");
  await client.execute("TRUNCATE TABLE regulatory_alerts");
  await client.execute("TRUNCATE TABLE prompt_templates");
  await client.execute("SET FOREIGN_KEY_CHECKS = 1");
  console.log("Truncated. Seeding...");

  // ─── 1. ZONING RULES ───
  console.log("  → Zoning rules...");
  await db.insert(zoningRules).values([
    {
      jurisdiction: "City of Austin",
      jurisdictionCode: "AUS-TX",
      zoneCode: "SF-3",
      zoneName: "Family Residence",
      zoneCategory: "residential",
      lotSizeMinSqft: 5750,
      lotWidthMinFt: 50,
      frontSetbackFt: 25,
      rearSetbackFt: 20,
      sideSetbackFt: 7,
      maxHeightFt: 32,
      maxStories: 2,
      farMax: "0.4",
      coverageMaxPct: 45,
      parkingRequired: "2 spaces per dwelling unit",
      permittedUses: ["Single-family dwelling", "Accessory dwelling unit (ADU)", "Home occupation"],
      prohibitedUses: ["Multi-family", "Commercial retail", "Industrial"],
      overlayDistricts: ["Neighborhood Conservation"],
      specialRequirements: "ADU limited to 850 sq ft or 15% of lot size",
      source: "City of Austin Land Development Code",
    },
    {
      jurisdiction: "City of Austin",
      jurisdictionCode: "AUS-TX",
      zoneCode: "SF-5",
      zoneName: "Urban Family Residence",
      zoneCategory: "residential",
      lotSizeMinSqft: 3600,
      lotWidthMinFt: 36,
      frontSetbackFt: 15,
      rearSetbackFt: 10,
      sideSetbackFt: 5,
      maxHeightFt: 35,
      maxStories: 2,
      farMax: "0.5",
      coverageMaxPct: 50,
      parkingRequired: "1.5 spaces per dwelling unit",
      permittedUses: ["Single-family dwelling", "Duplex", "ADU", "Home occupation"],
      prohibitedUses: ["Commercial", "Industrial"],
      source: "City of Austin Land Development Code",
    },
    {
      jurisdiction: "City of Austin",
      jurisdictionCode: "AUS-TX",
      zoneCode: "MF-4",
      zoneName: "Multi-Family Residence",
      zoneCategory: "multi_family",
      lotSizeMinSqft: 8000,
      lotWidthMinFt: 60,
      frontSetbackFt: 20,
      rearSetbackFt: 15,
      sideSetbackFt: 10,
      maxHeightFt: 45,
      maxStories: 3,
      farMax: "1.0",
      coverageMaxPct: 60,
      parkingRequired: "1.5 spaces per unit",
      permittedUses: ["Multi-family dwelling", "Townhouse", "ADU"],
      prohibitedUses: ["Heavy industrial"],
      source: "City of Austin Land Development Code",
    },
    {
      jurisdiction: "City of Austin",
      jurisdictionCode: "AUS-TX",
      zoneCode: "CS",
      zoneName: "Commercial-Strip",
      zoneCategory: "commercial",
      lotSizeMinSqft: 6000,
      lotWidthMinFt: 50,
      frontSetbackFt: 10,
      rearSetbackFt: 10,
      sideSetbackFt: 0,
      maxHeightFt: 60,
      maxStories: 4,
      farMax: "2.0",
      coverageMaxPct: 80,
      parkingRequired: "1 per 300 sq ft GFA",
      permittedUses: ["Retail", "Restaurant", "Office", "Medical clinic"],
      prohibitedUses: ["Heavy manufacturing", "Adult entertainment"],
      source: "City of Austin Land Development Code",
    },
    {
      jurisdiction: "City of Austin",
      jurisdictionCode: "AUS-TX",
      zoneCode: "MU",
      zoneName: "Mixed Use",
      zoneCategory: "mixed_use",
      lotSizeMinSqft: 5000,
      lotWidthMinFt: 40,
      frontSetbackFt: 5,
      rearSetbackFt: 5,
      sideSetbackFt: 0,
      maxHeightFt: 90,
      maxStories: 8,
      farMax: "3.0",
      coverageMaxPct: 85,
      parkingRequired: "Reduced: 1 per 400 sq ft GFA",
      permittedUses: ["Residential", "Retail", "Office", "Hotel"],
      overlayDistricts: ["Transit-Oriented Development"],
      source: "City of Austin Land Development Code",
    },
    {
      jurisdiction: "City of Austin",
      jurisdictionCode: "AUS-TX",
      zoneCode: "GR",
      zoneName: "Commercial Recreation",
      zoneCategory: "commercial",
      lotSizeMinSqft: 15000,
      lotWidthMinFt: 100,
      frontSetbackFt: 25,
      rearSetbackFt: 20,
      sideSetbackFt: 15,
      maxHeightFt: 35,
      maxStories: 2,
      farMax: "0.5",
      coverageMaxPct: 40,
      parkingRequired: "Varies by use",
      permittedUses: ["Golf course", "Sports facility", "Entertainment venue"],
      source: "City of Austin Land Development Code",
    },
    {
      jurisdiction: "City of Austin",
      jurisdictionCode: "AUS-TX",
      zoneCode: "RR",
      zoneName: "Rural Residence",
      zoneCategory: "residential",
      lotSizeMinSqft: 43560,
      lotWidthMinFt: 150,
      frontSetbackFt: 30,
      rearSetbackFt: 25,
      sideSetbackFt: 15,
      maxHeightFt: 35,
      maxStories: 2,
      farMax: "0.2",
      coverageMaxPct: 25,
      parkingRequired: "2 spaces per dwelling unit",
      permittedUses: ["Single-family dwelling", "Agricultural use", "ADU"],
      source: "City of Austin Land Development Code",
    },
  ]);

  // ─── 2. CONTRACTORS ───
  console.log("  → Contractors...");
  await db.insert(contractors).values([
    { name: "Apex Construction Group", specialty: "Custom Residential", licenseNumber: "TDLR-12345", licenseState: "TX", rating: "4.90", reviewCount: 47, yearsExperience: 18, projectsCompleted: 312, phone: "(512) 555-0142", email: "info@apexconstruction.com", city: "Austin", state: "TX", bio: "Award-winning custom home builder.", services: ["Custom Homes", "Renovations", "ADUs"], isVerified: true, disclaimer: "Independent third party. NOT endorsed." },
    { name: "Hill Country Builders", specialty: "Luxury Homes", licenseNumber: "TDLR-23456", licenseState: "TX", rating: "4.70", reviewCount: 63, yearsExperience: 22, projectsCompleted: 278, phone: "(512) 555-0287", email: "hello@hillcountry.build", city: "Austin", state: "TX", bio: "Family-owned luxury home builder.", services: ["Luxury Homes", "Estate Construction"], isVerified: true, disclaimer: "Independent third party. NOT endorsed." },
    { name: "GreenBuild Austin", specialty: "Sustainable/Eco", licenseNumber: "TDLR-34567", licenseState: "TX", rating: "4.80", reviewCount: 34, yearsExperience: 12, projectsCompleted: 156, phone: "(512) 555-0391", email: "contact@greenbuildaustin.com", city: "Austin", state: "TX", bio: "Austin's premier green building contractor.", services: ["Green Building", "Solar Installation"], isVerified: true, disclaimer: "Independent third party. NOT endorsed." },
    { name: "Foundation First LLC", specialty: "Foundations & Concrete", licenseNumber: "TDLR-45678", licenseState: "TX", rating: "4.60", reviewCount: 89, yearsExperience: 25, projectsCompleted: 534, phone: "(512) 555-0415", email: "jobs@foundationfirst.com", city: "Austin", state: "TX", bio: "Foundation specialists.", services: ["Slab Foundations", "Pier & Beam"], isVerified: true, disclaimer: "Independent third party. NOT endorsed." },
    { name: "Skyline Framing Co", specialty: "Framing & Structural", licenseNumber: "TDLR-56789", licenseState: "TX", rating: "4.50", reviewCount: 52, yearsExperience: 15, projectsCompleted: 423, phone: "(512) 555-0529", email: "estimates@skylineframing.com", city: "Austin", state: "TX", bio: "Commercial and residential framing.", services: ["Wood Framing", "Steel Framing"], isVerified: true, disclaimer: "Independent third party. NOT endorsed." },
    { name: "Texas Electrical Pros", specialty: "Electrical", licenseNumber: "TDLR-67890", licenseState: "TX", rating: "4.80", reviewCount: 112, yearsExperience: 20, projectsCompleted: 891, phone: "(512) 555-0633", email: "service@txelectrical.com", city: "Austin", state: "TX", bio: "Full-service electrical contractor.", services: ["New Construction", "Smart Home", "EV Charging"], isVerified: true, disclaimer: "Independent third party. NOT endorsed." },
    { name: "Austin Plumbing Masters", specialty: "Plumbing", licenseNumber: "TDLR-78901", licenseState: "TX", rating: "4.70", reviewCount: 76, yearsExperience: 16, projectsCompleted: 645, phone: "(512) 555-0747", email: "service@austinplumbing.com", city: "Austin", state: "TX", bio: "Licensed plumbing contractor.", services: ["New Construction Plumbing", "Water Heaters"], isVerified: false, disclaimer: "Independent third party. NOT endorsed." },
    { name: "Capital City Roofing", specialty: "Roofing", licenseNumber: "TDLR-89012", licenseState: "TX", rating: "4.60", reviewCount: 98, yearsExperience: 19, projectsCompleted: 723, phone: "(512) 555-0861", email: "info@capitalroofing.com", city: "Austin", state: "TX", bio: "Residential and commercial roofing.", services: ["Asphalt Shingles", "Metal Roofing", "Tile Roofs"], isVerified: true, disclaimer: "Independent third party. NOT endorsed." },
  ]);

  // ─── 3. OVERLAY LAYERS ───
  console.log("  → Overlay layers...");
  await db.insert(overlayLayers).values([
    { name: "fema_flood_100yr", type: "flood", displayName: "FEMA 100-Year Flood Zone", description: "Areas with 1% annual chance of flooding", jurisdiction: "City of Austin", polygonData: { bounds: { sw: [30.1, -97.9], ne: [30.5, -97.5] } }, source: "FEMA" },
    { name: "historic_district", type: "historic", displayName: "Historic Landmark District", description: "Locally designated historic landmarks", jurisdiction: "City of Austin", polygonData: { bounds: { sw: [30.2, -97.8], ne: [30.4, -97.6] } }, source: "Austin Historic Commission" },
    { name: "wildfire_risk", type: "wildfire", displayName: "Wildfire Risk Zone", description: "TAMU Forest Service wildfire risk", jurisdiction: "City of Austin", polygonData: { bounds: { sw: [30.15, -97.95], ne: [30.45, -97.55] } }, source: "Texas A&M Forest Service" },
    { name: "utility_easement", type: "utility", displayName: "Utility Easement", description: "Electric, gas, water easements", jurisdiction: "City of Austin", polygonData: { bounds: { sw: [30.1, -97.9], ne: [30.5, -97.5] } }, source: "Austin Energy" },
    { name: "transit_oriented", type: "transit", displayName: "Transit-Oriented Development", description: "TOD zones near transit corridors", jurisdiction: "City of Austin", polygonData: { bounds: { sw: [30.25, -97.75], ne: [30.35, -97.65] } }, source: "Capital Metro" },
  ]);

  // ─── 4. FINANCING OPTIONS ───
  console.log("  → Financing options...");
  await db.insert(financingOptions).values([
    { lenderName: "First Texas Bank", loanType: "Construction-to-Permanent", rateApr: "7.125%", term: "30 years", minDownPayment: "20%", features: ["One-time close", "Rate lock available"], requirements: ["Min 680 credit score", "DTI under 43%"], contactInfo: { phone: "(512) 555-1000" }, disclaimer: "Educational only." },
    { lenderName: "Austin Capital Mortgage", loanType: "Construction Only", rateApr: "6.875%", term: "12 months", minDownPayment: "25%", features: ["Interest-only payments", "Fast approval"], requirements: ["Min 700 credit score", "20% liquidity"], contactInfo: { phone: "(512) 555-1100" }, disclaimer: "Educational only." },
    { lenderName: "Lone Star Credit Union", loanType: "Owner-Builder Loan", rateApr: "7.50%", term: "24 months", minDownPayment: "30%", features: ["No builder required", "Flexible draws"], requirements: ["CU membership", "Min 660 score"], contactInfo: { phone: "(512) 555-1200" }, disclaimer: "Educational only." },
    { lenderName: "Texas Builder Finance", loanType: "Spec Construction", rateApr: "8.25%", term: "18 months", minDownPayment: "15%", features: ["Investor-friendly", "Fast closings"], requirements: ["2+ spec homes", "Liquidity verified"], contactInfo: { phone: "(512) 555-1300" }, disclaimer: "Educational only." },
  ]);

  // ─── 5. REGULATORY ALERTS ───
  console.log("  → Regulatory alerts...");
  await db.insert(regulatoryAlerts).values([
    { jurisdiction: "City of Austin", alertType: "zoning", severity: "urgent", title: "Proposed SF-3 Density Changes", summary: "City Council considering amendments to SF-3 zoning. Public comment through June 15, 2026.", fullText: "City Council reviewing SF-3 amendments that would reduce minimum lot size from 5,750 to 4,500 sq ft in certain areas.", effectiveDate: new Date("2026-07-01"), source: "City of Austin Planning", sourceUrl: "https://www.austintexas.gov/planning" },
    { jurisdiction: "City of Austin", alertType: "building_code", severity: "urgent", title: "2026 Energy Code Update", summary: "New energy efficiency requirements effective July 1, 2026. Pre-deadline applications qualify under current code.", fullText: "2026 IECC updates require enhanced insulation, improved air sealing, mandatory solar-readiness.", effectiveDate: new Date("2026-07-01"), source: "Texas State Energy Office", sourceUrl: "https://www.tdlr.texas.gov/" },
    { jurisdiction: "City of Austin", alertType: "fee_schedule", severity: "normal", title: "Permit Fee Increase 8%", summary: "Development permit fees increasing 8% starting June 1, 2026.", fullText: "8% increase in all development permit fees effective June 1, 2026.", effectiveDate: new Date("2026-06-01"), source: "Austin Development Services", sourceUrl: "https://www.austintexas.gov/development-services" },
    { jurisdiction: "City of Austin", alertType: "environmental", severity: "normal", title: "Tree Ordinance Revision", summary: "Updated protected tree species list and replacement requirements.", fullText: "Protected Tree Species list updated. Heritage trees include additional oak species. Replacement: 3:1 caliper inches.", effectiveDate: new Date("2026-06-15"), source: "Austin Urban Forestry", sourceUrl: "https://www.austintexas.gov/urban-forestry" },
    { jurisdiction: "City of Austin", alertType: "process", severity: "normal", title: "Online Plan Submission Required", summary: "All commercial plans must use Austin Build + Connect portal.", fullText: "Effective May 15, 2026, all commercial plans must be submitted online. Paper no longer accepted.", effectiveDate: new Date("2026-05-15"), source: "Austin Development Services", sourceUrl: "https://abc.austintexas.gov" },
  ]);

  // ─── 6. PROMPT TEMPLATES ───
  console.log("  → AI prompt templates...");
  await db.insert(promptTemplates).values([
    {
      feature: "zoning_qa",
      name: "Address to Zoning Rules Q&A",
      systemPrompt: "You are a municipal zoning research assistant providing general information only.\n\nRULES:\n- NEVER say approved, guaranteed, you can build, or permitted\n- Use tentative language: may allow, typically permits, appears to\n- End with: This is general information only. Verify with the City Planning Department.\n\nBANNED: approved, guaranteed, you can build, permitted, exact cost, final price, trusted, vetted, recommended",
      userPromptTemplate: "User asks: {question} about property at {address}",
      model: "gpt-4o",
      temperature: 0.3,
      maxTokens: 1500,
      bannedWords: ["approved", "guaranteed", "you can build", "permitted", "exact cost", "final price", "trusted", "vetted", "recommended"],
      requiredDisclaimers: ["general_information", "verify_with_city"],
    },
    {
      feature: "should_i_buy",
      name: "Should I Buy Score",
      systemPrompt: "You are a real estate feasibility analyst providing analytical composites, NOT investment advice.\n\nRULES:\n- NEVER say buy this property or don't buy\n- Present as factors to consider\n- Include: This is an analytical composite, NOT investment advice.\n- Score each factor 0-100 with reasoning\n\nFACTORS: Zoning (25%), Setbacks (20%), Market (20%), Infrastructure (15%), Environmental (15%), Permit (5%)",
      userPromptTemplate: "Analyze feasibility of purchasing at {address} for {useType}. Zoning: {zoning}. Lot: {lotSize}. Buildable: {buildableArea}.",
      model: "gpt-4o",
      temperature: 0.2,
      maxTokens: 2000,
      bannedWords: ["buy this", "don't buy", "guaranteed", "safe investment"],
      requiredDisclaimers: ["not_investment_advice", "consult_professional"],
    },
    {
      feature: "feasibility_report",
      name: "Full Feasibility Report",
      systemPrompt: "Generate structured feasibility reports for planning purposes only.\n\nRULES:\n- State: For planning only. Verify all data with authorities.\n- Include: Executive Summary, Zoning, Site, Market, Financial, Risks, Recommendations\n- Use ranges not exact figures\n- Cite sources",
      userPromptTemplate: "Generate {reportType} report for {address}. Property: {propertyData}. Zoning: {zoning}. Market: {marketData}.",
      model: "gpt-4o",
      temperature: 0.3,
      maxTokens: 4000,
      bannedWords: ["guaranteed", "approved", "exact cost"],
      requiredDisclaimers: ["for_planning_only", "verify_with_authorities"],
    },
  ]);

  console.log("Seeding complete!");
  await client.end();
}

main().catch(async (err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
