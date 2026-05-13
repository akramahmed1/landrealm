import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { ChevronLeft, GitBranch, CheckCircle, Clock, Shield, AlertTriangle } from 'lucide-react';
import { permitSteps } from '@/data/features';

export function PermitMapper() {
  const { setCurrentView } = useStore();

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="h-14 border-b border-gray-800 bg-[#111111] flex items-center px-4 lg:px-6">
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-400 hover:text-white mr-3"><ChevronLeft className="w-5 h-5" /></button>
        <GitBranch className="w-5 h-5 text-[#6D28D9] mr-2" />
        <h1 className="font-semibold">Permit Dependency Mapper</h1>
      </header>

      <main className="p-4 lg:p-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Permit Dependency Mapper</h2>
          <p className="text-gray-500 text-sm">Visual guide to permit dependencies and sequencing.</p>
        </motion.div>

        <div className="card-surface p-4 mb-4 border-l-2 border-[#10B981]">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500">General guide. Confirm complete requirements with the City of Austin Development Services Department.</p>
          </div>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-800" />

          <div className="space-y-4">
            {permitSteps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative flex items-start gap-4 pl-2"
              >
                {/* Status dot */}
                <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  step.status === 'completed' ? 'bg-[#10B981]/20' : step.status === 'in_progress' ? 'bg-[#6D28D9]/20' : 'bg-gray-800'
                }`}>
                  {step.status === 'completed' && <CheckCircle className="w-5 h-5 text-[#10B981]" />}
                  {step.status === 'in_progress' && <Clock className="w-5 h-5 text-[#6D28D9]" />}
                  {step.status === 'pending' && <span className="text-sm text-gray-500">{step.id}</span>}
                </div>

                <div className="card-surface p-4 flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-sm">{step.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full shrink-0 ${
                      step.status === 'completed' ? 'bg-[#10B981]/20 text-[#10B981]' :
                      step.status === 'in_progress' ? 'bg-[#6D28D9]/20 text-[#6D28D9]' :
                      'bg-gray-800 text-gray-500'
                    }`}>
                      {step.status === 'completed' ? 'Done' : step.status === 'in_progress' ? 'In Progress' : `${step.estimatedDays} days`}
                    </span>
                  </div>
                  {step.dependencies.length > 0 && (
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <GitBranch className="w-3 h-3" />
                      <span>Depends on: {step.dependencies.join(', ')}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="card-surface p-4 mt-6">
          <h4 className="font-medium mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500" /> Critical Path</h4>
          <p className="text-sm text-gray-500">The critical path is: Site Plan Review - Zoning Verification - Foundation Permit - Building Permit - Final Inspection - Certificate of Occupancy. Total estimated timeline: 44 days (excluding inspections).</p>
        </motion.div>
      </main>
    </div>
  );
}
