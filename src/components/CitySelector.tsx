import { useState, useRef, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { SUPPORTED_CITIES } from '@contracts/cities';
import { MapPin, ChevronDown } from 'lucide-react';

export function CitySelector({ compact = false }: { compact?: boolean }) {
  const { selectedCity, setSelectedCity } = useStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = SUPPORTED_CITIES.find(c => c.code === selectedCity) || SUPPORTED_CITIES[0];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (compact) {
    return (
      <div ref={ref} className="relative">
        <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
          <MapPin className="w-3 h-3" />
          <span>{selected.name}, {selected.state}</span>
          <ChevronDown className="w-3 h-3" />
        </button>
        {open && (
          <div className="absolute top-full left-0 mt-1 w-56 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
            {SUPPORTED_CITIES.map(city => (
              <button
                key={city.code}
                onClick={() => { setSelectedCity(city.code); setOpen(false); }}
                className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-800 transition-colors flex items-center justify-between ${selectedCity === city.code ? 'text-[#6D28D9] bg-[#6D28D9]/10' : 'text-gray-300'}`}
              >
                <span>{city.name}, {city.state}</span>
                {selectedCity === city.code && <span className="text-[10px]">Active</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative w-full">
      <label className="text-xs text-gray-500 mb-1.5 block">City / Metro Area</label>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2.5 bg-[#111111] border border-gray-700 rounded-lg text-sm text-white hover:border-gray-600 transition-colors"
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#6D28D9]" />
          <span>{selected.name}, {selected.state}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-xl z-50 max-h-72 overflow-y-auto">
          <div className="p-2 text-[10px] text-gray-500 uppercase tracking-wider">Select your metro area</div>
          {SUPPORTED_CITIES.map(city => (
            <button
              key={city.code}
              onClick={() => { setSelectedCity(city.code); setOpen(false); }}
              className={`w-full text-left px-3 py-2.5 text-sm hover:bg-gray-800 transition-colors flex items-center justify-between ${selectedCity === city.code ? 'text-[#6D28D9] bg-[#6D28D9]/10' : 'text-gray-300'}`}
            >
              <div>
                <div className="font-medium">{city.name}</div>
                <div className="text-xs text-gray-500">{city.stateName} · {city.permitAuthority}</div>
              </div>
              {selectedCity === city.code && (
                <span className="text-[10px] bg-[#6D28D9]/20 text-[#6D28D9] px-2 py-0.5 rounded-full">Active</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
