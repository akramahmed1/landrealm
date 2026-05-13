import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { ChevronLeft, Calculator, Ruler, Shield } from 'lucide-react';


const costFactors: Record<string, { base: number; factors: { name: string; multiplier: number }[] }> = {
  'Foundation': { base: 12, factors: [{ name: 'Slab on grade', multiplier: 1 }, { name: 'Pier & beam', multiplier: 1.3 }, { name: 'Basement', multiplier: 2.5 }] },
  'Framing': { base: 18, factors: [{ name: 'Wood frame', multiplier: 1 }, { name: 'Steel frame', multiplier: 1.8 }, { name: 'SIP panels', multiplier: 1.4 }] },
  'Roofing': { base: 8, factors: [{ name: 'Asphalt shingles', multiplier: 1 }, { name: 'Metal roof', multiplier: 1.6 }, { name: 'Tile roof', multiplier: 2.2 }] },
  'Electrical': { base: 10, factors: [{ name: 'Standard', multiplier: 1 }, { name: 'Smart home', multiplier: 1.4 }, { name: 'Solar ready', multiplier: 1.7 }] },
  'Plumbing': { base: 9, factors: [{ name: 'Standard', multiplier: 1 }, { name: 'Tankless water', multiplier: 1.2 }, { name: 'High-end fixtures', multiplier: 1.5 }] },
  'HVAC': { base: 7, factors: [{ name: 'Standard split', multiplier: 1 }, { name: 'High-efficiency', multiplier: 1.4 }, { name: 'Geothermal', multiplier: 3.5 }] },
  'Interior': { base: 22, factors: [{ name: 'Builder grade', multiplier: 1 }, { name: 'Mid-grade', multiplier: 1.5 }, { name: 'High-end', multiplier: 2.5 }] },
  'Exterior': { base: 14, factors: [{ name: 'Basic siding', multiplier: 1 }, { name: 'Brick/stone', multiplier: 1.8 }, { name: 'Premium cladding', multiplier: 2.3 }] },
};

export function CostCalculator() {
  const { setCurrentView } = useStore();
  const [sqft, setSqft] = useState('2500');
  const [stories, setStories] = useState(1);
  const [quality, setQuality] = useState<'budget' | 'mid' | 'luxury'>('mid');
  const [selectedFactors, setSelectedFactors] = useState<Record<string, number>>({});

  const handleFactorSelect = (category: string, idx: number) => {
    setSelectedFactors({ ...selectedFactors, [category]: idx });
  };

  const qualityMult = quality === 'budget' ? 0.85 : quality === 'mid' ? 1 : 1.35;
  const storiesMult = stories === 1 ? 1 : stories === 2 ? 0.92 : 0.88;
  const sqftNum = parseInt(sqft) || 2500;

  let totalPerSqft = 0;
  const breakdown = Object.entries(costFactors).map(([cat, data]) => {
    const selIdx = selectedFactors[cat] ?? 0;
    const factor = data.factors[selIdx];
    const cost = data.base * factor.multiplier * qualityMult * storiesMult;
    totalPerSqft += cost;
    return { category: cat, option: factor.name, costPerSqft: cost, total: Math.round(cost * sqftNum) };
  });

  const totalCost = Math.round(totalPerSqft * sqftNum);
  const rangeLow = Math.round(totalCost * 0.85);
  const rangeHigh = Math.round(totalCost * 1.15);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="h-14 border-b border-gray-800 bg-[#111111] flex items-center px-4 lg:px-6">
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-400 hover:text-white mr-3">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <Calculator className="w-5 h-5 text-[#6D28D9] mr-2" />
        <h1 className="font-semibold">Cost Calculator</h1>
      </header>

      <main className="p-4 lg:p-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Construction Cost Estimator</h2>
          <p className="text-gray-500 text-sm">Get a detailed breakdown of estimated construction costs.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 space-y-4">
            <div className="card-surface p-4">
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Square Footage</label>
                  <div className="relative">
                    <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input type="number" value={sqft} onChange={(e) => setSqft(e.target.value)} className="input-dark pl-10 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Stories</label>
                  <div className="flex gap-1">
                    {[1, 2, 3].map(s => (
                      <button key={s} onClick={() => setStories(s)} className={`flex-1 py-2 rounded text-sm ${stories === s ? 'bg-[#6D28D9] text-white' : 'bg-[#1F2937] text-gray-400'}`}>{s}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Finish Quality</label>
                  <div className="flex gap-1">
                    {(['budget', 'mid', 'luxury'] as const).map(q => (
                      <button key={q} onClick={() => setQuality(q)} className={`flex-1 py-2 rounded text-sm capitalize ${quality === q ? 'bg-[#6D28D9] text-white' : 'bg-[#1F2937] text-gray-400'}`}>{q}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {Object.entries(costFactors).map(([cat, data], catIdx) => (
              <motion.div key={cat} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: catIdx * 0.03 }} className="card-surface p-4">
                <h4 className="text-sm font-medium mb-3">{cat} <span className="text-gray-500 font-normal">(${data.base}/sqft base)</span></h4>
                <div className="grid grid-cols-3 gap-2">
                  {data.factors.map((factor, i) => {
                    const cost = data.base * factor.multiplier * qualityMult * storiesMult;
                    const isSelected = (selectedFactors[cat] ?? 0) === i;
                    return (
                      <button key={i} onClick={() => handleFactorSelect(cat, i)} className={`p-2 rounded text-xs text-center transition-colors ${isSelected ? 'bg-purple-900/30 border border-[#6D28D9]' : 'bg-[#1F2937] border border-transparent hover:border-gray-700'}`}>
                        <div className="font-medium">{factor.name}</div>
                        <div className="text-[#6D28D9]">${cost.toFixed(0)}/sqft</div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="card-surface p-4 sticky top-4">
              <h3 className="font-semibold mb-4">Cost Summary</h3>
              <div className="space-y-2 mb-4">
                {breakdown.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-400">{item.category}</span>
                    <span className="font-mono">${(item.costPerSqft * sqftNum / 1000).toFixed(0)}K</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-700 pt-3 mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Per Sq Ft</span>
                  <span className="font-bold text-[#6D28D9]">${totalPerSqft.toFixed(0)}</span>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-400">Total Range</span>
                  <span className="text-xs text-gray-500">{sqftNum.toLocaleString()} sqft</span>
                </div>
                <div className="text-2xl font-bold text-white">${(totalCost / 1000).toFixed(0)}K</div>
                <div className="text-sm text-gray-500">${rangeLow.toLocaleString()} - ${rangeHigh.toLocaleString()}</div>
              </div>

              <div className="mt-4 card-surface p-3 border-l-2 border-[#10B981]">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <p className="text-[10px] text-gray-500">Range estimate for planning. Obtain binding bids from licensed contractors.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
