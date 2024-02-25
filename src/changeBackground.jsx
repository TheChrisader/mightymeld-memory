import { useState } from "react";
import { Button } from "./components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/dialog.jsx";
import { useCustomizationStore } from "./store/customizationStore.js";

export function ChangeBackground({ children }) {
  const background = useCustomizationStore((state) => state.background);
  const backgroundPatterns = useCustomizationStore(
    (state) => state.backgroundPatterns
  );
  let backgroundIndex = backgroundPatterns.findIndex(
    (pattern) => pattern.class === background
  );
  const setBackground = useCustomizationStore((state) => state.setBackground);

  const [open, setOpen] = useState(false);
  const [patternChoice, setPatternChoice] = useState(backgroundIndex);

  const closeDialog = () => {
    if (typeof patternChoice === backgroundIndex) {
      setOpen(false);
      return;
    }
    setBackground(patternChoice);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-[500px]:p-[18px] max-[400px]:p-2">
        <DialogHeader>
          <DialogTitle>Customize Application</DialogTitle>
          <DialogDescription>
            Make changes to your experience here. Click save when you`re done.
          </DialogDescription>
        </DialogHeader>
        <div className="text-darkGray">
          <span className="inline-block mb-1">Background Pattern:</span>
          <div className="flex flex-wrap justify-center gap-1 mb-3">
            {backgroundPatterns.map((pattern, i) => {
              return (
                <button
                  key={i}
                  onClick={() => setPatternChoice(i)}
                  className={`mb-5 [&_img]:hover:outline [&_img]:hover:outline-indigo-500 [&_img]:focus:outline [&_img]:focus:outline-indigo-500`}
                >
                  <div className="h-[85px] flex flex-col">
                    <span className="text-start font-light">
                      {pattern.name}:
                    </span>
                    <div
                      className={`relative h-full ${
                        i === patternChoice
                          ? "before:bg-blue-500 before:opacity-40 before:absolute before:top-0 before:left-0 before:size-full before:rounded-lg before:max-[400px]:size-[90%]"
                          : ""
                      }`}
                    >
                      <img
                        src={pattern.img}
                        alt={pattern.class}
                        className={`object-cover size-full rounded-lg max-[400px]:size-[90%]`}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={closeDialog}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
