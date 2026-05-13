import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { Check, Shield, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { pricingPlans } from '@/data/features';

export function UpgradePage() {
  const { setCurrentView, tier, setTier } = useStore();

  const handleUpgrade = (newTier: 'free' | 'pro' | 'premium') => {
    setTier(newTier);
    toast.success(`Upgraded to ${newTier.charAt(0).toUpperCase() + newTier.slice(1)}!`);
    setTimeout(() => setCurrentView('dashboard'), 800);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="h-14 border-b border-gray-800 bg-[#111111] flex items-center px-4 lg:px-6">
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-400 hover:text-white mr-3 flex items-center gap-1 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="font-semibold">Upgrade Plan</h1>
      </header>

      <main className="p-4 lg:p-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Choose Your Plan</h2>
          <p className="text-gray-400 max-w-lg mx-auto">Start free and upgrade as your project needs grow. All plans include attorney-reviewed compliance.</p>
          {tier !== 'free' && (
            <div className="mt-3 inline-flex items-center gap-1 text-sm text-[#6D28D9] bg-purple-900/20 px-3 py-1 rounded-full">
              <Star className="w-4 h-4" /> Current: {tier.charAt(0).toUpperCase() + tier.slice(1)}
            </div>
          )}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.tier}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl border p-6 ${
                plan.tier === 'pro'
                  ? 'border-[#6D28D9] bg-purple-900/10'
                  : 'border-gray-800 bg-[#111111]'
              }`}
            >
              {plan.tier === 'pro' && (
                <span className="inline-block bg-[#6D28D9] text-white text-xs px-3 py-1 rounded-full mb-4">Most Popular</span>
              )}
              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">${plan.monthlyPrice}</span>
                <span className="text-gray-500 ml-1">/mo</span>
              </div>
              {plan.annualPrice > 0 && (
                <p className="text-xs text-gray-500 mb-4">${plan.annualPrice}/year (2 months free)</p>
              )}

              <ul className="space-y-2 mb-6">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span className="text-gray-400">{feat}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleUpgrade(plan.tier)}
                className={`w-full ${
                  plan.tier === tier
                    ? 'bg-gray-800 text-gray-400 cursor-not-allowed hover:bg-gray-800'
                    : plan.tier === 'pro'
                    ? 'bg-[#6D28D9] hover:bg-[#5b21b6] text-white'
                    : plan.tier === 'premium'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                }`}
                disabled={plan.tier === tier}
              >
                {plan.tier === tier ? 'Current Plan' : plan.monthlyPrice === 0 ? 'Continue Free' : `Upgrade to ${plan.name}`}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="card-surface p-4 mt-8 flex items-start gap-3">
          <Shield className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium mb-1">All Plans Include Legal Compliance</h4>
            <p className="text-xs text-gray-500">Every feature on Landrealm is attorney-reviewed and includes appropriate disclaimers. We never provide legal advice, investment advice, or construction recommendations.</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
