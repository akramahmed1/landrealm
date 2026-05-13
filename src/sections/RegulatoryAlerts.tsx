import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { ChevronLeft, Bell, Calendar, Shield, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/providers/trpc';
import { CitySelector } from '@/components/CitySelector';
import { getJurisdictionName } from '@/lib/city';

export function RegulatoryAlerts() {
  const { setCurrentView, selectedCity } = useStore();
  const [filter, setFilter] = useState('all');

  const { data: alerts, isLoading } = trpc.alert.list.useQuery(
    filter === 'all' ? { jurisdiction: getJurisdictionName(selectedCity) } : { type: filter, jurisdiction: getJurisdictionName(selectedCity) }
  );
  const types = ['all', ...new Set(alerts?.map(a => a.alertType.toLowerCase()) || [])];

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="h-14 border-b border-gray-800 bg-[#111111] flex items-center px-4 lg:px-6">
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-400 hover:text-white mr-3"><ChevronLeft className="w-5 h-5" /></button>
        <Bell className="w-5 h-5 text-[#6D28D9] mr-2" />
        <h1 className="font-semibold">Regulatory Alerts</h1>
      </header>

      <main className="p-4 lg:p-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Regulatory Change Alerts</h2>
          <p className="text-gray-500 text-sm">{alerts?.length || 0} alerts from {getJurisdictionName(selectedCity)}.</p>
          <div className="mt-3 max-w-xs">
            <CitySelector />
          </div>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-6">
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)} className={`text-xs px-3 py-1.5 rounded-full transition-colors ${filter === t ? 'bg-[#6D28D9] text-white' : 'bg-[#1F2937] text-gray-400 hover:text-white'}`}>
              {t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {isLoading && <div className="text-center text-gray-500 py-8">Loading alerts...</div>}

        <div className="space-y-3">
          {alerts?.map((alert, i) => (
            <motion.div key={alert.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`card-surface p-4 ${alert.severity === 'urgent' ? 'border-l-2 border-[#EF4444]' : ''}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${alert.severity === 'urgent' ? 'bg-[#EF4444]/20 text-[#EF4444]' : 'bg-[#6D28D9]/20 text-[#6D28D9]'}`}>{alert.alertType}</span>
                  {alert.severity === 'urgent' && <span className="text-xs text-[#EF4444] font-medium">Urgent</span>}
                </div>
                <span className="text-xs text-gray-600 flex items-center gap-1"><Calendar className="w-3 h-3" />{alert.createdAt ? new Date(alert.createdAt).toLocaleDateString() : ''}</span>
              </div>
              <h4 className="font-medium text-sm mb-1">{alert.title}</h4>
              <p className="text-xs text-gray-500 mb-3">{alert.summary}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Source: {alert.source}</span>
                {alert.sourceUrl && <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white text-xs h-7 px-2" onClick={() => window.open(alert.sourceUrl!, '_blank')}><ExternalLink className="w-3 h-3 mr-1" /> View</Button>}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="card-surface p-3 mt-6 border-l-2 border-[#10B981]">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
            <p className="text-[10px] text-gray-500">Informational summary only. No legal interpretation. Always verify with the issuing authority.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
