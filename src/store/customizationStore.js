import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const backgroundPatterns = [
  { name: "None", class: "", img: "/assets/no-pattern.jpg" },
  { name: "Rhombus", class: "rhombusPattern", img: "/assets/rhombus.jpg" },
  { name: "Lines", class: "linesPattern", img: "/assets/lines.jpg" },
  {
    name: "Checkered",
    class: "checkeredPattern",
    img: "/assets/checkered.jpg",
  },
];

export const useCustomizationStore = create(
  devtools(
    persist(
      immer((set) => ({
        background: backgroundPatterns[0].class,
        backgroundPatterns,
        setBackgroundState: null,
        defineSetBackgroundState: (payload) => {
          set((state) => {
            state.setBackgroundState = payload;
          });
        },
        setBackground: (index) => {
          set((state) => {
            state.background = state.backgroundPatterns[index].class;
          });
        },
      })),
      { name: "customization" }
    ),
    { name: "customizationStore" }
  )
);
