import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { MapPin, ChevronLeft, Shield, AlertTriangle, Building2, Ruler, Car, TreePine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AddressAutocomplete } from '@/components/AddressAutocomplete';
import { trpc } from '@/providers/trpc';
import { CitySelector } from '@/components/CitySelector';
import { getJurisdictionCode, getCommonZoneCodes, getJurisdictionName } from '@/lib/city';

export function ZoningLookup() {
  const { setCurrentView, selectedCity } = useStore();
  const [query, setQuery] = useState('');
  const [zoneCode, setZoneCode] = useState('');

  const jurisdictionCode = getJurisdictionCode(selectedCity);
  const commonZones = getCommonZoneCodes(selectedCity);

  const { data: rule, isLoading } = trpc.zoning.lookupByZone.useQuery(
    { zoneCode, jurisdictionCode },
    { enabled: zoneCode.length > 0 }
  );

  const handleSearch = () => {
    // Default to first common zone for the selected city
    setZoneCode(commonZones[0] || 'SF-3');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="h-14 border-b border-gray-800 bg-[#111111] flex items-center px-4 lg:px-6">
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-400 hover:text-white mr-3"><ChevronLeft className="w-5 h-5" /></button>
        <MapPin className="w-5 h-5 text-[#6D28D9] mr-2" />
        <h1 className="font-semibold">Zoning Lookup</h1>
      </header>

      <main className="p-4 lg:p-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Address to Zoning Rules</h2>
          <p className="text-gray-500 text-sm">Enter a property address to get instant zoning information from the database.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <div className="flex gap-2">
            <AddressAutocomplete
              value={query}
              onChange={setQuery}
              onSelect={(s) => setQuery(s.formattedAddress)}
              placeholder="Enter property address..."
              size="md"
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={isLoading} className="bg-[#6D28D9] hover:bg-[#5b21b6] text-white px-6 shrink-0">
              {isLoading ? 'Loading...' : 'Look Up'}
            </Button>
          </div>
          <div className="mt-3">
            <CitySelector />
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {commonZones.map(code => (
              <button key={code} onClick={() => setZoneCode(code)} className={`text-xs px-2 py-1 rounded border ${zoneCode === code ? 'border-[#6D28D9] text-[#6D28D9] bg-[#6D28D9]/10' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}>
                {code}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-2">Select a zone code or search by address in {getJurisdictionName(selectedCity)}</p>
        </motion.div>

        {rule && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="card-surface p-4 border-l-2 border-[#6D28D9]">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{query || getJurisdictionName(selectedCity)}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl font-bold text-[#6D28D9]">{rule.zoneCode}</span>
                    <span className="text-gray-400">{rule.zoneName}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-600">{rule.jurisdiction}</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { icon: Ruler, label: 'Min Lot Size', value: rule.lotSizeMinSqft ? `${rule.lotSizeMinSqft.toLocaleString()} sq ft` : 'N/A' },
                { icon: Ruler, label: 'Min Lot Width', value: rule.lotWidthMinFt ? `${rule.lotWidthMinFt} ft` : 'N/A' },
                { icon: Building2, label: 'Height Limit', value: rule.maxHeightFt ? `${rule.maxHeightFt} ft` : 'N/A' },
                { icon: Car, label: 'Parking', value: rule.parkingRequired || 'N/A' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card-surface p-3">
                  <item.icon className="w-4 h-4 text-[#6D28D9] mb-2" />
                  <div className="text-xs text-gray-500">{item.label}</div>
                  <div className="font-medium text-sm">{item.value}</div>
                </motion.div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="card-surface p-4">
                <h4 className="font-medium mb-3 flex items-center gap-2"><TreePine className="w-4 h-4 text-[#10B981]" /> Setbacks</h4>
                <div className="space-y-2">
                  {[
                    { label: 'Front', value: rule.frontSetbackFt },
                    { label: 'Rear', value: rule.rearSetbackFt },
                    { label: 'Side', value: rule.sideSetbackFt },
                  ].map((s, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-400">{s.label}</span>
                      <span>{s.value ? `${s.value} ft` : 'N/A'}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-800 space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-gray-400">FAR</span><span>{rule.farMax || 'N/A'}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-400">Max Coverage</span><span>{rule.coverageMaxPct ? `${rule.coverageMaxPct}%` : 'N/A'}</span></div>
                </div>
              </div>

              <div className="card-surface p-4">
                <h4 className="font-medium mb-3">Permitted Uses</h4>
                <ul className="space-y-2">
                  {(rule.permittedUses as string[] || []).map((use: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1.5 shrink-0" />
                      {use}
                    </li>
                  ))}
                </ul>
                <h4 className="font-medium mb-2 mt-4 text-[#EF4444]">Prohibited Uses</h4>
                <ul className="space-y-2">
                  {(rule.prohibitedUses as string[] || []).map((use: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-1.5 shrink-0" />
                      {use}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {(rule.overlayDistricts as string[])?.length > 0 && (
              <div className="card-surface p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Overlay Districts
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(rule.overlayDistricts as string[]).map((o: string, i: number) => (
                    <span key={i} className="bg-amber-900/20 text-amber-400 text-xs px-3 py-1 rounded-full border border-amber-800/30">{o}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="card-surface p-4 border-l-2 border-[#10B981]">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium mb-1">Legal Disclaimer</h4>
                  <p className="text-xs text-gray-500">{rule.disclaimer}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
