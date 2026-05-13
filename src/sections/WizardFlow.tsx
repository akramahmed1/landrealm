import { useState, useRef, useCallback, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, RotateCcw, Undo, Home, Ruler,
  Layers, Palette, Award, CheckCircle, AlertTriangle, Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { PropertyPoint, ZoningType, ArchitecturalStyle } from '@/types';
import { actionItems } from '@/data/features';

/* ───── Step 1: Property Canvas ───── */
function Step1Canvas({ onNext, width, depth, setWidth, setDepth, points, setPoints }: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#374151';
    for (let x = 0; x < w; x += 20) {
      for (let y = 0; y < h; y += 20) {
        ctx.fillRect(x, y, 1, 1);
      }
    }
    if (points.length > 1) {
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      if (points.length > 2) {
        ctx.lineTo(points[0].x, points[0].y);
      }
      ctx.stroke();
      ctx.fillStyle = 'rgba(109, 40, 217, 0.2)';
      ctx.fill();
    }
    points.forEach((p: PropertyPoint) => {
      ctx.fillStyle = '#6D28D9';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [points]);

  useEffect(() => {
    drawGrid();
  }, [drawGrid]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    setPoints([...points, { x, y }]);
  };

  const handleUndo = () => setPoints(points.slice(0, -1));
  const handleClear = () => setPoints([]);

  const totalArea = width && depth ? width * depth : 0;

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      <div className="lg:w-80 space-y-4 shrink-0">
        <div>
          <h3 className="text-lg font-semibold mb-1">Property Information</h3>
          <p className="text-sm text-gray-500">Draw your boundary on the grid or enter dimensions.</p>
        </div>
        {points.length > 0 && (
          <div className="card-surface p-3">
            <div className="text-xs text-gray-500 mb-2">Coordinates ({points.length} points)</div>
            <div className="max-h-32 overflow-y-auto scrollbar-thin space-y-1">
              {points.map((p: PropertyPoint, i: number) => (
                <div key={i} className="text-xs text-gray-400 font-mono">Point {i + 1}: ({Math.round(p.x)}, {Math.round(p.y)})</div>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Width (ft)</label>
            <input type="number" value={width || ''} onChange={(e) => setWidth(Number(e.target.value))} placeholder="0" className="input-dark text-sm py-2" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Depth (ft)</label>
            <input type="number" value={depth || ''} onChange={(e) => setDepth(Number(e.target.value))} placeholder="0" className="input-dark text-sm py-2" />
          </div>
        </div>
        {totalArea > 0 && (
          <div className="card-surface p-3 text-center">
            <div className="text-xs text-gray-500">Total Area</div>
            <div className="text-lg font-bold text-[#6D28D9]">{totalArea.toLocaleString()} sq ft</div>
          </div>
        )}
        <div className="flex gap-2">
          <button onClick={handleUndo} disabled={points.length === 0} className="btn-secondary flex-1 text-sm py-2 flex items-center justify-center gap-1 disabled:opacity-30">
            <Undo className="w-3 h-3" /> Undo
          </button>
          <button onClick={handleClear} disabled={points.length === 0} className="btn-secondary flex-1 text-sm py-2 flex items-center justify-center gap-1 disabled:opacity-30">
            <RotateCcw className="w-3 h-3" /> Clear
          </button>
        </div>
        <Button onClick={onNext} className="w-full bg-[#6D28D9] hover:bg-[#5b21b6] text-white py-3">
          Next Step <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      <div className="flex-1 card-surface overflow-hidden relative min-h-[400px]">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          onClick={handleCanvasClick}
          className="w-full h-full cursor-crosshair"
        />
        {points.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-gray-600 text-sm">Click to start drawing your property boundary</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ───── Step 2: Setbacks ───── */
function Step2Setbacks({ onNext, onBack, state, updateState }: any) {
  const buildableW = Math.max(0, (state.propertyWidth || 100) - state.side1Setback - state.side2Setback);
  const buildableD = Math.max(0, (state.propertyDepth || 100) - state.frontSetback - state.rearSetback);
  const buildableArea = buildableW * buildableD;

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      <div className="lg:w-80 space-y-4 shrink-0">
        <div>
          <h3 className="text-lg font-semibold mb-1">Setbacks & Constraints</h3>
          <p className="text-sm text-gray-500">Enter local setback requirements.</p>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Front Setback (ft)', key: 'frontSetback', val: state.frontSetback },
            { label: 'Rear Setback (ft)', key: 'rearSetback', val: state.rearSetback },
            { label: 'Side 1 Setback (ft)', key: 'side1Setback', val: state.side1Setback },
            { label: 'Side 2 Setback (ft)', key: 'side2Setback', val: state.side2Setback },
          ].map((field) => (
            <div key={field.key}>
              <label className="text-xs text-gray-500 mb-1 block">{field.label}</label>
              <input type="number" value={field.val} onChange={(e) => updateState({ [field.key]: Number(e.target.value) })} className="input-dark text-sm py-2" />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between card-surface p-3">
          <span className="text-sm">Height Restriction?</span>
          <button onClick={() => updateState({ hasHeightRestriction: !state.hasHeightRestriction })} className={`w-11 h-6 rounded-full transition-colors ${state.hasHeightRestriction ? 'bg-[#6D28D9]' : 'bg-gray-700'}`}>
            <div className={`w-4 h-4 bg-white rounded-full transition-transform mx-1 ${state.hasHeightRestriction ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>
        {state.hasHeightRestriction && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
            <label className="text-xs text-gray-500 mb-1 block">Height Limit (ft)</label>
            <input type="number" value={state.heightLimit} onChange={(e) => updateState({ heightLimit: Number(e.target.value) })} className="input-dark text-sm py-2" />
          </motion.div>
        )}
        <div className="flex gap-2">
          <button onClick={onBack} className="btn-secondary flex-1 text-sm py-2 flex items-center justify-center gap-1">
            <ChevronLeft className="w-3 h-3" /> Back
          </button>
          <Button onClick={onNext} className="flex-1 bg-[#6D28D9] hover:bg-[#5b21b6] text-white py-2 text-sm">
            Next <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>
      <div className="flex-1 card-surface p-6 flex items-center justify-center min-h-[400px]">
        <div className="relative">
          <svg viewBox="0 0 400 300" className="w-full max-w-md">
            <rect x="0" y="0" width="400" height="300" fill="none" stroke="white" strokeWidth="2" />
            <rect x={state.side1Setback * 2} y={state.frontSetback * 2} width={Math.max(0, 400 - (state.side1Setback + state.side2Setback) * 2)} height={Math.max(0, 300 - (state.frontSetback + state.rearSetback) * 2)} fill="rgba(16, 185, 129, 0.2)" stroke="#10B981" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="0" y1={state.frontSetback * 2} x2="400" y2={state.frontSetback * 2} stroke="#EF4444" strokeWidth="1" strokeDasharray="5,5" />
            <line x1="0" y1={300 - state.rearSetback * 2} x2="400" y2={300 - state.rearSetback * 2} stroke="#EF4444" strokeWidth="1" strokeDasharray="5,5" />
            <line x1={state.side1Setback * 2} y1="0" x2={state.side1Setback * 2} y2="300" stroke="#EF4444" strokeWidth="1" strokeDasharray="5,5" />
            <line x1={400 - state.side2Setback * 2} y1="0" x2={400 - state.side2Setback * 2} y2="300" stroke="#EF4444" strokeWidth="1" strokeDasharray="5,5" />
          </svg>
          <div className="mt-4 text-center">
            <div className="text-sm text-gray-400">Buildable Envelope</div>
            <div className="text-2xl font-bold text-[#10B981]">{buildableArea.toLocaleString()} sq ft</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── Step 3: Zoning ───── */
function Step3Zoning({ onNext, onBack, state, updateState }: any) {
  const maxCoverage = state.lotCoverage / 100;
  const maxBuildable = Math.round((state.propertyWidth * state.propertyDepth) * maxCoverage);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      <div className="lg:w-80 space-y-4 shrink-0">
        <div>
          <h3 className="text-lg font-semibold mb-1">Zoning & Use</h3>
          <p className="text-sm text-gray-500">Define your zoning classification.</p>
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Zoning Type</label>
          <select value={state.zoningType} onChange={(e) => updateState({ zoningType: e.target.value as ZoningType })} className="input-dark text-sm py-2">
            {['Single Family', 'Multi Family', 'Commercial', 'Mixed Use'].map(z => <option key={z} value={z}>{z}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Lot Coverage: {state.lotCoverage}%</label>
          <input type="range" min="0" max="100" value={state.lotCoverage} onChange={(e) => updateState({ lotCoverage: Number(e.target.value) })} className="w-full accent-[#6D28D9]" />
          <div className="flex justify-between text-xs text-gray-600">
            <span>0%</span><span>50%</span><span>100%</span>
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Parking Spaces</label>
          <input type="number" value={state.parkingSpaces} onChange={(e) => updateState({ parkingSpaces: Number(e.target.value) })} className="input-dark text-sm py-2" />
        </div>
        <div className="card-surface p-4 text-center">
          <div className="text-xs text-gray-500">Max Buildable Area</div>
          <div className="text-2xl font-bold text-[#6D28D9]">{maxBuildable.toLocaleString()} sq ft</div>
        </div>
        <div className="flex gap-2">
          <button onClick={onBack} className="btn-secondary flex-1 text-sm py-2 flex items-center justify-center gap-1">
            <ChevronLeft className="w-3 h-3" /> Back
          </button>
          <Button onClick={onNext} className="flex-1 bg-[#6D28D9] hover:bg-[#5b21b6] text-white py-2 text-sm">
            Next <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>
      <div className="flex-1 card-surface p-6 flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-6xl mb-4">
          {state.zoningType === 'Single Family' && <Home className="w-24 h-24 text-[#6D28D9]" />}
          {state.zoningType === 'Multi Family' && <div className="flex gap-2"><Home className="w-16 h-16 text-[#6D28D9]" /><Home className="w-16 h-16 text-[#6D28D9]" /></div>}
          {state.zoningType === 'Commercial' && <div className="w-24 h-24 rounded bg-[#6D28D9]/20 flex items-center justify-center text-4xl font-bold text-[#6D28D9]">B</div>}
          {state.zoningType === 'Mixed Use' && <div className="flex gap-2"><Home className="w-16 h-16 text-[#6D28D9]" /><div className="w-16 h-16 rounded bg-[#6D28D9]/20 flex items-center justify-center text-2xl font-bold text-[#6D28D9]">B</div></div>}
        </div>
        <div className="text-lg font-medium">{state.zoningType}</div>
        <div className="mt-6 w-48">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Coverage</span><span>{state.lotCoverage}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#6D28D9] to-purple-400 transition-all" style={{ width: `${state.lotCoverage}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── Step 4: Design Preferences ───── */
function Step4Design({ onNext, onBack, state, updateState }: any) {
  const styles: { name: ArchitecturalStyle; img: string; cost: number }[] = [
    { name: 'Modern', img: '/style-modern.jpg', cost: 195 },
    { name: 'Traditional', img: '/style-traditional.jpg', cost: 175 },
    { name: 'Craftsman', img: '/style-craftsman.jpg', cost: 185 },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      <div className="lg:w-80 space-y-4 shrink-0">
        <div>
          <h3 className="text-lg font-semibold mb-1">Design Preferences</h3>
          <p className="text-sm text-gray-500">Choose your architectural style and stories.</p>
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-2 block">Stories</label>
          <div className="flex gap-2">
            {[1, 2, 3].map(s => (
              <button key={s} onClick={() => updateState({ stories: s })} className={`flex-1 py-2 rounded text-sm font-medium transition-colors ${state.stories === s ? 'bg-[#6D28D9] text-white' : 'bg-[#1F2937] text-gray-400 hover:text-white'}`}>
                {s} Story{s > 1 ? 's' : ''}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-2 block">Style</label>
          <div className="grid grid-cols-3 gap-2">
            {styles.map(s => (
              <button key={s.name} onClick={() => updateState({ architecturalStyle: s.name, estCostPerSqFt: s.cost })} className={`rounded-lg overflow-hidden border-2 transition-all ${state.architecturalStyle === s.name ? 'border-[#6D28D9] glow-purple' : 'border-transparent hover:border-gray-700'}`}>
                <img src={s.img} alt={s.name} className="w-full h-20 object-cover" />
                <div className="p-1.5 text-[10px] text-center font-medium">{s.name}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="card-surface p-4">
          <div className="text-xs text-gray-500">Est. Cost per Sq Ft</div>
          <div className="text-xl font-bold text-[#6D28D9]">${state.estCostPerSqFt}</div>
        </div>
        <div className="flex gap-2">
          <button onClick={onBack} className="btn-secondary flex-1 text-sm py-2 flex items-center justify-center gap-1">
            <ChevronLeft className="w-3 h-3" /> Back
          </button>
          <Button onClick={onNext} className="flex-1 bg-[#6D28D9] hover:bg-[#5b21b6] text-white py-2 text-sm">
            Next <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>
      <div className="flex-1 card-surface p-6 flex items-center justify-center min-h-[400px]">
        <motion.img
          key={state.architecturalStyle + state.stories}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          src={styles.find(s => s.name === state.architecturalStyle)?.img}
          alt={state.architecturalStyle}
          className="max-w-full max-h-full object-contain rounded-lg"
        />
      </div>
    </div>
  );
}

/* ───── Step 5: Score ───── */
function Step5Score({ onNext, onBack, state }: any) {
  const score = Math.min(100, Math.round(
    (state.zoningType === 'Single Family' ? 92 : state.zoningType === 'Multi Family' ? 78 : 65) * 0.25 +
    (Math.min(100, (state.maxBuildableArea || 4200) / 50)) * 0.20 +
    (state.stories === 1 ? 85 : state.stories === 2 ? 90 : 82) * 0.15 +
    (100 - state.lotCoverage * 0.3) * 0.20 +
    (state.estCostPerSqFt < 180 ? 88 : 75) * 0.20
  ));

  const verdicts: Record<number, { text: string; color: string }> = {
    80: { text: 'Excellent', color: 'text-[#10B981]' },
    60: { text: 'Good', color: 'text-[#6D28D9]' },
    40: { text: 'Fair', color: 'text-amber-500' },
    0: { text: 'Poor', color: 'text-[#EF4444]' },
  };

  const verdict = Object.entries(verdicts).sort((a, b) => Number(b[0]) - Number(a[0])).find(([threshold]) => score >= Number(threshold))?.[1] || verdicts[0];

  const [displayScore, setDisplayScore] = useState(0);
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current >= score) { current = score; clearInterval(interval); }
      setDisplayScore(current);
    }, 30);
    return () => clearInterval(interval);
  }, [score]);

  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="min-h-full flex flex-col items-center justify-center py-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Feasibility Assessment</h2>
        <p className="text-gray-500">Based on your property inputs</p>
      </div>

      <div className="relative mb-8">
        <svg width="280" height="280" viewBox="0 0 280 280">
          <circle cx="140" cy="140" r="120" fill="none" stroke="#1F2937" strokeWidth="12" />
          <circle
            cx="140" cy="140" r="120" fill="none"
            stroke="#6D28D9" strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 140 140)"
            style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold">{displayScore}</span>
          <span className="text-gray-500 text-sm">/100</span>
        </div>
      </div>

      <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-gray-800 ${verdict.color} mb-4`}>
        {verdict.text}
      </motion.div>

      <p className="text-gray-400 text-sm max-w-md text-center mb-8">
        Your project shows {score >= 70 ? 'strong' : score >= 50 ? 'moderate' : 'weak'} potential.
        Review the detailed breakdown for next steps.
      </p>

      <div className="grid grid-cols-3 gap-4 max-w-lg w-full mb-8">
        <div className="card-surface p-3 text-center">
          <div className="text-xs text-gray-500">Lot Size</div>
          <div className="font-bold">{(state.propertyWidth * state.propertyDepth).toLocaleString()}</div>
          <div className="text-xs text-gray-600">sq ft</div>
        </div>
        <div className="card-surface p-3 text-center">
          <div className="text-xs text-gray-500">Buildable</div>
          <div className="font-bold text-[#10B981]">{Math.round((state.propertyWidth * state.propertyDepth) * (state.lotCoverage / 100)).toLocaleString()}</div>
          <div className="text-xs text-gray-600">sq ft max</div>
        </div>
        <div className="card-surface p-3 text-center">
          <div className="text-xs text-gray-500">Est. Cost</div>
          <div className="font-bold">${((state.propertyWidth * state.propertyDepth) * state.estCostPerSqFt / 1000).toFixed(0)}K</div>
          <div className="text-xs text-gray-600">total</div>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary text-sm py-2 px-6 flex items-center gap-1">
          <ChevronLeft className="w-3 h-3" /> Back
        </button>
        <Button onClick={onNext} className="bg-[#6D28D9] hover:bg-[#5b21b6] text-white text-sm py-2 px-6">
          View Action Plan <ChevronRight className="w-3 h-3 ml-1" />
        </Button>
      </div>
    </div>
  );
}

/* ───── Step 6: Action Plan ───── */
function Step6ActionPlan({ onReset }: any) {
  const [items] = useState(actionItems);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => setExpandedId(expandedId === id ? null : id);

  const categories = [
    { key: 'immediate', label: 'Immediate', icon: AlertTriangle, color: 'text-amber-500' },
    { key: 'pre-construction', label: 'Pre-Construction', icon: CheckCircle, color: 'text-[#10B981]' },
    { key: 'design', label: 'Design', icon: Info, color: 'text-[#6D28D9]' },
  ];

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Your Action Plan</h2>
        <p className="text-gray-500 text-sm">Based on your inputs, here are your next steps.</p>
      </div>

      <div className="space-y-6">
        {categories.map(cat => (
          <div key={cat.key}>
            <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <cat.icon className={`w-4 h-4 ${cat.color}`} />
              {cat.label}
            </h4>
            <div className="space-y-2">
              {items.filter(item => item.category === cat.key).map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="card-surface overflow-hidden"
                >
                  <button onClick={() => toggleExpand(item.id)} className="w-full flex items-center gap-3 p-4 text-left">
                    {item.status === 'check' && <CheckCircle className="w-5 h-5 text-[#10B981] shrink-0" />}
                    {item.status === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />}
                    {item.status === 'info' && <Info className="w-5 h-5 text-[#6D28D9] shrink-0" />}
                    <span className="flex-1 text-sm">{item.title}</span>
                    <ChevronRight className={`w-4 h-4 text-gray-600 transition-transform ${expandedId === item.id ? 'rotate-90' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {expandedId === item.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="px-4 pb-4 pl-12">
                          <p className="text-sm text-gray-400">{item.description}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button onClick={onReset} className="btn-secondary flex items-center justify-center gap-2 py-3">
          <RotateCcw className="w-4 h-4" /> Start Over
        </button>
        <Button onClick={() => toast.success('Full report generated!')} className="bg-[#6D28D9] hover:bg-[#5b21b6] text-white py-3 flex-1">
          Get Full Report
        </Button>
      </div>
    </div>
  );
}

/* ───── Main Wizard ───── */
export function WizardFlow() {
  const { setCurrentView, wizard, updateWizard, resetWizard } = useStore();
  const [step, setStep] = useState(1);
  const [points, setPoints] = useState<PropertyPoint[]>([]);

  const steps = [
    { num: 1, label: 'Property', icon: Ruler },
    { num: 2, label: 'Setbacks', icon: Layers },
    { num: 3, label: 'Zoning', icon: Home },
    { num: 4, label: 'Design', icon: Palette },
    { num: 5, label: 'Score', icon: Award },
    { num: 6, label: 'Plan', icon: CheckCircle },
  ];

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }),
  };

  const [direction, setDirection] = useState(1);

  const goNext = () => { setDirection(1); setStep(s => Math.min(6, s + 1)); };
  const goBack = () => { setDirection(-1); setStep(s => Math.max(1, s - 1)); };
  const goReset = () => { resetWizard(); setPoints([]); setStep(1); };

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="h-14 border-b border-gray-800 bg-[#111111] flex items-center px-4 lg:px-6 shrink-0">
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-400 hover:text-white mr-4">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <img src="/logo-icon.png" alt="" className="w-6 h-6 mr-2" />
        <span className="font-semibold text-sm mr-6">Feasibility Wizard</span>
        <div className="flex-1 flex items-center justify-center gap-1 max-w-lg">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                step === s.num ? 'bg-purple-900/30 text-[#6D28D9]' : step > s.num ? 'text-[#10B981]' : 'text-gray-600'
              }`}>
                <s.icon className="w-3 h-3" />
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-6 h-px mx-1 ${step > s.num ? 'bg-[#10B981]' : 'bg-gray-800'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="w-20" />
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto scrollbar-thin p-4 lg:p-8">
        <div className="max-w-5xl mx-auto h-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="h-full"
            >
              {step === 1 && (
                <Step1Canvas
                  onNext={goNext}
                  width={wizard.propertyWidth}
                  depth={wizard.propertyDepth}
                  setWidth={(w: number) => updateWizard({ propertyWidth: w })}
                  setDepth={(d: number) => updateWizard({ propertyDepth: d })}
                  points={points}
                  setPoints={setPoints}
                />
              )}
              {step === 2 && (
                <Step2Setbacks onNext={goNext} onBack={goBack} state={wizard} updateState={updateWizard} />
              )}
              {step === 3 && (
                <Step3Zoning onNext={goNext} onBack={goBack} state={wizard} updateState={updateWizard} />
              )}
              {step === 4 && (
                <Step4Design onNext={goNext} onBack={goBack} state={wizard} updateState={updateWizard} />
              )}
              {step === 5 && (
                <Step5Score onNext={goNext} onBack={goBack} state={wizard} />
              )}
              {step === 6 && (
                <Step6ActionPlan onReset={goReset} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
