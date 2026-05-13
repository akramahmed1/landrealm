import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { ChevronLeft, Timer, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CostOfDelay() {
  const { setCurrentView } = useStore();
  const [inputs, setInputs] = useState({
    landCost: 425000,
    monthlyCarryRate: 0.00625,
    softCosts: 5000,
    permitDelayMonths: 2,
    materialInflation: 0.005,
    opportunityCost: 3000,
  });
  const [showCalc, setShowCalc] = useState(false);

  const monthlyCarry = inputs.landCost * inputs.monthlyCarryRate;
  const carryCost = monthlyCarry * inputs.permitDelayMonths;
  const softCostTotal = inputs.softCosts * inputs.permitDelayMonths;
  const materialCost = inputs.landCost * 0.5 * inputs.materialInflation * inputs.permitDelayMonths;
  const opportunityTotal = inputs.opportunityCost * inputs.permitDelayMonths;
  const totalDelayCost = carryCost + softCostTotal + materialCost + opportunityTotal;
  const annualized = totalDelayCost / inputs.permitDelayMonths * 12;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="h-14 border-b border-gray-800 bg-[#111111] flex items-center px-4 lg:px-6">
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-400 hover:text-white mr-3"><ChevronLeft className="w-5 h-5" /></button>
        <Timer className="w-5 h-5 text-[#6D28D9] mr-2" />
        <h1 className="font-semibold">Cost of Delay Calculator</h1>
      </header>

      <main className="p-4 lg:p-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Cost-of-Delay Calculator</h2>
          <p className="text-gray-500 text-sm">Estimate the financial impact of permit and construction delays.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card-surface p-4 space-y-3">
            <h3 className="font-medium mb-2">Inputs</h3>
            {[
              { label: 'Land/Project Value', key: 'landCost', step: 1000 },
              { label: 'Monthly Carry Rate (%)', key: 'monthlyCarryRate', step: 0.0001 },
              { label: 'Monthly Soft Costs', key: 'softCosts', step: 100 },
              { label: 'Delay (months)', key: 'permitDelayMonths', step: 0.5 },
              { label: 'Monthly Material Inflation (%)', key: 'materialInflation', step: 0.001 },
              { label: 'Monthly Opportunity Cost', key: 'opportunityCost', step: 100 },
            ].map(field => (
              <div key={field.key}>
                <label className="text-xs text-gray-500 mb-1 block">{field.label}</label>
                <input type="number" value={inputs[field.key as keyof typeof inputs]} onChange={(e) => setInputs({ ...inputs, [field.key]: parseFloat(e.target.value) || 0 })} step={field.step} className="input-dark text-sm py-2" />
              </div>
            ))}
            <Button onClick={() => setShowCalc(true)} className="w-full bg-[#6D28D9] hover:bg-[#5b21b6] text-white">Calculate</Button>
          </motion.div>

          {showCalc && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
              <div className="card-surface p-4 text-center">
                <Timer className="w-8 h-8 text-[#EF4444] mx-auto mb-2" />
                <div className="text-3xl font-bold text-[#EF4444]">${totalDelayCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                <div className="text-sm text-gray-500">Total cost of delay</div>
                <div className="text-xs text-gray-600 mt-1">Annualized: ${annualized.toLocaleString(undefined, { maximumFractionDigits: 0 })}/year</div>
              </div>

              <div className="card-surface p-4">
                <h4 className="font-medium mb-3">Breakdown</h4>
                {[
                  { label: 'Carry Costs', value: carryCost },
                  { label: 'Soft Costs', value: softCostTotal },
                  { label: 'Material Inflation', value: materialCost },
                  { label: 'Opportunity Cost', value: opportunityTotal },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-gray-800 last:border-0">
                    <span className="text-sm text-gray-400">{item.label}</span>
                    <span className="text-sm font-mono">${item.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 font-bold">
                  <span>Total</span>
                  <span>${totalDelayCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>

              <div className="card-surface p-3 border-l-2 border-[#10B981]">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <p className="text-[10px] text-gray-500">Estimate for planning only. Actual costs depend on specific terms.</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
