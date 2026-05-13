import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { ChevronLeft, BarChart3, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { feasibilityFactors } from '@/data/features';

export function ShouldIBuyScore() {
  const { setCurrentView, selectedAddress } = useStore();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      const totalScore = Math.round(feasibilityFactors.reduce((acc, f) => acc + f.score * f.weight / 100, 0));
      setResult({
        address: selectedAddress || 'Austin, TX',
        totalScore,
        verdict: totalScore >= 80 ? 'Strong Buy' : totalScore >= 60 ? 'Buy' : totalScore >= 40 ? 'Caution' : 'Pass',
        verdictColor: totalScore >= 80 ? '#10B981' : totalScore >= 60 ? '#6D28D9' : totalScore >= 40 ? '#F59E0B' : '#EF4444',
        factors: feasibilityFactors,
      });
      setLoading(false);
      toast.success('Analysis complete');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="h-14 border-b border-gray-800 bg-[#111111] flex items-center px-4 lg:px-6">
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-400 hover:text-white mr-3">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <BarChart3 className="w-5 h-5 text-[#6D28D9] mr-2" />
        <h1 className="font-semibold">Should I Buy? Score</h1>
      </header>

      <main className="p-4 lg:p-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">"Should I Buy?" Score</h2>
          <p className="text-gray-500 text-sm">Analytical composite score to help guide your purchase decision.</p>
        </motion.div>

        {!result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-surface p-6 text-center">
            <BarChart3 className="w-12 h-12 text-[#6D28D9] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Property Purchase Analysis</h3>
            <p className="text-gray-500 text-sm mb-4">This tool analyzes multiple factors to generate a composite score for your property purchase decision.</p>
            <p className="text-xs text-gray-600 mb-6 max-w-md mx-auto">
              <AlertTriangle className="w-3 h-3 inline mr-1" />
              This is an analytical composite, NOT investment advice. No guarantee of outcomes.
            </p>
            <Button onClick={handleAnalyze} disabled={loading} className="bg-[#6D28D9] hover:bg-[#5b21b6] text-white px-8">
              {loading ? 'Analyzing...' : 'Run Analysis'}
            </Button>
          </motion.div>
        )}

        {result && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="card-surface p-6 text-center">
              <div className="inline-flex items-center justify-center w-28 h-28 rounded-full border-4 mb-4" style={{ borderColor: result.verdictColor }}>
                <div>
                  <div className="text-4xl font-bold" style={{ color: result.verdictColor }}>{result.totalScore}</div>
                  <div className="text-xs text-gray-500">/100</div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1" style={{ color: result.verdictColor }}>{result.verdict}</h3>
              <p className="text-sm text-gray-500">{result.address}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {result.factors.map((factor: any, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="card-surface p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{factor.name}</span>
                    <span className="text-sm font-bold text-[#6D28D9]">{factor.score}/100</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${factor.score}%` }} transition={{ delay: i * 0.08 + 0.2, duration: 0.5 }} className="h-full bg-gradient-to-r from-[#6D28D9] to-purple-400 rounded-full" />
                  </div>
                  <p className="text-xs text-gray-500">{factor.details}</p>
                </motion.div>
              ))}
            </div>

            <div className="card-surface p-4 border-l-2 border-amber-500">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium mb-1">Important Notice</h4>
                  <p className="text-xs text-gray-500">This is an analytical composite, NOT investment advice. Consult a licensed real estate professional and financial advisor before making purchase decisions.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setResult(null)} variant="outline" className="border-gray-700 text-gray-400 hover:text-white">Run Again</Button>
              <Button onClick={() => toast.success('Report saved')} className="bg-[#6D28D9] hover:bg-[#5b21b6] text-white">Save Report</Button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
