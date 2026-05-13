import { SUPPORTED_CITIES } from '@contracts/cities';

export function getJurisdictionCode(cityCode: string): string {
  return SUPPORTED_CITIES.find(c => c.code === cityCode)?.code || 'AUS-TX';
}

export function getJurisdictionName(cityCode: string): string {
  const city = SUPPORTED_CITIES.find(c => c.code === cityCode);
  return city ? `${city.name}, ${city.state}` : 'Austin, TX';
}

export function getPermitAuthority(cityCode: string): string {
  return SUPPORTED_CITIES.find(c => c.code === cityCode)?.permitAuthority || 'Austin Development Services';
}

// Get common zone codes for a city
export function getCommonZoneCodes(cityCode: string): string[] {
  const codes: Record<string, string[]> = {
    'AUS-TX': ['SF-3', 'SF-2', 'MF-1', 'MF-2', 'CS-1'],
    'NYC-NY': ['R1-1', 'R3-1', 'R5', 'C1-3', 'R7-1'],
    'LAX-CA': ['R1-1', 'R2-1', 'R3-1', 'R4-1', 'C1-1'],
    'CHI-IL': ['RS-1', 'RS-2', 'RT-4', 'RM-5', 'B1-1'],
    'HOU-TX': ['R-1', 'R-2', 'R-3', 'R-4', 'C-1'],
    'PHX-AZ': ['R1-6', 'R1-8', 'R-2', 'R-3', 'C-1'],
    'SFO-CA': ['RH-1', 'RH-2', 'RM-1', 'RM-2', 'NC-1'],
  };
  return codes[cityCode] || codes['AUS-TX'];
}
