import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { ChevronLeft, Users, TrendingUp, TrendingDown, Minus, Shield } from 'lucide-react';
import { communityStats } from '@/data/features';

export function CommunityDashboard() {
  const { setCurrentView } = useStore();

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="h-14 border-b border-gray-800 bg-[#111111] flex items-center px-4 lg:px-6">
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-400 hover:text-white mr-3"><ChevronLeft className="w-5 h-5" /></button>
        <Users className="w-5 h-5 text-[#6D28D9] mr-2" />
        <h1 className="font-semibold">Community Context</h1>
      </header>

      <main className="p-4 lg:p-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Community Context Dashboard</h2>
          <p className="text-gray-500 text-sm">Market trends and community data based on public records.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {communityStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="card-surface p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-400">{stat.label}</span>
                {stat.trend === 'up' && <TrendingUp className="w-4 h-4 text-[#10B981]" />}
                {stat.trend === 'down' && <TrendingDown className="w-4 h-4 text-[#10B981]" />}
                {stat.trend === 'neutral' && <Minus className="w-4 h-4 text-gray-600" />}
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`text-sm mt-1 ${stat.trend === 'up' ? 'text-[#10B981]' : stat.trend === 'down' ? 'text-[#EF4444]' : 'text-gray-500'}`}>
                {stat.change}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card-surface p-4 mt-6">
          <h3 className="font-medium mb-4">Price Trends (12 Months)</h3>
          <svg viewBox="0 0 600 200" className="w-full h-48">
            <rect width="600" height="200" fill="#0a0a0a" rx="4" />
            {/* Grid */}
            {[0, 1, 2, 3, 4].map(i => (
              <line key={i} x1="40" y1={40 + i * 35} x2="580" y2={40 + i * 35} stroke="#1a1a1a" strokeWidth="0.5" />
            ))}
            {/* Y-axis labels */}
            <text x="35" y="45" fill="#6b7280" fontSize="10" textAnchor="end">$750K</text>
            <text x="35" y="80" fill="#6b7280" fontSize="10" textAnchor="end">$700K</text>
            <text x="35" y="115" fill="#6b7280" fontSize="10" textAnchor="end">$650K</text>
            <text x="35" y="150" fill="#6b7280" fontSize="10" textAnchor="end">$600K</text>
            <text x="35" y="185" fill="#6b7280" fontSize="10" textAnchor="end">$550K</text>

            {/* Line chart */}
            <polyline
              points="60,170 110,155 160,145 210,130 260,120 310,105 360,95 410,80 460,65 510,55 560,45"
              fill="none"
              stroke="#6D28D9"
              strokeWidth="2"
            />
            {/* Area under line */}
            <polygon
              points="60,170 110,155 160,145 210,130 260,120 310,105 360,95 410,80 460,65 510,55 560,45 560,190 60,190"
              fill="rgba(109, 40, 217, 0.1)"
            />
            {/* Data points */}
            {[60, 110, 160, 210, 260, 310, 360, 410, 460, 510, 560].map((x, i) => {
              const y = [170, 155, 145, 130, 120, 105, 95, 80, 65, 55, 45][i];
              return <circle key={i} cx={x} cy={y} r="4" fill="#6D28D9" />;
            })}
            {/* X-axis labels */}
            {['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'].map((m, i) => (
              <text key={i} x={60 + i * 50} y="198" fill="#6b7280" fontSize="9" textAnchor="middle">{m}</text>
            ))}
          </svg>
        </motion.div>

        <div className="card-surface p-4 mt-4 border-l-2 border-[#10B981]">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500">Based on public records from TCAD, Austin Board of Realtors, and City of Austin permit data. No individual data included.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
