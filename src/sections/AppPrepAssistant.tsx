import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { ChevronLeft, FileEdit, FileText, Download, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const formTemplates = [
  { id: '1', name: 'Residential Building Permit Application', description: 'Primary application for new residential construction.', fields: ['Property Address', 'Legal Description', 'Owner Name', 'Contractor Name', 'License Number', 'Project Description', 'Estimated Cost', 'Square Footage'] },
  { id: '2', name: 'Site Plan Review Application', description: 'For site plan review and approval.', fields: ['Property Address', 'Zoning District', 'Lot Area', 'Building Coverage', 'Impervious Cover', 'Setback Dimensions', 'Parking Count'] },
  { id: '3', name: 'Foundation Only Permit', description: 'For foundation work only.', fields: ['Property Address', 'Engineer Name', 'Foundation Type', 'Soil Classification', 'Seismic Design Category'] },
  { id: '4', name: 'Electrical Permit Application', description: 'For electrical work.', fields: ['Property Address', 'Electrical Contractor', 'License Number', 'Service Size', 'Number of Circuits'] },
  { id: '5', name: 'Plumbing Permit Application', description: 'For plumbing work.', fields: ['Property Address', 'Plumbing Contractor', 'License Number', 'Water Service Size', 'Sewer Connection Type'] },
];

export function AppPrepAssistant() {
  const { setCurrentView } = useStore();
  const [selectedForm, setSelectedForm] = useState<string | null>(null);

  const form = formTemplates.find(f => f.id === selectedForm);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="h-14 border-b border-gray-800 bg-[#111111] flex items-center px-4 lg:px-6">
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-400 hover:text-white mr-3"><ChevronLeft className="w-5 h-5" /></button>
        <FileEdit className="w-5 h-5 text-[#6D28D9] mr-2" />
        <h1 className="font-semibold">Application Prep Assistant</h1>
      </header>

      <main className="p-4 lg:p-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Application Prep Assistant</h2>
          <p className="text-gray-500 text-sm">We prepare drafts. You review, sign, and submit.</p>
        </motion.div>

        <div className="card-surface p-4 mb-6 border-l-2 border-amber-500">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium mb-1">Drafts Only</h4>
              <p className="text-xs text-gray-500">Landrealm prepares draft applications based on your project information. You must review all information for accuracy, sign, and submit yourself.</p>
            </div>
          </div>
        </div>

        {form ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <button onClick={() => setSelectedForm(null)} className="text-sm text-gray-500 hover:text-white mb-4">&larr; Back to forms</button>
            <div className="card-surface p-6">
              <h3 className="font-semibold mb-1">{form.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{form.description}</p>

              <div className="space-y-3 mb-6">
                {form.fields.map((field, i) => (
                  <div key={i}>
                    <label className="text-xs text-gray-500 mb-1 block">{field}</label>
                    <input type="text" placeholder={`Enter ${field.toLowerCase()}...`} className="input-dark text-sm py-2" />
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button onClick={() => toast.success('Draft saved')} variant="outline" className="border-gray-700 text-gray-400 hover:text-white">Save Draft</Button>
                <Button onClick={() => toast.success('PDF downloaded')} className="bg-[#6D28D9] hover:bg-[#5b21b6] text-white">
                  <Download className="w-4 h-4 mr-2" /> Download PDF
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {formTemplates.map((f, i) => (
              <motion.button key={f.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} onClick={() => setSelectedForm(f.id)} className="card-surface p-4 text-left hover:border-purple-800/50 transition-all">
                <FileText className="w-6 h-6 text-[#6D28D9] mb-2" />
                <h4 className="font-medium text-sm">{f.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{f.fields.length} fields</p>
              </motion.button>
            ))}
          </div>
        )}

        <div className="card-surface p-3 mt-6 border-l-2 border-[#10B981]">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
            <p className="text-[10px] text-gray-500">We prepare drafts. You review, sign, and submit.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
