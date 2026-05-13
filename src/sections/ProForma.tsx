import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { ChevronLeft, PieChart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function ProForma() {
  const { setCurrentView } = useStore();
  const [inputs, setInputs] = useState({
    landCost: 425000,
    constructionCost: 462500,
    softCosts: 65000,
    contingency: 0.1,
    salePrice: 975000,
    holdMonths: 12,
    carryRate: 0.075,
  });
  const [showReport, setShowReport] = useState(false);

  const totalCost = inputs.landCost + inputs.constructionCost + inputs.softCosts;
  const contingencyAmount = totalCost * inputs.contingency;
  const totalProjectCost = totalCost + contingencyAmount;
  const carryCost = totalProjectCost * (inputs.carryRate / 12) * inputs.holdMonths;
  const totalInvestment = totalProjectCost + carryCost;
  const grossProfit = inputs.salePrice - totalInvestment;
  const roi = (grossProfit / totalInvestment) * 100;
  const months = [
    { month: 'Month 0', land: inputs.landCost, construction: 0, cumulative: inputs.landCost },
    { month: 'Month 3', land: 0, construction: inputs.constructionCost * 0.3, cumulative: inputs.landCost + inputs.constructionCost * 0.3 },
    { month: 'Month 6', land: 0, construction: inputs.constructionCost * 0.35, cumulative: inputs.landCost + inputs.constructionCost * 0.65 },
    { month: 'Month 9', land: 0, construction: inputs.constructionCost * 0.25, cumulative: inputs.landCost + inputs.constructionCost * 0.9 },
    { month: 'Month 12', land: 0, construction: inputs.constructionCost * 0.1 + inputs.softCosts, cumulative: totalProjectCost },
  ];

  const handleGenerate = () => {
    setShowReport(true);
    toast.success('Pro forma generated');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="h-14 border-b border-gray-800 bg-[#111111] flex items-center px-4 lg:px-6">
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-400 hover:text-white mr-3"><ChevronLeft className="w-5 h-5" /></button>
        <PieChart className="w-5 h-5 text-[#6D28D9] mr-2" />
        <h1 className="font-semibold">Pro Forma Generator</h1>
      </header>

      <main className="p-4 lg:p-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Pro Forma Generator</h2>
          <p className="text-gray-500 text-sm">Hypothetical financial projections for your project.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
            <div className="card-surface p-4">
              <h3 className="font-medium mb-3">Project Inputs</h3>
              <div className="space-y-3">
                {[
                  { label: 'Land Cost', key: 'landCost', step: 1000 },
                  { label: 'Construction Cost', key: 'constructionCost', step: 1000 },
                  { label: 'Soft Costs', key: 'softCosts', step: 1000 },
                  { label: 'Contingency %', key: 'contingency', step: 0.01 },
                  { label: 'Expected Sale Price', key: 'salePrice', step: 1000 },
                  { label: 'Hold Period (months)', key: 'holdMonths', step: 1 },
                  { label: 'Carry Rate (annual)', key: 'carryRate', step: 0.005 },
                ].map(field => (
                  <div key={field.key}>
                    <label className="text-xs text-gray-500 mb-1 block">{field.label}</label>
                    <input
                      type="number"
                      value={inputs[field.key as keyof typeof inputs]}
                      onChange={(e) => setInputs({ ...inputs, [field.key]: parseFloat(e.target.value) || 0 })}
                      step={field.step}
                      className="input-dark text-sm py-2"
                    />
                  </div>
                ))}
              </div>
              <Button onClick={handleGenerate} className="w-full mt-4 bg-[#6D28D9] hover:bg-[#5b21b6] text-white">
                Generate Pro Forma
              </Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
            {showReport && (
              <>
                <div className="card-surface p-4">
                  <h3 className="font-medium mb-3">Summary</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#1F2937] p-3 rounded">
                      <div className="text-xs text-gray-500">Total Investment</div>
                      <div className="font-bold">${totalInvestment.toLocaleString()}</div>
                    </div>
                    <div className="bg-[#1F2937] p-3 rounded">
                      <div className="text-xs text-gray-500">Gross Profit</div>
                      <div className={`font-bold ${grossProfit >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>${grossProfit.toLocaleString()}</div>
                    </div>
                    <div className="bg-[#1F2937] p-3 rounded">
                      <div className="text-xs text-gray-500">ROI</div>
                      <div className={`font-bold ${roi >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>{roi.toFixed(1)}%</div>
                    </div>
                    <div className="bg-[#1F2937] p-3 rounded">
                      <div className="text-xs text-gray-500">Contingency</div>
                      <div className="font-bold">${contingencyAmount.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                <div className="card-surface p-4">
                  <h3 className="font-medium mb-3">Cost Breakdown</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Land Cost', value: inputs.landCost },
                      { label: 'Construction', value: inputs.constructionCost },
                      { label: 'Soft Costs', value: inputs.softCosts },
                      { label: 'Contingency', value: contingencyAmount },
                      { label: 'Carry Costs', value: carryCost },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-400">{item.label}</span>
                        <span className="font-mono">${item.value.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="border-t border-gray-700 pt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span>${totalInvestment.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="card-surface p-4">
                  <h3 className="font-medium mb-3">Cash Flow Timeline</h3>
                  <div className="space-y-2">
                    {months.map((m, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">{m.month}</span>
                          <span className="font-mono">${m.cumulative.toLocaleString()}</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${(m.cumulative / totalProjectCost) * 100}%` }} transition={{ delay: i * 0.1, duration: 0.5 }} className="h-full bg-[#6D28D9] rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-surface p-3 border-l-2 border-[#10B981]">
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <p className="text-[10px] text-gray-500">Hypothetical projections. Consult licensed CPA/advisor.</p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
