import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { ChevronLeft, Clock, Calendar, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { trpc } from '@/providers/trpc';
import { Skeleton } from '@/components/ui/skeleton';

const projectTypeMap: Record<string, string> = {
  'new-construction': 'new_construction',
  'addition': 'addition',
  'accessory': 'adu',
  'commercial': 'commercial',
};

export function PermitTimeline() {
  const { setCurrentView } = useStore();
  const [projectType, setProjectType] = useState('new-construction');
  const [enabled, setEnabled] = useState(false);

  const { data, isLoading } = trpc.permit.estimateTimeline.useQuery(
    { projectType: projectTypeMap[projectType] as "new_construction" | "addition" | "adu" | "commercial" },
    { enabled }
  );

  const handleEstimate = () => {
    setEnabled(true);
    toast.success('Fetching timeline estimate...');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="h-14 border-b border-gray-800 bg-[#111111] flex items-center px-4 lg:px-6">
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-400 hover:text-white mr-3"><ChevronLeft className="w-5 h-5" /></button>
        <Clock className="w-5 h-5 text-[#6D28D9] mr-2" />
        <h1 className="font-semibold">Permit Timeline Estimator</h1>
      </header>

      <main className="p-4 lg:p-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Permit Timeline Estimator</h2>
          <p className="text-gray-500 text-sm">Based on historical data from the City of Austin.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-surface p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Project Type</label>
              <select value={projectType} onChange={(e) => { setProjectType(e.target.value); setEnabled(false); }} className="input-dark text-sm py-2">
                <option value="new-construction">New Construction</option>
                <option value="addition">Addition/Renovation</option>
                <option value="accessory">Accessory Dwelling Unit</option>
                <option value="commercial">Commercial Build-Out</option>
              </select>
            </div>
            <Button onClick={handleEstimate} className="bg-[#6D28D9] hover:bg-[#5b21b6] text-white">Get Estimate</Button>
          </div>
        </motion.div>

        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full bg-gray-800" />
            <Skeleton className="h-32 w-full bg-gray-800" />
            <Skeleton className="h-32 w-full bg-gray-800" />
          </div>
        )}

        {data && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="card-surface p-4 text-center">
              <Calendar className="w-8 h-8 text-[#6D28D9] mx-auto mb-2" />
              <div className="text-3xl font-bold">{data.totalDays} days</div>
              <div className="text-sm text-gray-500">Estimated total permit timeline</div>
              <div className="text-xs text-gray-600 mt-1">(~{Math.round(data.totalDays / 7)} weeks)</div>
            </div>

            {data.timeline.map((phase, i) => (
              <motion.div key={phase.phase} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="card-surface p-4">
                <h3 className="font-semibold text-[#6D28D9] mb-3">{phase.phase}</h3>
                <div className="space-y-2">
                  {phase.steps.map((step, j) => (
                    <div key={j} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0">
                      <span className="text-sm text-gray-300">{step.name}</span>
                      <span className="text-sm font-medium">{step.days} days</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 text-xs text-gray-500">
                    <span>Phase subtotal</span>
                    <span>{phase.steps.reduce((a, s) => a + s.days, 0)} days</span>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="flex items-start gap-2 p-3 rounded bg-yellow-900/20 border border-yellow-800/40">
              <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
              <p className="text-xs text-yellow-400/80">{data.disclaimer}</p>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
