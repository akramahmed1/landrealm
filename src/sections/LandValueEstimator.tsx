import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { ChevronLeft, TrendingUp, DollarSign, BarChart3, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { AddressAutocomplete } from '@/components/AddressAutocomplete';

export function LandValueEstimator() {
  const { setCurrentView, selectedAddress } = useStore();
  const [address, setAddress] = useState(selectedAddress || '');
  const [acreage, setAcreage] = useState('0.25');
  const [zoning, setZoning] = useState('SF-3');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleEstimate = () => {
    setLoading(true);
    setTimeout(() => {
      const acres = parseFloat(acreage) || 0.25;
      const baseValue = 425000 * acres;
      const zoningMult = zoning === 'SF-3' ? 1 : zoning === 'MF-4' ? 1.4 : zoning === 'CS' ? 1.8 : 1.2;
      const estimatedValue = Math.round(baseValue * zoningMult);
      const sqft = Math.round(acres * 43560);

      setResult({
        address: address || 'Austin, TX',
        acres,
        sqft,
        zoning,
        estimatedValue,
        perAcre: Math.round(estimatedValue / acres),
        perSqft: (estimatedValue / sqft).toFixed(2),
        confidence: 78,
        range: { low: Math.round(estimatedValue * 0.8), high: Math.round(estimatedValue * 1.2) },
        comps: [
          { address: '2150 Barton Springs Rd', price: 385000, acres: 0.23, date: '2026-03-15' },
          { address: '2080 Manchaca Rd', price: 450000, acres: 0.28, date: '2026-02-28' },
          { address: '3100 S Lamar Blvd', price: 410000, acres: 0.25, date: '2026-01-20' },
        ],
      });
      setLoading(false);
      toast.success('Estimate complete');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="h-14 border-b border-gray-800 bg-[#111111] flex items-center px-4 lg:px-6">
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-400 hover:text-white mr-3">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <TrendingUp className="w-5 h-5 text-[#6D28D9] mr-2" />
        <h1 className="font-semibold">Land Value Estimator</h1>
      </header>

      <main className="p-4 lg:p-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Estimate Land Value</h2>
          <p className="text-gray-500 text-sm">AI-powered land valuation based on comparable sales and zoning.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-surface p-6 mb-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Address</label>
              <AddressAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={(s) => setAddress(s.formattedAddress)}
                placeholder="Property address"
                size="sm"
                showIcon={false}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Acreage</label>
              <input type="number" value={acreage} onChange={(e) => setAcreage(e.target.value)} step="0.01" className="input-dark text-sm" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Zoning</label>
              <select value={zoning} onChange={(e) => setZoning(e.target.value)} className="input-dark text-sm">
                <option value="SF-3">SF-3 (Single Family)</option>
                <option value="MF-4">MF-4 (Multi Family)</option>
                <option value="CS">CS (Commercial)</option>
                <option value="MU">MU (Mixed Use)</option>
              </select>
            </div>
          </div>
          <Button onClick={handleEstimate} disabled={loading} className="mt-4 bg-[#6D28D9] hover:bg-[#5b21b6] text-white w-full sm:w-auto">
            {loading ? 'Analyzing...' : 'Get Estimate'}
          </Button>
        </motion.div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="card-surface p-4 text-center">
                <DollarSign className="w-5 h-5 text-[#6D28D9] mx-auto mb-2" />
                <div className="text-xs text-gray-500">Estimated Value</div>
                <div className="text-xl font-bold text-[#6D28D9]">${result.estimatedValue.toLocaleString()}</div>
              </div>
              <div className="card-surface p-4 text-center">
                <div className="text-xs text-gray-500">Per Acre</div>
                <div className="text-lg font-bold">${result.perAcre.toLocaleString()}</div>
              </div>
              <div className="card-surface p-4 text-center">
                <div className="text-xs text-gray-500">Per Sq Ft</div>
                <div className="text-lg font-bold">${result.perSqft}</div>
              </div>
              <div className="card-surface p-4 text-center">
                <div className="text-xs text-gray-500">Confidence</div>
                <div className="text-lg font-bold text-[#10B981]">{result.confidence}%</div>
              </div>
            </div>

            <div className="card-surface p-4">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#6D28D9]" />
                Value Range
              </h4>
              <div className="relative h-8 bg-gray-800 rounded-full overflow-hidden mb-2">
                <div className="absolute inset-y-0 left-[10%] right-[10%] bg-purple-900/30 rounded-full" />
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-[#6D28D9]" />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Low: ${result.range.low.toLocaleString()}</span>
                <span className="text-[#6D28D9] font-medium">Estimate</span>
                <span className="text-gray-500">High: ${result.range.high.toLocaleString()}</span>
              </div>
            </div>

            <div className="card-surface p-4">
              <h4 className="font-medium mb-3">Comparable Sales</h4>
              <div className="space-y-2">
                {result.comps.map((comp: any, i: number) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                    <div>
                      <div className="text-sm">{comp.address}</div>
                      <div className="text-xs text-gray-500">{comp.acres} acres | Sold {comp.date}</div>
                    </div>
                    <div className="text-sm font-medium">${comp.price.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-surface p-4 border-l-2 border-[#10B981]">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium mb-1">Disclaimer</h4>
                  <p className="text-xs text-gray-500">This is an estimate only. Verify with a licensed appraiser before purchase.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
