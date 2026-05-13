import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { ChevronLeft, Zap, AlertTriangle, CheckCircle, Clock, Shield, Phone, ExternalLink, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/providers/trpc';
import { Skeleton } from '@/components/ui/skeleton';

const steps = [
  { title: 'Document Damage', desc: 'Photograph all damage before cleanup. Contact insurance adjuster.', icon: CheckCircle },
  { title: 'Contact Local Emergency Management', desc: 'Report damage to county emergency management office.', icon: Phone },
  { title: 'Apply for FEMA Assistance', desc: 'If federally declared disaster, apply at DisasterAssistance.gov.', icon: ExternalLink },
  { title: 'Schedule Inspection', desc: 'City will conduct expedited structural inspection.', icon: Clock },
  { title: 'Fast-Track Permit Application', desc: 'Submit for expedited rebuild permit (typically 48-72 hours).', icon: Zap },
  { title: 'Begin Rebuild', desc: 'Contractor may begin work with approved fast-track permit.', icon: CheckCircle },
];

const resources = [
  { name: 'FEMA Disaster Assistance', phone: '1-800-621-3362', url: 'https://www.disasterassistance.gov' },
  { name: 'Texas Department of Insurance', phone: '1-800-252-3439', url: 'https://www.tdi.texas.gov' },
  { name: 'Austin Emergency Management', phone: '(512) 974-2000', url: 'https://www.austintexas.gov/emergency' },
];

export function PostDisasterNavigator() {
  const { setCurrentView } = useStore();

  // Fetch emergency-type regulatory alerts
  const { data: alerts, isLoading } = trpc.alert.list.useQuery(
    { type: 'emergency' },
    { enabled: true }
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="h-14 border-b border-gray-800 bg-[#111111] flex items-center px-4 lg:px-6">
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-400 hover:text-white mr-3"><ChevronLeft className="w-5 h-5" /></button>
        <Zap className="w-5 h-5 text-[#6D28D9] mr-2" />
        <h1 className="font-semibold">Post-Disaster Navigator</h1>
      </header>

      <main className="p-4 lg:p-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Post-Disaster Fast-Track Navigator</h2>
          <p className="text-gray-500 text-sm">Guidance for rebuilding after a disaster. Subject to change.</p>
        </motion.div>

        {/* Live emergency alerts from API */}
        {isLoading && (
          <div className="mb-6 space-y-2">
            <Skeleton className="h-16 w-full bg-gray-800" />
          </div>
        )}

        {alerts && alerts.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
            <h3 className="text-sm font-medium text-[#EF4444] uppercase tracking-wider mb-2 flex items-center gap-2">
              <Bell className="w-4 h-4" /> Active Emergency Alerts
            </h3>
            <div className="space-y-2">
              {alerts.map((alert: any) => (
                <div key={alert.id} className="card-surface p-4 border-l-2 border-[#EF4444]">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">{alert.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{alert.summary}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                        <span>Source: {alert.source}</span>
                        {alert.effectiveDate && <span>Effective: {new Date(alert.effectiveDate).toLocaleDateString()}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="card-surface p-4 mb-6 border-l-2 border-[#EF4444]">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium mb-1">Emergency Notice</h4>
              <p className="text-xs text-gray-500">This fast-track process is only available after a federally or locally declared disaster. Verify current status with emergency management.</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#6D28D9]/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-sm font-bold text-[#6D28D9]">{i + 1}</span>
              </div>
              <div className="card-surface p-4 flex-1">
                <h4 className="font-medium text-sm mb-1">{step.title}</h4>
                <p className="text-xs text-gray-500">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Emergency Resources</h3>
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          {resources.map((res, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }} className="card-surface p-4">
              <h4 className="font-medium text-sm mb-2">{res.name}</h4>
              <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Phone className="w-3 h-3" />{res.phone}</div>
              <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white text-xs h-7 w-full mt-2">
                <ExternalLink className="w-3 h-3 mr-1" /> Visit Website
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="card-surface p-3 border-l-2 border-[#10B981]">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
            <p className="text-[10px] text-gray-500">Subject to change. Verify with emergency management.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
