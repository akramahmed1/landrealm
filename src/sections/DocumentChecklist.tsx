import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { ChevronLeft, ClipboardCheck, CheckCircle, Circle, FileText, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const checklistItems = [
  { id: '1', category: 'Property', name: 'Deed or Title Report', required: true, description: 'Current deed showing legal ownership and property description.' },
  { id: '2', category: 'Property', name: 'Boundary Survey', required: true, description: 'Professional survey of property lines and improvements.' },
  { id: '3', category: 'Property', name: 'Title Insurance Policy', required: false, description: 'Current title insurance policy with all endorsements.' },
  { id: '4', category: 'Design', name: 'Site Plan (2 copies)', required: true, description: 'Scaled site plan showing property boundaries, setbacks, and building footprint.' },
  { id: '5', category: 'Design', name: 'Floor Plans (2 copies)', required: true, description: 'Detailed floor plans for all levels with room labels and dimensions.' },
  { id: '6', category: 'Design', name: 'Elevations (4 sides)', required: true, description: 'Exterior elevations showing all sides of the proposed structure.' },
  { id: '7', category: 'Engineering', name: 'Foundation Plan', required: true, description: 'Engineered foundation plan with footing and slab details.' },
  { id: '8', category: 'Engineering', name: 'Structural Calculations', required: true, description: 'Signed and sealed structural calculations.' },
  { id: '9', category: 'Engineering', name: 'MEP Plans', required: true, description: 'Mechanical, electrical, and plumbing plans.' },
  { id: '10', category: 'Environmental', name: 'Tree Survey', required: true, description: 'Survey of all trees >19 inches DBH per Austin ordinance.' },
  { id: '11', category: 'Environmental', name: 'Drainage Plan', required: true, description: 'Storm water drainage and detention plan.' },
  { id: '12', category: 'Fees', name: 'Permit Application Fee', required: true, description: 'Payment for permit application (varies by project scope).' },
  { id: '13', category: 'Fees', name: 'Plan Review Fee', required: true, description: 'Fee for plan review process.' },
  { id: '14', category: 'Fees', name: 'Impact Fees', required: true, description: 'Water, wastewater, and roadway impact fees.' },
];

const STORAGE_KEY = 'landrealm_checklist';

export function DocumentChecklist() {
  const { setCurrentView } = useStore();
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  const toggleCheck = (id: string) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completed = Object.values(checked).filter(Boolean).length;
  const total = checklistItems.length;
  const required = checklistItems.filter(i => i.required);
  const requiredCompleted = required.filter(i => checked[i.id]).length;

  const categories = [...new Set(checklistItems.map(i => i.category))];

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="h-14 border-b border-gray-800 bg-[#111111] flex items-center px-4 lg:px-6">
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-400 hover:text-white mr-3"><ChevronLeft className="w-5 h-5" /></button>
        <ClipboardCheck className="w-5 h-5 text-[#6D28D9] mr-2" />
        <h1 className="font-semibold">Document Checklist</h1>
      </header>

      <main className="p-4 lg:p-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Document Checklist + Pre-Filler</h2>
          <p className="text-gray-500 text-sm">Track required documents for your permit application. Progress is saved automatically.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-surface p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-gray-500">{completed}/{total} complete</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div animate={{ width: `${(completed / total) * 100}%` }} className="h-full bg-gradient-to-r from-[#6D28D9] to-purple-400 rounded-full" />
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Required items: {requiredCompleted}/{required.length} complete
          </div>
        </motion.div>

        <div className="space-y-4">
          {categories.map((cat, catIdx) => (
            <motion.div key={cat} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: catIdx * 0.05 }}>
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">{cat}</h3>
              <div className="space-y-1">
                {checklistItems.filter(i => i.category === cat).map((item) => (
                  <div key={item.id} className={`card-surface p-3 cursor-pointer transition-colors ${checked[item.id] ? 'border-l-2 border-[#10B981]' : ''}`}>
                    <div className="flex items-start gap-3" onClick={() => toggleCheck(item.id)}>
                      {checked[item.id] ? (
                        <CheckCircle className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${checked[item.id] ? 'line-through text-gray-500' : ''}`}>{item.name}</span>
                          {item.required && <span className="text-[10px] bg-[#EF4444]/20 text-[#EF4444] px-1.5 py-0.5 rounded">Required</span>}
                        </div>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); setExpanded(expanded === item.id ? null : item.id); }} className="text-gray-500 hover:text-white shrink-0">
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                    {expanded === item.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-2 pl-8">
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="card-surface p-4 mt-6 border-l-2 border-amber-500">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium mb-1">Pre-Filler Notice</h4>
              <p className="text-xs text-gray-500">Landrealm can prepare draft versions of standard forms. You must review, sign, and submit all documents.</p>
            </div>
          </div>
        </div>

        <div className="card-surface p-3 mt-3 border-l-2 border-[#10B981]">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
            <p className="text-[10px] text-gray-500">Drafts only. You review, sign, and submit. Progress auto-saves to browser.</p>
          </div>
        </div>

        <Button onClick={() => toast.success('Pre-filled forms generated')} className="mt-4 bg-[#6D28D9] hover:bg-[#5b21b6] text-white w-full sm:w-auto">
          Generate Pre-Filled Forms
        </Button>
      </main>
    </div>
  );
}
