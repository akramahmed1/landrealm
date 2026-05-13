import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WizardState, Tier } from '@/types';

interface AppState {
  currentView: string;
  setCurrentView: (view: string) => void;

  tier: Tier;
  setTier: (tier: Tier) => void;

  wizard: WizardState;
  updateWizard: (updates: Partial<WizardState>) => void;
  resetWizard: () => void;

  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;

  selectedAddress: string;
  setSelectedAddress: (addr: string) => void;

  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

const initialWizard: WizardState = {
  step: 1,
  propertyPoints: [],
  propertyWidth: 0,
  propertyDepth: 0,
  totalArea: 0,
  frontSetback: 25,
  rearSetback: 20,
  side1Setback: 10,
  side2Setback: 10,
  hasHeightRestriction: false,
  heightLimit: 35,
  hasSlope: false,
  slopeGrade: 5,
  zoningType: 'Single Family',
  lotCoverage: 40,
  parkingSpaces: 2,
  maxBuildableArea: 0,
  stories: 1,
  architecturalStyle: 'Modern',
  estCostPerSqFt: 185,
  feasibilityScore: 0,
  verdict: '',
  verdictColor: '',
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      currentView: 'landing',
      setCurrentView: (view) => set({ currentView: view }),

      tier: 'free',
      setTier: (tier) => set({ tier }),

      wizard: { ...initialWizard },
      updateWizard: (updates) =>
        set((state) => ({ wizard: { ...state.wizard, ...updates } })),
      resetWizard: () => set({ wizard: { ...initialWizard } }),

      isLoggedIn: false,
      setIsLoggedIn: (val) => set({ isLoggedIn: val }),

      selectedAddress: '',
      setSelectedAddress: (addr) => set({ selectedAddress: addr }),

      selectedCity: 'AUS-TX',
      setSelectedCity: (city) => set({ selectedCity: city }),
    }),
    {
      name: 'landrealm-store',
      partialize: (state) => ({
        currentView: state.currentView,
        tier: state.tier,
        isLoggedIn: state.isLoggedIn,
        selectedAddress: state.selectedAddress,
        selectedCity: state.selectedCity,
      }),
    }
  )
);
