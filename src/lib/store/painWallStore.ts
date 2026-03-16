import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ========================
// TYPES
// ========================

export type PainWallStep = 1 | 2 | 3 | 4 | 5 | 6;

export interface PainConfig {
  frequency: number; // times per day
  duration: number;  // minutes each
}

export interface PainWallResults {
  hoursPerWeek: number;
  hoursPerYear: number;
  daysOfLife: number;
  breakdown: Record<string, number>; // painId -> hours per week
}

interface PainWallState {
  // Current step in the flow
  step: PainWallStep;

  // Selected pain point IDs
  selectedPains: string[];

  // Configuration for each selected pain
  painConfigs: Record<string, PainConfig>;

  // Calculated results
  results: PainWallResults | null;

  // Actions
  selectPain: (painId: string) => void;
  deselectPain: (painId: string) => void;
  togglePain: (painId: string) => void;
  updatePainConfig: (painId: string, config: PainConfig) => void;
  calculateResults: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: PainWallStep) => void;
  reset: () => void;
}

// ========================
// INITIAL STATE
// ========================

const initialState = {
  step: 1 as PainWallStep,
  selectedPains: [],
  painConfigs: {},
  results: null,
};

// ========================
// STORE
// ========================

export const usePainWallStore = create<PainWallState>()(
  persist(
    (set, get) => ({
      ...initialState,

      selectPain: (painId: string) => {
        set((state) => {
          if (state.selectedPains.includes(painId)) {
            return state;
          }
          return {
            selectedPains: [...state.selectedPains, painId],
          };
        });
      },

      deselectPain: (painId: string) => {
        set((state) => {
          const newPainConfigs = { ...state.painConfigs };
          delete newPainConfigs[painId];

          return {
            selectedPains: state.selectedPains.filter((id) => id !== painId),
            painConfigs: newPainConfigs,
          };
        });
      },

      togglePain: (painId: string) => {
        const { selectedPains } = get();
        if (selectedPains.includes(painId)) {
          get().deselectPain(painId);
        } else {
          get().selectPain(painId);
        }
      },

      updatePainConfig: (painId: string, config: PainConfig) => {
        set((state) => ({
          painConfigs: {
            ...state.painConfigs,
            [painId]: config,
          },
        }));
      },

      calculateResults: () => {
        const { selectedPains, painConfigs } = get();

        if (selectedPains.length === 0) {
          set({ results: null });
          return;
        }

        const breakdown: Record<string, number> = {};
        let totalMinutesPerDay = 0;

        selectedPains.forEach((painId) => {
          const config = painConfigs[painId];
          if (config) {
            const minutesPerDay = config.frequency * config.duration;
            const hoursPerWeek = (minutesPerDay / 60) * 5; // Assuming 5-day work week
            breakdown[painId] = hoursPerWeek;
            totalMinutesPerDay += minutesPerDay;
          }
        });

        // Calculate totals
        const hoursPerWeek = (totalMinutesPerDay / 60) * 5; // 5-day work week
        const hoursPerYear = hoursPerWeek * 52; // 52 weeks per year
        const daysOfLife = hoursPerYear / 24; // Convert to days

        set({
          results: {
            hoursPerWeek: Math.round(hoursPerWeek * 10) / 10,
            hoursPerYear: Math.round(hoursPerYear),
            daysOfLife: Math.round(daysOfLife * 10) / 10,
            breakdown,
          },
        });
      },

      nextStep: () => {
        set((state) => {
          const nextStep = Math.min(6, state.step + 1) as PainWallStep;
          return { step: nextStep };
        });
      },

      prevStep: () => {
        set((state) => {
          const prevStep = Math.max(1, state.step - 1) as PainWallStep;
          return { step: prevStep };
        });
      },

      goToStep: (step: PainWallStep) => {
        set({ step });
      },

      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'pain-wall-storage',
      partialize: (state) => ({
        selectedPains: state.selectedPains,
        painConfigs: state.painConfigs,
        results: state.results,
      }),
    }
  )
);
