import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useThemeStore = create(
  devtools(
    persist(
      immer((set) => ({
        isLightTheme: true,
        setTheme: () => {
          set((state) => {
            document.body.classList.toggle("dark");
            state.isLightTheme = !state.isLightTheme;
          });
        },
      })),
      { name: "theme" }
    ),
    { name: "themeStore" }
  )
);
