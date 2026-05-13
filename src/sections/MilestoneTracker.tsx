import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { ChevronLeft, FolderCheck, CheckCircle, Clock, AlertTriangle, FileText, Shield } from 'lucide-react';
import { trpc } from '@/providers/trpc';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const statusConfig: Record<string, { color: string; bg: string; icon: typeof CheckCircle }> = {
  completed: { color: 'text-[#10B981]', bg: 'bg-[#10B981]/20', icon: CheckCircle },
  in_progress: { color: 'text-[#6D28D9]', bg: 'bg-[#6D28D9]/20', icon: Clock },
  upcoming: { color: 'text-gray-500', bg: 'bg-gray-800', icon: Clock },
  overdue: { color: 'text-[#EF4444]', bg: 'bg-[#EF4444]/20', icon: AlertTriangle },
};

// Fallback static milestones for demo when no project selected
const staticMilestones = [
  { id: 1, name: 'Site Survey', description: 'Complete boundary and topographic survey', status: 'completed', dueDate: '2026-04-01', documents: ['survey.pdf'] },
  { id: 2, name: 'Architectural Plans', description: 'Finalize architectural drawings', status: 'completed', dueDate: '2026-04-15', documents: ['plans_v1.pdf', 'plans_v2.pdf'] },
  { id: 3, name: 'Zoning Verification', description: 'Confirm zoning compliance', status: 'completed', dueDate: '2026-04-20', documents: ['zoning_letter.pdf'] },
  { id: 4, name: 'Permit Application', description: 'Submit building permit application', status: 'in_progress', dueDate: '2026-05-10', documents: ['permit_app.pdf'] },
  { id: 5, name: 'Plan Review', description: 'City plan review and feedback', status: 'upcoming', dueDate: '2026-06-01', documents: [] },
  { id: 6, name: 'Foundation Permit', description: 'Obtain foundation construction permit', status: 'upcoming', dueDate: '2026-06-15', documents: [] },
  { id: 7, name: 'Building Permit', description: 'Obtain main building permit', status: 'upcoming', dueDate: '2026-07-01', documents: [] },
  { id: 8, name: 'Inspection Phase 1', description: 'Foundation and framing inspection', status: 'upcoming', dueDate: '2026-08-01', documents: [] },
  { id: 9, name: 'Final Inspection', description: 'Certificate of occupancy inspection', status: 'upcoming', dueDate: '2026-09-15', documents: [] },
  { id: 10, name: 'Project Closeout', description: 'Final documentation and handover', status: 'upcoming', dueDate: '2026-10-01', documents: [] },
];

export function MilestoneTracker() {
  const { setCurrentView } = useStore();
  const [projectId, setProjectId] = useState(1);
  const [useApi, setUseApi] = useState(false);

  const { data: apiMilestones, isLoading } = trpc.permit.milestones.useQuery(
    { projectId },
    { enabled: useApi }
  );

  // Normalize API milestones to match our display format
  const normalizeMilestones = (ms: typeof apiMilestones) => {
    if (!ms || ms.length === 0) return staticMilestones;
    return ms.map((m: any) => ({
      id: m.id,
      name: m.title,
      description: m.description || '',
      status: m.status || 'upcoming',
      dueDate: m.dueDate ? new Date(m.dueDate).toISOString().split('T')[0] : '',
      documents: m.documents ? (typeof m.documents === 'string' ? [m.documents] : m.documents) : [],
    }));
  };

  const milestones = apiMilestones && apiMilestones.length > 0 ? normalizeMilestones(apiMilestones) : staticMilestones;
  const completed = milestones.filter((m: any) => m.status === 'completed').length;
  const total = milestones.length;
  const progress = (completed / total) * 100;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="h-14 border-b border-gray-800 bg-[#111111] flex items-center px-4 lg:px-6">
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-400 hover:text-white mr-3"><ChevronLeft className="w-5 h-5" /></button>
        <FolderCheck className="w-5 h-5 text-[#6D28D9] mr-2" />
        <h1 className="font-semibold">Milestone Tracker</h1>
      </header>

      <main className="p-4 lg:p-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Milestone Tracker + Document Vault</h2>
          <p className="text-gray-500 text-sm">Track project milestones and store related documents.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-surface p-4 mb-6">
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
            <Button
              onClick={() => { setUseApi(true); toast.success('Loading milestones...'); }}
              className="bg-[#6D28D9] hover:bg-[#5b21b6] text-white"
            >
              Load from API
            </Button>
          </div>
        </motion.div>

        {isLoading && (
          <div className="space-y-3">
            <Skeleton className="h-24 w-full bg-gray-800" />
            <Skeleton className="h-24 w-full bg-gray-800" />
            <Skeleton className="h-24 w-full bg-gray-800" />
          </div>
        )}

        {!isLoading && (
          <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-surface p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Project Progress</span>
                <span className="text-sm text-gray-500">{completed}/{total} complete</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1 }} className="h-full bg-gradient-to-r from-[#6D28D9] to-[#10B981] rounded-full" />
              </div>
            </motion.div>

            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-800" />
              <div className="space-y-4">
                {milestones.map((milestone: any, i: number) => {
                  const config = statusConfig[milestone.status] || statusConfig.upcoming;
                  const Icon = config.icon;
                  return (
                    <motion.div key={milestone.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="relative flex items-start gap-4 pl-2">
                      <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${config.bg}`}>
                        <Icon className={`w-5 h-5 ${config.color}`} />
                      </div>
                      <div className="card-surface p-4 flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-sm">{milestone.name}</h4>
                            <p className="text-xs text-gray-500 mt-1">{milestone.description}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full capitalize ${config.color} ${config.bg} shrink-0`}>
                            {milestone.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          {milestone.dueDate && <span>Due: {milestone.dueDate}</span>}
                          {milestone.documents && milestone.documents.length > 0 && (
                            <div className="flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              {milestone.documents.length} doc{milestone.documents.length > 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                        {milestone.documents && milestone.documents.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {milestone.documents.map((doc: string, j: number) => (
                              <span key={j} className="text-[10px] bg-[#1F2937] text-gray-400 px-2 py-1 rounded flex items-center gap-1">
                                <FileText className="w-3 h-3" /> {doc}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        <div className="card-surface p-3 mt-6 border-l-2 border-[#10B981]">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
            <p className="text-[10px] text-gray-500">Standard SaaS Terms of Service apply. Document storage is encrypted at rest and in transit.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
