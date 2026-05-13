import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Layers, TrendingUp, Calculator, BarChart3, FileCheck,
  PieChart, GitBranch, ClipboardCheck, ListChecks, Clock, Users,
  Briefcase, Scale, FolderCheck, Activity, Bell, Zap, Timer,
  Banknote, FileEdit, ChevronRight, Check, Shield, X, Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AddressAutocomplete } from '@/components/AddressAutocomplete';



const freeFeatures = [
  { icon: MapPin, title: 'Address to Zoning Q&A', desc: 'Instant zoning rules for any address' },
  { icon: Layers, title: 'Overlay Detection', desc: 'FEMA flood, historic, utility layers' },
  { icon: TrendingUp, title: 'Land Value Estimator', desc: 'AI-powered land valuation' },
  { icon: Calculator, title: 'Basic Cost Calculator', desc: 'Quick construction cost ranges' },
];

const proFeatures = [
  { icon: BarChart3, title: '"Should I Buy?" Score', desc: 'Data-driven purchase decision score' },
  { icon: FileCheck, title: 'Full Feasibility Report', desc: 'Complete feasibility analysis' },
  { icon: PieChart, title: 'Pro Forma Generator', desc: 'Financial projections & ROI' },
  { icon: GitBranch, title: 'Permit Dependency Mapper', desc: 'Visual permit workflow' },
  { icon: ClipboardCheck, title: 'Pre-Submission Health Check', desc: 'Catch issues before filing' },
  { icon: ListChecks, title: 'Document Checklist + Pre-Filler', desc: 'Auto-generated document drafts' },
  { icon: Calculator, title: 'Detailed Cost Estimator', desc: 'Line-item construction costs' },
  { icon: Clock, title: 'Permit Timeline Estimator', desc: 'Realistic permit timelines' },
  { icon: Users, title: 'Community Context Dashboard', desc: 'Neighborhood market trends' },
];

const premiumFeatures = [
  { icon: Briefcase, title: 'Contractor Directory', desc: 'Find licensed local contractors' },
  { icon: Scale, title: 'Bid Comparison Tool', desc: 'Side-by-side bid analysis' },
  { icon: FolderCheck, title: 'Milestone Tracker + Vault', desc: 'Project tracking & document storage' },
  { icon: Activity, title: 'Live Permit Status', desc: 'Real-time permit tracking' },
  { icon: Bell, title: 'Regulatory Change Alerts', desc: 'Code changes that affect you' },
  { icon: Zap, title: 'Post-Disaster Navigator', desc: 'Fast-track rebuilding guidance' },
  { icon: Timer, title: 'Cost-of-Delay Calculator', desc: 'Quantify waiting costs' },
  { icon: Banknote, title: 'Financing Options Directory', desc: 'Construction loan comparison' },
  { icon: FileEdit, title: 'Application Prep Assistant', desc: 'Draft permit applications' },
];

export function LandingPage() {
  const { setCurrentView, setIsLoggedIn, setSelectedAddress, setTier } = useStore();
  const [address, setAddress] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleSearch = () => {
    if (address) {
      setSelectedAddress(address);
      setCurrentView('dashboard');
      setIsLoggedIn(true);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const }
    }),
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo-icon.png" alt="" className="w-8 h-8" />
            <span className="text-xl font-bold">Landrealm</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-gray-400 hover:text-white transition-colors">Features</button>
            <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</button>
            <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-gray-400 hover:text-white transition-colors">How It Works</button>
            <button onClick={() => setShowLogin(true)} className="text-sm text-gray-400 hover:text-white transition-colors">Log In</button>
            <Button onClick={() => setShowSignup(true)} className="bg-[#6D28D9] hover:bg-[#5b21b6] text-white text-sm px-4 py-2 rounded">Get Started</Button>
          </div>
          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        {mobileMenu && (
          <div className="md:hidden bg-black border-t border-gray-800 px-4 py-4 space-y-3">
            <button onClick={() => { document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenu(false); }} className="block text-sm text-gray-400">Features</button>
            <button onClick={() => { document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenu(false); }} className="block text-sm text-gray-400">Pricing</button>
            <button onClick={() => { setShowLogin(true); setMobileMenu(false); }} className="block text-sm text-gray-400">Log In</button>
            <Button onClick={() => { setShowSignup(true); setMobileMenu(false); }} className="w-full bg-[#6D28D9] hover:bg-[#5b21b6] text-white text-sm">Get Started</Button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-6">
            <span className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-800/50 rounded-full px-4 py-1.5 text-sm text-purple-300">
              <Shield className="w-4 h-4" />
              22 features. All legal-compliant.
            </span>
          </motion.div>
          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Know before you build.
            <br />
            <span className="text-gradient">From land search to breaking ground.</span>
          </motion.h1>
          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Landrealm helps property investors, developers, and homeowners across the USA assess feasibility, navigate permits, and connect with contractors — all in one platform.
          </motion.p>

          {/* Address Search */}
          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="max-w-xl mx-auto">
            <div className="flex gap-2">
              <AddressAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={(s) => { setAddress(s.formattedAddress); setSelectedAddress(s.formattedAddress); }}
                placeholder="Enter a property address..."
                autoFocus={false}
                size="lg"
                className="flex-1"
              />
              <Button onClick={handleSearch} className="bg-[#6D28D9] hover:bg-[#5b21b6] text-white px-6 py-4 rounded-lg text-sm font-medium shrink-0">
                Analyze
              </Button>
            </div>
          </motion.div>

          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Check className="w-4 h-4 text-[#10B981]" />
            <span>No credit card required for free tier</span>
            <span className="mx-2">|</span>
            <Check className="w-4 h-4 text-[#10B981]" />
            <span>Attorney-reviewed compliance</span>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" className="max-w-6xl mx-auto mt-16 rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
          <img src="/property-hero.jpg" alt="Property analysis" className="w-full h-auto object-cover" />
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 border-y border-gray-800 bg-[#111111]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '$12.79B', label: 'Addressable Market' },
            { value: '22', label: 'Platform Features' },
            { value: '4', label: 'Pricing Tiers' },
            { value: '16 wk', label: 'Time to Launch' },
          ].map((stat, i) => (
            <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">22 Features. All Included.</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">From basic zoning lookups to full project management, Landrealm covers the entire property development lifecycle.</p>
          </motion.div>

          {/* Free Tier */}
          <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-[#10B981]" />
              <h3 className="text-xl font-semibold">Free Tier — $0/month</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {freeFeatures.map((f, i) => (
                <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="card-surface p-5 hover:border-purple-800/50 transition-colors group">
                  <f.icon className="w-8 h-8 text-[#6D28D9] mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-medium mb-1">{f.title}</h4>
                  <p className="text-sm text-gray-500">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pro Tier */}
          <motion.div custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-[#6D28D9]" />
              <h3 className="text-xl font-semibold">Pro Tier — $99/month</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {proFeatures.map((f, i) => (
                <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="card-surface p-5 hover:border-purple-800/50 transition-colors group">
                  <f.icon className="w-7 h-7 text-[#6D28D9] mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-medium mb-1 text-sm">{f.title}</h4>
                  <p className="text-xs text-gray-500">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Premium Tier */}
          <motion.div custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <h3 className="text-xl font-semibold">Premium Tier — $299/month</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {premiumFeatures.map((f, i) => (
                <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="card-surface p-5 hover:border-purple-800/50 transition-colors group">
                  <f.icon className="w-7 h-7 text-amber-500 mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-medium mb-1 text-sm">{f.title}</h4>
                  <p className="text-xs text-gray-500">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#111111]">
        <div className="max-w-6xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How Landrealm Works</h2>
            <p className="text-gray-400">From property search to breaking ground in 4 simple steps.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Enter Address', desc: 'Search any property in 30+ US cities to instantly access zoning, overlays, and land value data.' },
              { step: '02', title: 'Run Analysis', desc: 'Use our feasibility wizard and scoring tools to assess project viability.' },
              { step: '03', title: 'Plan & Prepare', desc: 'Map permit dependencies, generate documents, and prepare applications.' },
              { step: '04', title: 'Build & Track', desc: 'Connect with contractors, compare bids, and track milestones.' },
            ].map((s, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
                <div className="text-5xl font-bold text-[#6D28D9]/20 mb-4">{s.step}</div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-400">Start free. Upgrade when you need more power.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Free', price: '$0', period: '', features: freeFeatures.map(f => f.title), cta: 'Start Free', highlighted: false },
              { name: 'Pro', price: '$99', period: '/mo', features: proFeatures.map(f => f.title), cta: 'Start Pro Trial', highlighted: true },
              { name: 'Premium', price: '$299', period: '/mo', features: premiumFeatures.map(f => f.title), cta: 'Start Premium Trial', highlighted: false },
            ].map((plan, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className={`rounded-xl p-6 border ${plan.highlighted ? 'border-[#6D28D9] bg-purple-900/10' : 'border-gray-800 bg-[#111111]'}`}>
                {plan.highlighted && <span className="inline-block bg-[#6D28D9] text-white text-xs px-3 py-1 rounded-full mb-4">Most Popular</span>}
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.slice(0, 4).map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                      <Check className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                  {plan.features.length > 4 && (
                    <li className="text-sm text-gray-600">+{plan.features.length - 4} more features</li>
                  )}
                </ul>
                <Button
                  onClick={() => { setTier(plan.name.toLowerCase() as 'free' | 'pro' | 'premium'); setShowSignup(true); }}
                  className={`w-full ${plan.highlighted ? 'bg-[#6D28D9] hover:bg-[#5b21b6] text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-900/20 to-transparent">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to know before you build?</h2>
            <p className="text-gray-400 mb-8">Join thousands of property developers, investors, and homeowners using Landrealm.</p>
            <Button onClick={() => setShowSignup(true)} className="bg-[#6D28D9] hover:bg-[#5b21b6] text-white px-8 py-3 rounded-lg text-lg font-medium">
              Get Started Free
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm text-gray-600 mt-4">No credit card required. Free forever tier available.</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo-icon.png" alt="" className="w-6 h-6" />
                <span className="font-semibold">Landrealm</span>
              </div>
              <p className="text-sm text-gray-500">Know before you build. From land search to breaking ground.</p>
            </div>
            <div>
              <h4 className="font-medium mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Features</button></li>
                <li><button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Pricing</button></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">API Access</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Disclaimer</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><span className="hover:text-white transition-colors cursor-pointer">About</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Contact</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Careers</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-600">
            Landrealm is for informational purposes only. Not legal, financial, or construction advice.
            <br />
            &copy; 2026 Landrealm. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#111111] border border-gray-800 rounded-xl p-6 w-full max-w-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Log In</h3>
                <button onClick={() => setShowLogin(false)} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <input type="email" placeholder="Email" className="input-dark" />
                <input type="password" placeholder="Password" className="input-dark" />
                <Button onClick={() => { setIsLoggedIn(true); setCurrentView('dashboard'); setShowLogin(false); }} className="w-full bg-[#6D28D9] hover:bg-[#5b21b6] text-white py-3">
                  Log In
                </Button>
                <p className="text-center text-sm text-gray-500">
                  No account? <button onClick={() => { setShowLogin(false); setShowSignup(true); }} className="text-[#6D28D9] hover:underline">Sign up</button>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Signup Modal */}
      <AnimatePresence>
        {showSignup && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#111111] border border-gray-800 rounded-xl p-6 w-full max-w-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Create Account</h3>
                <button onClick={() => setShowSignup(false)} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <input type="text" placeholder="Full Name" className="input-dark" />
                <input type="email" placeholder="Email" className="input-dark" />
                <input type="password" placeholder="Password" className="input-dark" />
                <div className="flex items-start gap-2 text-xs text-gray-500">
                  <input type="checkbox" className="mt-0.5" />
                  <span>I understand Landrealm provides general information only and is not a substitute for professional legal, financial, or construction advice.</span>
                </div>
                <Button onClick={() => { setIsLoggedIn(true); setCurrentView('dashboard'); setShowSignup(false); }} className="w-full bg-[#6D28D9] hover:bg-[#5b21b6] text-white py-3">
                  Create Account
                </Button>
                <p className="text-center text-sm text-gray-500">
                  Already have an account? <button onClick={() => { setShowSignup(false); setShowLogin(true); }} className="text-[#6D28D9] hover:underline">Log in</button>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
