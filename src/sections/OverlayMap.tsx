import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { ChevronLeft, Layers, Eye, EyeOff, Shield } from 'lucide-react';
import { trpc } from '@/providers/trpc';
import { CitySelector } from '@/components/CitySelector';
import { getJurisdictionName } from '@/lib/city';

export function OverlayMap() {
  const { setCurrentView, selectedCity } = useStore();
  const [activeTypes, setActiveTypes] = useState<Record<string, boolean>>({});

  const { data: layers } = trpc.zoning.getOverlays.useQuery(
    { jurisdiction: getJurisdictionName(selectedCity) }
  );

  const toggleLayer = (name: string) => {
    setActiveTypes(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const activeCount = layers?.filter(l => activeTypes[l.name]).length || 0;

  const typeColors: Record<string, string> = {
    flood: '#3B82F6', historic: '#F59E0B', wildfire: '#EF4444',
    utility: '#10B981', transit: '#8B5CF6',
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="h-14 border-b border-gray-800 bg-[#111111] flex items-center px-4 lg:px-6">
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-400 hover:text-white mr-3"><ChevronLeft className="w-5 h-5" /></button>
        <Layers className="w-5 h-5 text-[#6D28D9] mr-2" />
        <h1 className="font-semibold">Overlay Map</h1>
      </header>

      <main className="p-4 lg:p-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Multi-Jurisdiction Overlay</h2>
          <p className="text-gray-500 text-sm">{layers?.length || 0} layers available for {getJurisdictionName(selectedCity)}. {activeCount} active.</p>
          <div className="mt-3 max-w-xs">
            <CitySelector />
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:w-80 space-y-3 shrink-0">
            {layers?.map((layer, i) => {
              const isActive = !!activeTypes[layer.name];
              return (
                <motion.div key={layer.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} onClick={() => toggleLayer(layer.name)} className={`card-surface p-3 cursor-pointer transition-colors ${isActive ? 'border-l-2' : ''}`} style={isActive ? { borderLeftColor: typeColors[layer.type] || '#6D28D9' } : {}}>
                  <div className="flex items-center gap-3">
                    <button onClick={(e) => { e.stopPropagation(); toggleLayer(layer.name); }} className="shrink-0">
                      {isActive ? <Eye className="w-4 h-4" style={{ color: typeColors[layer.type] || '#6D28D9' }} /> : <EyeOff className="w-4 h-4 text-gray-600" />}
                    </button>
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: isActive ? (typeColors[layer.type] || '#6D28D9') : '#374151' }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{layer.displayName}</div>
                      <div className="text-xs text-gray-500 truncate">{layer.description}</div>
                    </div>
                    <span className="text-[10px] text-gray-600 uppercase shrink-0">{layer.type}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1">
            <div className="card-surface p-4 min-h-[500px] relative overflow-hidden">
              <svg viewBox="0 0 600 450" className="w-full h-auto">
                <rect width="600" height="450" fill="#0a0a0a" />
                <defs><pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1a1a1a" strokeWidth="0.5" /></pattern></defs>
                <rect width="600" height="450" fill="url(#grid)" />
                <rect x="180" y="0" width="40" height="450" fill="#1a1a1a" />
                <rect x="0" y="200" width="600" height="35" fill="#1a1a1a" />
                <rect x="380" y="0" width="25" height="450" fill="#1a1a1a" />
                <rect x="0" y="350" width="600" height="30" fill="#1a1a1a" />
                <rect x="230" y="50" width="140" height="130" fill="none" stroke="white" strokeWidth="2" />
                <text x="300" y="120" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Subject Property</text>

                {layers?.filter(l => activeTypes[l.name]).map((layer) => {
                  const color = typeColors[layer.type] || '#6D28D9';
                  if (layer.type === 'flood') return <ellipse key={layer.id} cx="480" cy="280" rx="100" ry="70" fill={color} opacity="0.12" stroke={color} strokeWidth="1" strokeDasharray="5,3" />;
                  if (layer.type === 'historic') return <rect key={layer.id} x="20" y="20" width="150" height="160" fill={color} opacity="0.1" stroke={color} strokeWidth="1" strokeDasharray="3,3" />;
                  if (layer.type === 'wildfire') return <rect key={layer.id} x="420" y="30" width="160" height="140" fill={color} opacity="0.08" stroke={color} strokeWidth="1" />;
                  if (layer.type === 'utility') return <line key={layer.id} x1="230" y1="180" x2="370" y2="180" stroke={color} strokeWidth="4" opacity="0.5" />;
                  if (layer.type === 'transit') return <rect key={layer.id} x="160" y="230" width="220" height="120" fill={color} opacity="0.08" stroke={color} strokeWidth="1" strokeDasharray="6,3" />;
                  return null;
                })}
              </svg>
            </div>
            <div className="card-surface p-3 mt-4 border-l-2 border-[#10B981]">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-500">Data sourced from public GIS records. Verify all overlay information directly with relevant authorities.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
