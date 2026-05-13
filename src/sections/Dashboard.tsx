import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Layers, TrendingUp, Calculator, BarChart3, FileCheck,
  PieChart, GitBranch, ClipboardCheck, Clock, Users,
  Briefcase, Scale, FolderCheck, Activity, Bell, Zap, Timer,
  Banknote, FileEdit, Home, Settings, CreditCard, LogOut,
  ChevronLeft, ChevronRight, Shield, Sparkles, Search, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CitySelector } from '@/components/CitySelector';

const navGroups = [
  {
    label: 'Core',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: Home, tier: 'free' },
      { id: 'wizard', label: 'Feasibility Wizard', icon: Sparkles, tier: 'free' },
    ],
  },
  {
    label: 'Free Tools',
    items: [
      { id: 'zoning', label: 'Zoning Lookup', icon: MapPin, tier: 'free' },
      { id: 'overlays', label: 'Overlay Map', icon: Layers, tier: 'free' },
      { id: 'land-value', label: 'Land Value Est.', icon: TrendingUp, tier: 'free' },
      { id: 'cost-calculator', label: 'Cost Calculator', icon: Calculator, tier: 'free' },
    ],
  },
  {
    label: 'Pro Tools',
    items: [
      { id: 'should-i-buy', label: 'Should I Buy? Score', icon: BarChart3, tier: 'pro' },
      { id: 'feasibility-report', label: 'Feasibility Report', icon: FileCheck, tier: 'pro' },
      { id: 'pro-forma', label: 'Pro Forma', icon: PieChart, tier: 'pro' },
      { id: 'permit-mapper', label: 'Permit Mapper', icon: GitBranch, tier: 'pro' },
      { id: 'document-checklist', label: 'Doc Checklist', icon: ClipboardCheck, tier: 'pro' },
      { id: 'permit-timeline', label: 'Permit Timeline', icon: Clock, tier: 'pro' },
      { id: 'community', label: 'Community Data', icon: Users, tier: 'pro' },
    ],
  },
  {
    label: 'Premium Tools',
    items: [
      { id: 'contractors', label: 'Contractor Directory', icon: Briefcase, tier: 'premium' },
      { id: 'bid-comparison', label: 'Bid Comparison', icon: Scale, tier: 'premium' },
      { id: 'milestones', label: 'Milestone Tracker', icon: FolderCheck, tier: 'premium' },
      { id: 'permit-status', label: 'Live Permit Status', icon: Activity, tier: 'premium' },
      { id: 'regulatory-alerts', label: 'Regulatory Alerts', icon: Bell, tier: 'premium' },
      { id: 'post-disaster', label: 'Disaster Navigator', icon: Zap, tier: 'premium' },
      { id: 'cost-of-delay', label: 'Cost of Delay', icon: Timer, tier: 'premium' },
      { id: 'financing', label: 'Financing Options', icon: Banknote, tier: 'premium' },
      { id: 'app-prep', label: 'App Prep Assistant', icon: FileEdit, tier: 'premium' },
    ],
  },
];

const tierColors: Record<string, string> = {
  free: 'text-[#10B981]',
  pro: 'text-[#6D28D9]',
  premium: 'text-amber-500',
};

const tierLabels: Record<string, string> = {
  free: 'Free',
  pro: 'Pro',
  premium: 'Premium',
};

export function Dashboard() {
  const { currentView, setCurrentView, tier, setIsLoggedIn, selectedAddress } = useStore();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNav = (id: string, requiredTier: string) => {
    if (requiredTier === 'pro' && tier === 'free') {
      toast.info('Pro feature', { description: 'Upgrade to Pro to access this feature.' });
      setCurrentView('upgrade');
      return;
    }
    if (requiredTier === 'premium' && tier !== 'premium') {
      toast.info('Premium feature', { description: 'Upgrade to Premium to access this feature.' });
      setCurrentView('upgrade');
      return;
    }
    setCurrentView(id);
    setMobileSidebarOpen(false);
  };

  const filteredGroups = searchQuery
    ? navGroups.map(g => ({
        ...g,
        items: g.items.filter(i => i.label.toLowerCase().includes(searchQuery.toLowerCase())),
      })).filter(g => g.items.length > 0)
    : navGroups;

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <button onClick={() => setCurrentView('dashboard')} className="flex items-center gap-2">
          <img src="/logo-icon.png" alt="" className="w-8 h-8" />
          {!sidebarCollapsed && <span className="font-bold text-lg">Landrealm</span>}
        </button>
        {!sidebarCollapsed && (
          <button onClick={() => setSidebarCollapsed(true)} className="text-gray-500 hover:text-white hidden lg:block">
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {!sidebarCollapsed && (
        <div className="px-4 py-3 space-y-2">
          <CitySelector />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search features..."
              className="w-full pl-9 pr-3 py-2 bg-[#1F2937] border border-gray-700 rounded-md text-sm text-white placeholder-gray-500 focus:border-[#6D28D9] focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto scrollbar-thin py-2">
        {filteredGroups.map((group) => (
          <div key={group.label} className="mb-2">
            {!sidebarCollapsed && (
              <div className="px-4 py-1.5 text-xs font-medium text-gray-600 uppercase tracking-wider">
                {group.label}
              </div>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              const locked = (item.tier === 'pro' && tier === 'free') || (item.tier === 'premium' && tier !== 'premium');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id, item.tier)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors relative ${
                    isActive
                      ? 'text-white bg-purple-900/20 border-r-2 border-[#6D28D9]'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <Icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-[#6D28D9]' : ''}`} />
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1 text-left truncate">{item.label}</span>
                      {locked && <span className={`text-[10px] ${tierColors[item.tier]}`}>{tierLabels[item.tier]}</span>}
                      {!locked && item.tier !== 'free' && <span className={`text-[10px] ${tierColors[item.tier]}`}>{tierLabels[item.tier]}</span>}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="border-t border-gray-800 p-4 space-y-1">
        <button onClick={() => setCurrentView('settings')} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 rounded transition-colors">
          <Settings className="w-[18px] h-[18px]" />
          {!sidebarCollapsed && <span>Settings</span>}
        </button>
        <button onClick={() => setCurrentView('upgrade')} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 rounded transition-colors">
          <CreditCard className="w-[18px] h-[18px]" />
          {!sidebarCollapsed && (
            <span className="flex items-center justify-between w-full">
              <span>Upgrade</span>
              <span className={`text-[10px] capitalize ${tierColors[tier]}`}>{tier}</span>
            </span>
          )}
        </button>
        <button onClick={() => { setIsLoggedIn(false); setCurrentView('landing'); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 rounded transition-colors">
          <LogOut className="w-[18px] h-[18px]" />
          {!sidebarCollapsed && <span>Log Out</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-black">
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col border-r border-gray-800 bg-[#111111] transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        {sidebarCollapsed && (
          <div className="flex items-center justify-center p-4 border-b border-gray-800">
            <button onClick={() => setSidebarCollapsed(false)} className="text-gray-500 hover:text-white">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileSidebarOpen(false)} />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} className="fixed left-0 top-0 bottom-0 w-64 bg-[#111111] border-r border-gray-800 z-50 lg:hidden flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <img src="/logo-icon.png" alt="" className="w-8 h-8" />
                  <span className="font-bold text-lg">Landrealm</span>
                </div>
                <button onClick={() => setMobileSidebarOpen(false)} className="text-gray-500 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <SidebarContent />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 border-b border-gray-800 bg-[#111111]/80 backdrop-blur flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white">
              <Search className="w-5 h-5" />
            </button>
            <h1 className="text-sm font-medium text-gray-300 capitalize">{currentView === 'dashboard' ? 'Overview' : currentView.replace(/-/g, ' ')}</h1>
          </div>
          <div className="flex items-center gap-3">
            {selectedAddress && (
              <span className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 bg-[#1F2937] px-3 py-1.5 rounded-full">
                <MapPin className="w-3 h-3" />
                {selectedAddress.length > 40 ? selectedAddress.slice(0, 40) + '...' : selectedAddress}
              </span>
            )}
            <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border ${
              tier === 'free' ? 'border-[#10B981]/30 text-[#10B981]' : tier === 'pro' ? 'border-[#6D28D9]/30 text-[#6D28D9]' : 'border-amber-500/30 text-amber-500'
            }`}>
              <Shield className="w-3 h-3" />
              {tierLabels[tier]}
            </span>
            <img src="/avatar-user.jpg" alt="Profile" className="w-8 h-8 rounded-full border border-gray-700" />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin p-4 lg:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Welcome */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-surface p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {selectedAddress ? 'Property Overview' : 'Welcome to Landrealm'}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {selectedAddress
                      ? selectedAddress
                      : 'Search for a property address to get started with your analysis.'}
                  </p>
                </div>
                {selectedAddress && (
                  <Button onClick={() => setCurrentView('wizard')} className="bg-[#6D28D9] hover:bg-[#5b21b6] text-white">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Run Feasibility Wizard
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Quick Stats */}
            {selectedAddress && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Zoning', value: 'SF-3', sub: 'Single Family' },
                  { label: 'Lot Size', value: '10,500', sub: 'sq ft' },
                  { label: 'Land Value', value: '$425K', sub: 'Estimated' },
                  { label: 'Buildable Area', value: '4,200', sub: 'sq ft max' },
                ].map((stat, i) => (
                  <div key={i} className="card-surface p-4">
                    <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                    <div className="text-xl font-bold">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.sub}</div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Feature Grid */}
            <div>
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Available Features</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {navGroups.flatMap(g => g.items.filter(i => i.id !== 'dashboard')).map((item, i) => {
                  const Icon = item.icon;
                  const locked = (item.tier === 'pro' && tier === 'free') || (item.tier === 'premium' && tier !== 'premium');
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => handleNav(item.id, item.tier)}
                      className={`card-surface p-4 text-left hover:border-purple-800/50 transition-all group ${locked ? 'opacity-60' : ''}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Icon className={`w-5 h-5 ${locked ? 'text-gray-600' : 'text-[#6D28D9] group-hover:scale-110 transition-transform'}`} />
                        <span className={`text-[10px] ${tierColors[item.tier]}`}>{tierLabels[item.tier]}</span>
                      </div>
                      <h4 className="text-sm font-medium">{item.label}</h4>
                      {locked && <p className="text-[10px] text-gray-600 mt-1">Upgrade to access</p>}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Compliance Banner */}
            <div className="card-surface p-4 border-l-2 border-[#10B981]">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium mb-1">Legal Compliance Status: Active</h4>
                  <p className="text-xs text-gray-500">
                    All features are attorney-reviewed. Landrealm provides general information only and is not a substitute for professional legal, financial, or construction advice. Verify all data with relevant authorities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
