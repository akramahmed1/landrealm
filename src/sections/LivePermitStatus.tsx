import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { ChevronLeft, Activity, CheckCircle, Clock, AlertTriangle, Shield, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/providers/trpc';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

// Fallback static data
const staticPermitSteps = [
  { id: '1', name: 'Application Submitted', status: 'completed' as const, estimatedDays: 1, updatedAt: '2026-04-15' },
  { id: '2', name: 'Intake Review', status: 'completed' as const, estimatedDays: 3, updatedAt: '2026-04-18' },
  { id: '3', name: 'Initial Plan Review', status: 'in_progress' as const, estimatedDays: 21, updatedAt: '2026-04-20' },
  { id: '4', name: 'Reviewer Feedback', status: 'pending' as const, estimatedDays: 7, updatedAt: '' },
  { id: '5', name: 'Revisions & Resubmission', status: 'pending' as const, estimatedDays: 14, updatedAt: '' },
  { id: '6', name: 'Final Approval', status: 'pending' as const, estimatedDays: 10, updatedAt: '' },
  { id: '7', name: 'Permit Issued', status: 'pending' as const, estimatedDays: 3, updatedAt: '' },
];

export function LivePermitStatus() {
  const { setCurrentView } = useStore();
  const [projectId, setProjectId] = useState(1);
  const [useApi, setUseApi] = useState(false);

  const { data: permits, isLoading, refetch } = trpc.permit.listByProject.useQuery(
    { projectId },
    { enabled: useApi }
  );

  const handleRefresh = () => {
    if (useApi) {
      refetch();
    } else {
      setUseApi(true);
    }
    toast.success('Refreshing permit status...');
  };

  // Normalize API data or use static fallback
  const steps = permits && permits.length > 0
    ? permits.map((p: any) => ({
        id: String(p.id),
        name: p.type || p.permitType || 'Permit Application',
        status: (p.status === 'approved' ? 'completed' : p.status === 'submitted' || p.status === 'in_review' ? 'in_progress' : 'pending') as 'completed' | 'in_progress' | 'pending',
        estimatedDays: p.estimatedDays || 7,
        updatedAt: p.updatedAt ? new Date(p.updatedAt).toISOString().split('T')[0] : '',
      }))
    : staticPermitSteps;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="h-14 border-b border-gray-800 bg-[#111111] flex items-center px-4 lg:px-6">
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-400 hover:text-white mr-3"><ChevronLeft className="w-5 h-5" /></button>
        <Activity className="w-5 h-5 text-[#6D28D9] mr-2" />
        <h1 className="font-semibold">Live Permit Status</h1>
      </header>

      <main className="p-4 lg:p-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Live Permit Status Dashboard</h2>
          <p className="text-gray-500 text-sm">Real-time tracking of your permit applications.</p>
        </motion.div>

        <div className="card-surface p-4 mb-6 border-l-2 border-amber-500">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium mb-1">API-Only Feature</h4>
              <p className="text-xs text-gray-500">Data is sourced from city APIs where available. For jurisdictions without API access, manual updates are required. Landrealm does not store your passwords.</p>
            </div>
          </div>
        </div>

        <div className="card-surface p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Project ID</label>
              <input
                type="number"
                value={projectId}
                onChange={(e) => { setProjectId(Number(e.target.value)); setUseApi(false); }}
                className="input-dark text-sm"
                min={1}
              />
            </div>
            <Button onClick={handleRefresh} variant="outline" className="border-gray-700 text-gray-400 hover:text-white">
              <RefreshCw className="w-4 h-4 mr-1" /> {useApi ? 'Refresh' : 'Load from API'}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Permit #2026-BLD-0142</span>
            <span className="text-gray-700">|</span>
            <span>2100 Barton Springs Rd</span>
          </div>
          <span className="text-xs text-gray-600">{useApi && permits ? 'Live data' : 'Demo data'}</span>
        </div>

        {isLoading && (
          <div className="space-y-3">
            <Skeleton className="h-20 w-full bg-gray-800" />
            <Skeleton className="h-20 w-full bg-gray-800" />
            <Skeleton className="h-20 w-full bg-gray-800" />
          </div>
        )}

        {!isLoading && (
          <div className="space-y-3">
            {steps.map((step, i) => (
              <motion.div key={step.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card-surface p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {step.status === 'completed' && <CheckCircle className="w-5 h-5 text-[#10B981]" />}
                    {step.status === 'in_progress' && <Clock className="w-5 h-5 text-[#6D28D9] animate-pulse" />}
                    {step.status === 'pending' && <Clock className="w-5 h-5 text-gray-600" />}
                    <div>
                      <h4 className="text-sm font-medium">{step.name}</h4>
                      <p className="text-xs text-gray-500">Est. {step.estimatedDays} days{step.updatedAt ? ` · Updated ${step.updatedAt}` : ''}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full capitalize ${
                    step.status === 'completed' ? 'bg-[#10B981]/20 text-[#10B981]' :
                    step.status === 'in_progress' ? 'bg-[#6D28D9]/20 text-[#6D28D9]' :
                    'bg-gray-800 text-gray-500'
                  }`}>
                    {step.status === 'in_progress' ? 'In Review' : step.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="card-surface p-3 mt-6 border-l-2 border-[#10B981]">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
            <p className="text-[10px] text-gray-500">API-only. For others, manual update required. No password storage.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
