import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/dialog.jsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/tabs.jsx";
import { useLeaderboardStore } from "./store/leaderboardStore.js";

export function CheckLeaderboard({ children }) {
  const levels = ["Easy", "Medium", "Hard", "Impossible"];
  const leaderboard = useLeaderboardStore((state) => state.leaderboard);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Leaderboard</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="Easy" className="w-full">
          <TabsList className="w-full flex">
            {levels.map((level) => {
              return (
                <TabsTrigger key={level} className="flex-1" value={level}>
                  {level}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {leaderboard.map((level) => {
            return (
              <TabsContent key={level.difficulty} value={level.difficulty}>
                <div className="flex justify-between items-center font-light text-darkGray mb-3">
                  <span>Name</span>
                  <span>Score</span>
                </div>
                <div className="flex flex-col gap-2 text-darkGray">
                  {level.leaderboard.map((player) => {
                    return (
                      <div
                        key={player.name}
                        className="flex justify-between items-center"
                      >
                        <span>{player.name}</span>
                        <span>{player.score}</span>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
