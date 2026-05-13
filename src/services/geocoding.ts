// Address geocoding service
// Current implementation uses static demo data for the prototype.
// To switch to Mapbox: uncomment the Mapbox section and add your API key.

export interface AddressSuggestion {
  id: string;
  formattedAddress: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
}

// ─── Demo Mode (No API key needed) ───
const demoAddresses: AddressSuggestion[] = [
  { id: '1', formattedAddress: '2100 Barton Springs Rd, Austin, TX 78704', city: 'Austin', state: 'TX', zip: '78704', lat: 30.2649, lng: -97.7738 },
  { id: '2', formattedAddress: '1500 W 35th St, Austin, TX 78703', city: 'Austin', state: 'TX', zip: '78703', lat: 30.3039, lng: -97.7473 },
  { id: '3', formattedAddress: '3200 E Cesar Chavez St, Austin, TX 78702', city: 'Austin', state: 'TX', zip: '78702', lat: 30.2590, lng: -97.7089 },
  { id: '4', formattedAddress: '8901 N Capital of Texas Hwy, Austin, TX 78759', city: 'Austin', state: 'TX', zip: '78759', lat: 30.3893, lng: -97.7985 },
  { id: '5', formattedAddress: '4500 S Congress Ave, Austin, TX 78745', city: 'Austin', state: 'TX', zip: '78745', lat: 30.2302, lng: -97.7590 },
  { id: '6', formattedAddress: '1100 Congress Ave, Austin, TX 78701', city: 'Austin', state: 'TX', zip: '78701', lat: 30.2747, lng: -97.7404 },
  { id: '7', formattedAddress: '6500 Menchaca Rd, Austin, TX 78745', city: 'Austin', state: 'TX', zip: '78745', lat: 30.2156, lng: -97.7990 },
  { id: '8', formattedAddress: '2400 Lakeshore Blvd, Austin, TX 78741', city: 'Austin', state: 'TX', zip: '78741', lat: 30.2470, lng: -97.7185 },
  { id: '9', formattedAddress: '7800 Burnet Rd, Austin, TX 78757', city: 'Austin', state: 'TX', zip: '78757', lat: 30.3541, lng: -97.7392 },
  { id: '10', formattedAddress: '1200 E Riverside Dr, Austin, TX 78741', city: 'Austin', state: 'TX', zip: '78741', lat: 30.2495, lng: -97.7276 },
  { id: '11', formattedAddress: '5500 N Lamar Blvd, Austin, TX 78751', city: 'Austin', state: 'TX', zip: '78751', lat: 30.3231, lng: -97.7288 },
  { id: '12', formattedAddress: '9800 Slaughter Ln, Austin, TX 78748', city: 'Austin', state: 'TX', zip: '78748', lat: 30.1812, lng: -97.8234 },
  { id: '13', formattedAddress: '3400 Guadalupe St, Austin, TX 78705', city: 'Austin', state: 'TX', zip: '78705', lat: 30.2965, lng: -97.7391 },
  { id: '14', formattedAddress: '7200 N Mopac Expy, Austin, TX 78731', city: 'Austin', state: 'TX', zip: '78731', lat: 30.3585, lng: -97.7512 },
  { id: '15', formattedAddress: '4100 S Lamar Blvd, Austin, TX 78704', city: 'Austin', state: 'TX', zip: '78704', lat: 30.2357, lng: -97.7873 },
];

export async function geocodeAddress(query: string): Promise<AddressSuggestion[]> {
  if (!query || query.length < 2) return [];

  const q = query.toLowerCase();
  const matches = demoAddresses.filter(
    addr =>
      addr.formattedAddress.toLowerCase().includes(q) ||
      addr.zip.includes(q) ||
      addr.city.toLowerCase().includes(q)
  );

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 80));

  return matches.slice(0, 5);
}

// ─── Mapbox Mode (Production) ───
// Uncomment below and add your Mapbox API key to switch to real geocoding.
// Mapbox free tier: 100,000 requests/month.

/*
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || 'YOUR_MAPBOX_TOKEN';

export async function geocodeAddress(query: string): Promise<AddressSuggestion[]> {
  if (!query || query.length < 2) return [];

  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?` +
    `access_token=${MAPBOX_TOKEN}&` +
    `types=address,place,locality&` +
    `country=US&` +
    `limit=5`
  );

  if (!response.ok) return [];

  const data = await response.json();

  return data.features.map((feature: any, index: number) => {
    const context = feature.context || [];
    const city = context.find((c: any) => c.id.startsWith('place.'))?.text || '';
    const state = context.find((c: any) => c.id.startsWith('region.'))?.text || '';
    const zip = context.find((c: any) => c.id.startsWith('postcode.'))?.text || '';

    return {
      id: feature.id || String(index),
      formattedAddress: feature.place_name,
      city,
      state,
      zip,
      lat: feature.center[1],
      lng: feature.center[0],
    };
  });
}
*/
