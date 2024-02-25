import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const DIFFICULTY = {
  EASY: 4,
  MEDIUM: 16,
  HARD: 36,
  IMPOSSIBLE: 64,
};

export const useSettingsStore = create(
  devtools(
    persist(
      immer((set) => ({
        DIFFICULTY,
        currentDifficulty: DIFFICULTY.MEDIUM,
        toggleDifficulty: (payload) =>
          set((state) => {
            state.currentDifficulty = state.DIFFICULTY[payload];
          }),
      })),
      { name: "settings" }
    ),
    { name: "settingsStore" }
  )
);
