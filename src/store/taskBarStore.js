import { create } from "zustand";
import {
  // persist,
  devtools,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
// import { produce } from "immer";

export const useTaskBarStore = create(
  devtools(
    // persist(
    immer((set) => ({
      gameNumber: 0,
      refreshBoard: () =>
        set((state) => {
          state.gameNumber++;
        }),
      undoStateFunction: null,
      setUndoStateFunction: (undoStateFunction) =>
        set((state) => {
          state.undoStateFunction = undoStateFunction;
        }),
      showHint: null,
      setShowHint: (showHint) =>
        set((state) => {
          state.showHint = showHint;
        }),
    })),
    //   { name: "taskBar" }
    // ),
    { name: "taskBarStore" }
  )
);
