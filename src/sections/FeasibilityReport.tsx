import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { ChevronLeft, FileCheck, Shield, AlertTriangle, Download, Building2, DollarSign, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function FeasibilityReport() {
  const { setCurrentView, selectedAddress } = useStore();
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>(null);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setReport({
        address: selectedAddress || '2100 Barton Springs Rd, Austin, TX 78704',
        generatedAt: new Date().toLocaleDateString(),
        executiveSummary: 'The property demonstrates strong feasibility for a single-family residential development. Zoning is favorable, setbacks allow for a substantial buildable envelope, and market conditions support the investment.',
        zoning: {
          classification: 'SF-3 (Single Family)',
          status: 'Compliant',
          lotSize: '10,500 sq ft',
          buildableArea: '4,200 sq ft',
          heightLimit: '35 ft',
          storiesAllowed: 2,
        },
        siteAnalysis: {
          topography: 'Relatively flat, minor slope (<3%)',
          soil: 'Clay loam - suitable for slab foundation',
          utilities: 'City water, sewer, electric available',
          access: 'Paved street frontage, driveway access approved',
        },
        marketAnalysis: {
          medianPrice: '$685,000',
          pricePerSqft: '$312',
          daysOnMarket: '18 days',
          appreciation: '+12.3% YoY',
        },
        financialSummary: {
          estLandValue: '$425,000',
          estConstructionCost: '$462,500',
          totalProjectCost: '$887,500',
          estMarketValue: '$975,000',
          potentialEquity: '$87,500',
        },
        recommendations: [
          'Proceed with geotechnical soil survey',
          'Verify utility capacity with Austin Energy',
          'Schedule pre-application meeting with Planning',
          'Engage architect for schematic design',
          'Obtain 3 contractor bids before proceeding',
        ],
        riskFactors: [
          { level: 'low', description: 'Zoning change unlikely in this district' },
          { level: 'medium', description: 'Construction costs may increase 5-8%' },
          { level: 'low', description: 'Market demand remains strong' },
          { level: 'medium', description: 'Permit timeline subject to city backlog' },
        ],
      });
      setLoading(false);
      toast.success('Report generated');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="h-14 border-b border-gray-800 bg-[#111111] flex items-center px-4 lg:px-6">
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-400 hover:text-white mr-3">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <FileCheck className="w-5 h-5 text-[#6D28D9] mr-2" />
        <h1 className="font-semibold">Feasibility Report</h1>
      </header>

      <main className="p-4 lg:p-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Full Feasibility Report</h2>
          <p className="text-gray-500 text-sm">Comprehensive feasibility analysis for planning purposes.</p>
        </motion.div>

        {!report && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-surface p-6 text-center">
            <FileCheck className="w-12 h-12 text-[#6D28D9] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Generate Feasibility Report</h3>
            <p className="text-gray-500 text-sm mb-2">Comprehensive analysis covering zoning, site, market, and financial factors.</p>
            <p className="text-xs text-gray-600 mb-6"><AlertTriangle className="w-3 h-3 inline mr-1" />For planning only. Verify all data with authorities.</p>
            <Button onClick={handleGenerate} disabled={loading} className="bg-[#6D28D9] hover:bg-[#5b21b6] text-white px-8">
              {loading ? 'Generating...' : 'Generate Report'}
            </Button>
          </motion.div>
        )}

        {report && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="card-surface p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Feasibility Report</h3>
                <p className="text-sm text-gray-500">{report.address}</p>
                <p className="text-xs text-gray-600">Generated: {report.generatedAt}</p>
              </div>
              <Button onClick={() => toast.success('Report downloaded')} variant="outline" className="border-gray-700 text-gray-400 hover:text-white">
                <Download className="w-4 h-4 mr-2" /> Download
              </Button>
            </div>

            <div className="card-surface p-4 border-l-2 border-[#6D28D9]">
              <h4 className="font-medium mb-2">Executive Summary</h4>
              <p className="text-sm text-gray-400">{report.executiveSummary}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="card-surface p-4">
                <h4 className="font-medium mb-3 flex items-center gap-2"><Building2 className="w-4 h-4 text-[#6D28D9]" /> Zoning</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Classification</span><span>{report.zoning.classification}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Status</span><span className="text-[#10B981]">{report.zoning.status}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Lot Size</span><span>{report.zoning.lotSize}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Buildable Area</span><span>{report.zoning.buildableArea}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Height Limit</span><span>{report.zoning.heightLimit}</span></div>
                </div>
              </div>
              <div className="card-surface p-4">
                <h4 className="font-medium mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-[#6D28D9]" /> Market</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Median Price</span><span>{report.marketAnalysis.medianPrice}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Price/Sq Ft</span><span>{report.marketAnalysis.pricePerSqft}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Days on Market</span><span>{report.marketAnalysis.daysOnMarket}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Appreciation</span><span className="text-[#10B981]">{report.marketAnalysis.appreciation}</span></div>
                </div>
              </div>
            </div>

            <div className="card-surface p-4">
              <h4 className="font-medium mb-3 flex items-center gap-2"><DollarSign className="w-4 h-4 text-[#6D28D9]" /> Financial Summary</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(report.financialSummary).map(([key, val]: [string, any]) => (
                  <div key={key} className="bg-[#1F2937] p-3 rounded">
                    <div className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                    <div className={`font-bold ${key.includes('Equity') ? 'text-[#10B981]' : ''}`}>{val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-surface p-4">
              <h4 className="font-medium mb-3">Recommendations</h4>
              <ol className="space-y-2">
                {report.recommendations.map((rec: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-[#6D28D9] font-bold shrink-0">{i + 1}.</span>
                    <span className="text-gray-400">{rec}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="card-surface p-4">
              <h4 className="font-medium mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500" /> Risk Factors</h4>
              <div className="space-y-2">
                {report.riskFactors.map((risk: any, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className={`w-2 h-2 rounded-full ${risk.level === 'low' ? 'bg-[#10B981]' : risk.level === 'medium' ? 'bg-amber-500' : 'bg-[#EF4444]'}`} />
                    <span className="text-gray-400">{risk.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-surface p-4 border-l-2 border-[#10B981]">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500">For planning only. Verify all data with relevant authorities before making decisions.</p>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
