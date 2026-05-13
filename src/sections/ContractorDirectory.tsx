import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { ChevronLeft, Briefcase, Star, Shield, AlertTriangle } from 'lucide-react';
import { trpc } from '@/providers/trpc';
import { CitySelector } from '@/components/CitySelector';
import { SUPPORTED_CITIES } from '@contracts/cities';

export function ContractorDirectory() {
  const { setCurrentView, selectedCity } = useStore();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filter, setFilter] = useState('');

  const cityData = SUPPORTED_CITIES.find(c => c.code === selectedCity);

  const { data: contractorList, isLoading } = trpc.contractor.list.useQuery({
    specialty: filter || undefined,
    city: cityData?.name || 'Austin',
    state: cityData?.state || 'TX',
  });

  const contractor = contractorList?.find(c => c.id === selectedId);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="h-14 border-b border-gray-800 bg-[#111111] flex items-center px-4 lg:px-6">
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-400 hover:text-white mr-3"><ChevronLeft className="w-5 h-5" /></button>
        <Briefcase className="w-5 h-5 text-[#6D28D9] mr-2" />
        <h1 className="font-semibold">Contractor Directory</h1>
      </header>

      <main className="p-4 lg:p-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Contractor Directory</h2>
          <p className="text-gray-500 text-sm">{contractorList?.length || 0} licensed contractors found in {cityData?.name || 'Austin'}.</p>
          <div className="mt-3 max-w-xs">
            <CitySelector />
          </div>
        </motion.div>

        <div className="card-surface p-4 mb-6 border-l-2 border-amber-500">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium mb-1">Important Notice</h4>
              <p className="text-xs text-gray-500">Contractors listed are independent third parties. Landrealm does NOT endorse any contractor. Conduct your own due diligence.</p>
            </div>
          </div>
        </div>

        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search by name or specialty..."
          className="input-dark text-sm mb-4"
        />

        {isLoading && <div className="text-center text-gray-500 py-8">Loading contractors...</div>}

        {selectedId && contractor ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-surface p-6">
            <button onClick={() => setSelectedId(null)} className="text-sm text-gray-500 hover:text-white mb-4">&larr; Back to list</button>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6D28D9] to-purple-400 flex items-center justify-center text-2xl font-bold shrink-0">
                {contractor.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold">{contractor.name}</h3>
                <p className="text-[#6D28D9]">{contractor.specialty}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-sm">{contractor.rating} ({contractor.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="bg-[#1F2937] p-3 rounded"><div className="text-xs text-gray-500">Phone</div><div className="text-sm">{contractor.phone}</div></div>
              <div className="bg-[#1F2937] p-3 rounded"><div className="text-xs text-gray-500">Email</div><div className="text-sm text-gray-400">{contractor.email}</div></div>
              <div className="bg-[#1F2937] p-3 rounded"><div className="text-xs text-gray-500">License</div><div className="text-sm">{contractor.licenseNumber}</div></div>
              <div className="bg-[#1F2937] p-3 rounded flex items-center gap-2"><Shield className="w-4 h-4 text-[#10B981]" /><span className="text-sm">{contractor.isVerified ? 'Verified' : 'Unverified'}</span></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#1F2937] p-3 rounded text-center"><div className="text-2xl font-bold">{contractor.yearsExperience}</div><div className="text-xs text-gray-500">Years Experience</div></div>
              <div className="bg-[#1F2937] p-3 rounded text-center"><div className="text-2xl font-bold">{contractor.projectsCompleted}</div><div className="text-xs text-gray-500">Projects Completed</div></div>
            </div>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {contractorList?.map((c, i) => (
              <motion.button key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} onClick={() => setSelectedId(c.id)} className="card-surface p-4 text-left hover:border-purple-800/50 transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6D28D9] to-purple-400 flex items-center justify-center font-bold text-sm shrink-0">
                    {c.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium text-sm truncate">{c.name}</h4>
                    <p className="text-xs text-[#6D28D9]">{c.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500 fill-amber-500" />{c.rating}</div>
                  <span>{c.yearsExperience} yrs</span>
                  <span>{c.projectsCompleted} jobs</span>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
