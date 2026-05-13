import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { ChevronLeft, Scale, Shield, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { sampleBids } from '@/data/features';

export function BidComparison() {
  const { setCurrentView } = useStore();
  const [expanded, setExpanded] = useState<string | null>(null);

  const minTotal = Math.min(...sampleBids.map(b => b.totalCost));
  const maxTotal = Math.max(...sampleBids.map(b => b.totalCost));
  const avgTotal = Math.round(sampleBids.reduce((acc, b) => acc + b.totalCost, 0) / sampleBids.length);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="h-14 border-b border-gray-800 bg-[#111111] flex items-center px-4 lg:px-6">
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-400 hover:text-white mr-3"><ChevronLeft className="w-5 h-5" /></button>
        <Scale className="w-5 h-5 text-[#6D28D9] mr-2" />
        <h1 className="font-semibold">Bid Comparison</h1>
      </header>

      <main className="p-4 lg:p-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Bid Comparison Tool</h2>
          <p className="text-gray-500 text-sm">Side-by-side comparison of contractor bids. Identifies differences only.</p>
        </motion.div>

        <div className="card-surface p-4 mb-6 border-l-2 border-amber-500">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500">This tool identifies differences between bids only. It does not determine superiority. Conduct your own due diligence on all contractors.</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="card-surface p-3 text-center">
            <div className="text-xs text-gray-500">Lowest</div>
            <div className="text-lg font-bold text-[#10B981]">${(minTotal / 1000).toFixed(0)}K</div>
          </div>
          <div className="card-surface p-3 text-center">
            <div className="text-xs text-gray-500">Average</div>
            <div className="text-lg font-bold">${(avgTotal / 1000).toFixed(0)}K</div>
          </div>
          <div className="card-surface p-3 text-center">
            <div className="text-xs text-gray-500">Highest</div>
            <div className="text-lg font-bold text-[#EF4444]">${(maxTotal / 1000).toFixed(0)}K</div>
          </div>
        </div>

        <div className="space-y-3">
          {sampleBids.map((bid, i) => (
            <motion.div key={bid.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="card-surface overflow-hidden">
              <button onClick={() => setExpanded(expanded === bid.id ? null : bid.id)} className="w-full flex items-center justify-between p-4 text-left">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${i === 0 ? 'bg-[#10B981]/20 text-[#10B981]' : i === 1 ? 'bg-amber-500/20 text-amber-500' : 'bg-[#6D28D9]/20 text-[#6D28D9]'}`}>
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-medium">{bid.contractorName}</h4>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>${(bid.totalCost / 1000).toFixed(0)}K total</span>
                      <span>{bid.timeline} months</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    bid.totalCost === minTotal ? 'bg-[#10B981]/20 text-[#10B981]' : bid.totalCost === maxTotal ? 'bg-[#EF4444]/20 text-[#EF4444]' : 'bg-gray-800 text-gray-400'
                  }`}>
                    {bid.totalCost === minTotal ? 'Lowest' : bid.totalCost === maxTotal ? 'Highest' : 'Mid'}
                  </span>
                  {expanded === bid.id ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                </div>
              </button>
              {expanded === bid.id && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="overflow-hidden">
                  <div className="px-4 pb-4 border-t border-gray-800 pt-3">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium mb-2">Cost Breakdown</h5>
                        <div className="space-y-1">
                          {bid.breakdown.map((item, j) => (
                            <div key={j} className="flex justify-between text-xs">
                              <span className="text-gray-500">{item.item}</span>
                              <span className="font-mono">${item.cost.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium mb-2">Details</h5>
                        <div className="text-xs text-gray-500 space-y-1">
                          <div><span className="text-gray-400">Timeline:</span> {bid.timeline} months</div>
                          <div><span className="text-gray-400">Materials:</span> {bid.materials.join(',')}</div>
                          <div><span className="text-gray-400">Notes:</span> {bid.notes}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="card-surface p-3 mt-4 border-l-2 border-[#10B981]">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
            <p className="text-[10px] text-gray-500">Identifies differences only. Does not determine superiority. Verify all bid details directly with contractors.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
