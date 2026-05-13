import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Bell, Shield, CreditCard, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function SettingsPage() {
  const { setCurrentView, setIsLoggedIn, tier } = useStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    regulatory: true,
    permitStatus: true,
    milestones: true,
    marketing: false,
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="h-14 border-b border-gray-800 bg-[#111111] flex items-center px-4 lg:px-6">
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-400 hover:text-white mr-3 flex items-center gap-1 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="font-semibold">Settings</h1>
      </header>

      <main className="p-4 lg:p-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row gap-6">
          {/* Sidebar */}
          <div className="sm:w-48 shrink-0 space-y-1">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${activeTab === t.id ? 'bg-purple-900/20 text-[#6D28D9]' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}>
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
            ))}
            <div className="border-t border-gray-800 pt-2 mt-2">
              <button onClick={() => { setIsLoggedIn(false); setCurrentView('landing'); }} className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors">
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-surface p-6 space-y-4">
                <h3 className="font-semibold mb-4">Profile</h3>
                <div className="flex items-center gap-4 mb-6">
                  <img src="/avatar-user.jpg" alt="" className="w-16 h-16 rounded-full border-2 border-[#6D28D9]" />
                  <div>
                    <div className="font-medium">Demo User</div>
                    <div className="text-sm text-gray-500">demo@landrealm.io</div>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Full Name</label>
                    <input type="text" defaultValue="Demo User" className="input-dark text-sm py-2" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Email</label>
                    <input type="email" defaultValue="demo@landrealm.io" className="input-dark text-sm py-2" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Phone</label>
                    <input type="tel" defaultValue="(512) 555-0199" className="input-dark text-sm py-2" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Company</label>
                    <input type="text" defaultValue="Austin Development LLC" className="input-dark text-sm py-2" />
                  </div>
                </div>
                <Button onClick={() => toast.success('Profile updated')} className="bg-[#6D28D9] hover:bg-[#5b21b6] text-white">Save Changes</Button>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-surface p-6 space-y-4">
                <h3 className="font-semibold mb-4">Notification Preferences</h3>
                {Object.entries(notifications).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                    <div>
                      <div className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      <div className="text-xs text-gray-500">Receive notifications about {key.toLowerCase()} updates</div>
                    </div>
                    <button onClick={() => setNotifications({ ...notifications, [key]: !val })} className={`w-11 h-6 rounded-full transition-colors ${val ? 'bg-[#6D28D9]' : 'bg-gray-700'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform mx-1 ${val ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'subscription' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-surface p-6">
                <h3 className="font-semibold mb-4">Subscription</h3>
                <div className="bg-[#1F2937] p-4 rounded mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Current Plan</span>
                    <span className={`text-sm font-bold ${tier === 'free' ? 'text-[#10B981]' : tier === 'pro' ? 'text-[#6D28D9]' : 'text-amber-500'}`}>
                      {tier.charAt(0).toUpperCase() + tier.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Price</span>
                    <span className="text-sm">${tier === 'free' ? 0 : tier === 'pro' ? 99 : 299}/mo</span>
                  </div>
                </div>
                <Button onClick={() => setCurrentView('upgrade')} className="bg-[#6D28D9] hover:bg-[#5b21b6] text-white w-full">Change Plan</Button>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-surface p-6 space-y-4">
                <h3 className="font-semibold mb-4">Security</h3>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Current Password</label>
                  <input type="password" placeholder="••••••••" className="input-dark text-sm py-2" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">New Password</label>
                  <input type="password" placeholder="Enter new password" className="input-dark text-sm py-2" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Confirm New Password</label>
                  <input type="password" placeholder="Confirm new password" className="input-dark text-sm py-2" />
                </div>
                <Button onClick={() => toast.success('Password updated')} className="bg-[#6D28D9] hover:bg-[#5b21b6] text-white">Update Password</Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
