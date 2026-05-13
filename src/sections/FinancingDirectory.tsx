import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { ChevronLeft, Banknote, Shield, AlertTriangle, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { trpc } from '@/providers/trpc';

export function FinancingDirectory() {
  const { setCurrentView } = useStore();
  const [expanded, setExpanded] = useState<number | null>(null);

  const { data: options, isLoading } = trpc.financing.list.useQuery();
  const types = ['All', ...new Set(options?.map(f => f.loanType) || [])];
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? options : options?.filter(f => f.loanType === filter);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="h-14 border-b border-gray-800 bg-[#111111] flex items-center px-4 lg:px-6">
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-400 hover:text-white mr-3"><ChevronLeft className="w-5 h-5" /></button>
        <Banknote className="w-5 h-5 text-[#6D28D9] mr-2" />
        <h1 className="font-semibold">Financing Options</h1>
      </header>

      <main className="p-4 lg:p-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Financing Options Directory</h2>
          <p className="text-gray-500 text-sm">{options?.length || 0} lenders available. Educational only.</p>
        </motion.div>

        <div className="card-surface p-4 mb-6 border-l-2 border-amber-500">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500">Landrealm is NOT a mortgage broker, lender, or financial advisor. This directory is for educational purposes only. Contact lenders directly.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)} className={`text-xs px-3 py-1.5 rounded-full transition-colors ${filter === t ? 'bg-[#6D28D9] text-white' : 'bg-[#1F2937] text-gray-400 hover:text-white'}`}>{t}</button>
          ))}
        </div>

        {isLoading && <div className="text-center text-gray-500 py-8">Loading...</div>}

        <div className="space-y-3">
          {filtered?.map((opt, i) => (
            <motion.div key={opt.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="card-surface overflow-hidden">
              <button onClick={() => setExpanded(expanded === opt.id ? null : opt.id)} className="w-full p-4 text-left">
                <div className="flex items-center justify-between">
                  <div><h4 className="font-medium">{opt.lenderName}</h4><p className="text-xs text-[#6D28D9]">{opt.loanType}</p></div>
                  <div className="flex items-center gap-4">
                    <div className="text-right"><div className="text-lg font-bold">{opt.rateApr}</div><div className="text-xs text-gray-500">APR</div></div>
                    {expanded === opt.id ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                  </div>
                </div>
              </button>
              {expanded === opt.id && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="overflow-hidden">
                  <div className="px-4 pb-4 border-t border-gray-800 pt-3">
                    <div className="grid sm:grid-cols-3 gap-3 mb-3">
                      <div className="bg-[#1F2937] p-2 rounded text-center"><div className="text-xs text-gray-500">Term</div><div className="text-sm font-medium">{opt.term}</div></div>
                      <div className="bg-[#1F2937] p-2 rounded text-center"><div className="text-xs text-gray-500">Min Down</div><div className="text-sm font-medium">{opt.minDownPayment}</div></div>
                      <div className="bg-[#1F2937] p-2 rounded text-center"><div className="text-xs text-gray-500">Rate</div><div className="text-sm font-medium">{opt.rateApr}</div></div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {(opt.features as string[])?.map((feat, j) => (
                        <span key={j} className="text-xs bg-[#6D28D9]/20 text-[#6D28D9] px-2 py-1 rounded-full flex items-center gap-1"><Star className="w-3 h-3" /> {feat}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="card-surface p-3 mt-6 border-l-2 border-[#10B981]">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
            <p className="text-[10px] text-gray-500">Educational only. NOT a mortgage broker, lender, or advisor. Contact lenders directly.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
