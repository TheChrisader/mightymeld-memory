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
import { Label } from "./components/label";
import { RadioGroup, RadioGroupItem } from "./components/radio";
import { useSettingsStore } from "./store/settingsStore.js";

export function PickDifficulty({ children }) {
  const [difficultyTarget, setDifficultyTarget] = useState(undefined);
  const [open, setOpen] = useState(false);
  const difficulty = useSettingsStore((state) => state.DIFFICULTY);
  const toggleDifficulty = useSettingsStore((state) => state.toggleDifficulty);
  const difficulties = Object.keys(difficulty);

  const currentDifficulty = useSettingsStore(
    (state) => state.currentDifficulty
  );

  const current = getKeyByValue(difficulty, currentDifficulty);

  const updateDifficulty = () => {
    // if (!difficultyTarget) return;
    toggleDifficulty(difficultyTarget || current);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Difficulty</DialogTitle>
          <DialogDescription>
            Choose the number of tiles to appear on your game board.
          </DialogDescription>
        </DialogHeader>
        <RadioGroup defaultValue={current}>
          {difficulties.map((difficulty) => (
            <div key={difficulty} className="flex items-center space-x-2">
              <RadioGroupItem
                onClick={() => {
                  setDifficultyTarget(difficulty);
                }}
                value={difficulty}
                id={difficulty}
              />

              <Label htmlFor={difficulty}>{difficulty}</Label>
            </div>
          ))}
        </RadioGroup>
        <DialogFooter>
          <Button type="submit" onClick={updateDifficulty}>
            Update Difficulty
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}
