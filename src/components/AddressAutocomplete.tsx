import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X } from 'lucide-react';
import { geocodeAddress, type AddressSuggestion } from '@/services/geocoding';

interface AddressAutocompleteProps {
  value: string;
  onChange: (address: string) => void;
  onSelect?: (suggestion: AddressSuggestion) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function AddressAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder = 'Enter a property address...',
  autoFocus = false,
  className = '',
  showIcon = true,
  size = 'md',
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }
    setIsLoading(true);
    const results = await geocodeAddress(query);
    setSuggestions(results);
    setIsOpen(results.length > 0);
    setHighlightedIndex(-1);
    setIsLoading(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(val);
    }, 150);
  };

  const handleSelect = (suggestion: AddressSuggestion) => {
    onChange(suggestion.formattedAddress);
    onSelect?.(suggestion);
    setIsOpen(false);
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(i => Math.min(i + 1, suggestions.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(i => Math.max(i - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          handleSelect(suggestions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const sizeClasses = {
    sm: 'py-2 text-sm pl-9 pr-8',
    md: 'py-3 text-sm pl-10 pr-10',
    lg: 'py-4 text-base pl-12 pr-32',
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        {showIcon && (
          <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 ${size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />
        )}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => value.length >= 2 && suggestions.length > 0 && setIsOpen(true)}
          autoFocus={autoFocus}
          placeholder={placeholder}
          className={`w-full bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#6D28D9] focus:outline-none transition-colors ${sizeClasses[size]}`}
        />
        {isLoading ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-gray-600 border-t-[#6D28D9] rounded-full animate-spin" />
          </div>
        ) : value ? (
          <button
            onClick={() => { onChange(''); setSuggestions([]); setIsOpen(false); inputRef.current?.focus(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        ) : null}
      </div>

      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-1.5 bg-[#1F2937] border border-gray-700 rounded-lg overflow-hidden z-50 shadow-xl"
          >
            {suggestions.map((suggestion, i) => (
              <button
                key={suggestion.id}
                onClick={() => handleSelect(suggestion)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-start gap-3 ${
                  highlightedIndex === i
                    ? 'bg-purple-900/30 text-white'
                    : 'text-gray-300 hover:bg-purple-900/20 hover:text-white'
                }`}
              >
                <MapPin className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="truncate">{suggestion.formattedAddress}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {suggestion.city}, {suggestion.state} {suggestion.zip}
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
