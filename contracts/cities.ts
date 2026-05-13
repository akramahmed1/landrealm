// Supported metro areas for Landrealm
export interface SupportedCity {
  code: string;      // e.g. "NYC-NY"
  name: string;      // e.g. "New York"
  state: string;     // e.g. "NY"
  stateName: string; // e.g. "New York"
  county: string;
  population: number;
  permitAuthority: string;
  permitWebsite: string;
  hasApi: boolean;
}

export const SUPPORTED_CITIES: SupportedCity[] = [
  { code: "NYC-NY", name: "New York", state: "NY", stateName: "New York", county: "New York County", population: 8336817, permitAuthority: "NYC DOB", permitWebsite: "https://www1.nyc.gov/site/buildings/index.page", hasApi: false },
  { code: "LAX-CA", name: "Los Angeles", state: "CA", stateName: "California", county: "Los Angeles County", population: 3980400, permitAuthority: "LA Department of Building & Safety", permitWebsite: "https://ladbs.org", hasApi: false },
  { code: "CHI-IL", name: "Chicago", state: "IL", stateName: "Illinois", county: "Cook County", population: 2695000, permitAuthority: "Chicago DOB", permitWebsite: "https://webapps1.cityofchicago.org/buildingrecords", hasApi: false },
  { code: "HOU-TX", name: "Houston", state: "TX", stateName: "Texas", county: "Harris County", population: 2328000, permitAuthority: "Houston Public Works", permitWebsite: "https://www.houstontx.gov", hasApi: false },
  { code: "PHX-AZ", name: "Phoenix", state: "AZ", stateName: "Arizona", county: "Maricopa County", population: 1690000, permitAuthority: "Phoenix Development Services", permitWebsite: "https://www.phoenix.gov", hasApi: false },
  { code: "PHI-PA", name: "Philadelphia", state: "PA", stateName: "Pennsylvania", county: "Philadelphia County", population: 1584000, permitAuthority: "Philadelphia L&I", permitWebsite: "https://www.phila.gov/li", hasApi: false },
  { code: "SAT-TX", name: "San Antonio", state: "TX", stateName: "Texas", county: "Bexar County", population: 1547000, permitAuthority: "San Antonio DSD", permitWebsite: "https://www.sanantonio.gov/DSD", hasApi: false },
  { code: "SDG-CA", name: "San Diego", state: "CA", stateName: "California", county: "San Diego County", population: 1424000, permitAuthority: "San Diego DSD", permitWebsite: "https://www.sandiego.gov/development-services", hasApi: false },
  { code: "DAL-TX", name: "Dallas", state: "TX", stateName: "Texas", county: "Dallas County", population: 1344000, permitAuthority: "Dallas Building Inspection", permitWebsite: "https://dallascityhall.com", hasApi: false },
  { code: "SJC-CA", name: "San Jose", state: "CA", stateName: "California", county: "Santa Clara County", population: 1022000, permitAuthority: "San Jose DSD", permitWebsite: "https://www.sanjoseca.gov", hasApi: false },
  { code: "AUS-TX", name: "Austin", state: "TX", stateName: "Texas", county: "Travis County", population: 978908, permitAuthority: "Austin Development Services", permitWebsite: "https://www.austintexas.gov/development-services", hasApi: false },
  { code: "JAX-FL", name: "Jacksonville", state: "FL", stateName: "Florida", county: "Duval County", population: 950000, permitAuthority: "Jacksonville COJ", permitWebsite: "https://www.coj.net", hasApi: false },
  { code: "FTW-TX", name: "Fort Worth", state: "TX", stateName: "Texas", county: "Tarrant County", population: 935000, permitAuthority: "Fort Worth Development Services", permitWebsite: "https://fortworthtexas.gov", hasApi: false },
  { code: "CMH-OH", name: "Columbus", state: "OH", stateName: "Ohio", county: "Franklin County", population: 906000, permitAuthority: "Columbus DOB", permitWebsite: "https://www.columbus.gov", hasApi: false },
  { code: "CLT-NC", name: "Charlotte", state: "NC", stateName: "North Carolina", county: "Mecklenburg County", population: 885000, permitAuthority: "Charlotte-Mecklenburg L&I", permitWebsite: "https://charlottenc.gov", hasApi: false },
  { code: "IND-IN", name: "Indianapolis", state: "IN", stateName: "Indiana", county: "Marion County", population: 877000, permitAuthority: "Indianapolis DMD", permitWebsite: "https://www.indy.gov", hasApi: false },
  { code: "SFO-CA", name: "San Francisco", state: "CA", stateName: "California", county: "San Francisco County", population: 875000, permitAuthority: "SF DBI", permitWebsite: "https://sfdbi.org", hasApi: false },
  { code: "SEA-WA", name: "Seattle", state: "WA", stateName: "Washington", county: "King County", population: 753000, permitAuthority: "Seattle SDCI", permitWebsite: "https://www.seattle.gov/sdci", hasApi: false },
  { code: "DEN-CO", name: "Denver", state: "CO", stateName: "Colorado", county: "Denver County", population: 716000, permitAuthority: "Denver CPD", permitWebsite: "https://www.denvergov.org", hasApi: false },
  { code: "WAS-DC", name: "Washington DC", state: "DC", stateName: "District of Columbia", county: "District of Columbia", population: 712000, permitAuthority: "DC DOB", permitWebsite: "https://dob.dc.gov", hasApi: false },
  { code: "BNA-TN", name: "Nashville", state: "TN", stateName: "Tennessee", county: "Davidson County", population: 694000, permitAuthority: "Nashville MCLB", permitWebsite: "https://www.nashville.gov", hasApi: false },
  { code: "OKC-OK", name: "Oklahoma City", state: "OK", stateName: "Oklahoma", county: "Oklahoma County", population: 695000, permitAuthority: "OKC Development Services", permitWebsite: "https://www.okc.gov", hasApi: false },
  { code: "BOS-MA", name: "Boston", state: "MA", stateName: "Massachusetts", county: "Suffolk County", population: 676000, permitAuthority: "Boston ISD", permitWebsite: "https://www.boston.gov/isd", hasApi: false },
  { code: "ELP-TX", name: "El Paso", state: "TX", stateName: "Texas", county: "El Paso County", population: 679000, permitAuthority: "El Paso Development Services", permitWebsite: "https://www.elpasotexas.gov", hasApi: false },
  { code: "PDX-OR", name: "Portland", state: "OR", stateName: "Oregon", county: "Multnomah County", population: 653000, permitAuthority: "Portland BDS", permitWebsite: "https://www.portland.gov/bds", hasApi: false },
  { code: "MIA-FL", name: "Miami", state: "FL", stateName: "Florida", county: "Miami-Dade County", population: 467000, permitAuthority: "Miami-Dade RER", permitWebsite: "https://www.miamidade.gov", hasApi: false },
  { code: "ATL-GA", name: "Atlanta", state: "GA", stateName: "Georgia", county: "Fulton County", population: 506000, permitAuthority: "Atlanta Office of Buildings", permitWebsite: "https://www.atlantaga.gov", hasApi: false },
  { code: "LAS-NV", name: "Las Vegas", state: "NV", stateName: "Nevada", county: "Clark County", population: 656000, permitAuthority: "Clark County Building", permitWebsite: "https://www.clarkcountynv.gov", hasApi: false },
  { code: "DET-MI", name: "Detroit", state: "MI", stateName: "Michigan", county: "Wayne County", population: 639000, permitAuthority: "Detroit BSEED", permitWebsite: "https://detroitmi.gov/departments/buildings-safety-engineering-and-environmental-department", hasApi: false },
  { code: "MSP-MN", name: "Minneapolis", state: "MN", stateName: "Minnesota", county: "Hennepin County", population: 430000, permitAuthority: "Minneapolis CPED", permitWebsite: "https://www.minneapolis.gov", hasApi: false },
];

export const STATE_MAP: Record<string, string> = {
  "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California",
  "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "DC": "District of Columbia",
  "FL": "Florida", "GA": "Georgia", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois",
  "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana",
  "ME": "Maine", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota",
  "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada",
  "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York",
  "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma",
  "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina",
  "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont",
  "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming"
};

export function getCityByCode(code: string): SupportedCity | undefined {
  return SUPPORTED_CITIES.find(c => c.code === code);
}

export function getCitiesByState(state: string): SupportedCity[] {
  return SUPPORTED_CITIES.filter(c => c.state === state.toUpperCase());
}
