import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const difficultyMap = {
  4: "Easy",
  16: "Medium",
  36: "Hard",
  64: "Impossible",
};

const leaderboard = [
  {
    difficulty: "Easy",
    leaderboard: [
      {
        name: "John",
        score: 100,
      },
      {
        name: "Mary",
        score: 85,
      },
      {
        name: "Sylvester",
        score: 80,
      },
      {
        name: "Gordon",
        score: 76,
      },
      {
        name: "David",
        score: 52,
      },
    ],
  },
  {
    difficulty: "Medium",
    leaderboard: [
      {
        name: "Taylor",
        score: 100,
      },
      {
        name: "Lisa",
        score: 96.25,
      },
      {
        name: "Edo's Strongest Farmer",
        score: 90,
      },
      {
        name: "Nah, I'd Win",
        score: 90,
      },
      {
        name: "Nameless Fish",
        score: 86,
      },
    ],
  },
  {
    difficulty: "Hard",
    leaderboard: [
      {
        name: "Sleepykuna",
        score: 98,
      },
      {
        name: "The Waffled One",
        score: 90,
      },
      {
        name: "The Fraud",
        score: 88,
      },
      {
        name: "The Bush Camper",
        score: 70,
      },
      {
        name: "A Cog",
        score: 65,
      },
    ],
  },
  {
    difficulty: "Impossible",
    leaderboard: [
      {
        name: "Codemaxxing Webcel",
        score: 1000000,
      },
      {
        name: "Okkotsu",
        score: 98,
      },
      {
        name: "Kenjaku",
        score: 97,
      },
      {
        name: "Satoru",
        score: 96,
      },
      {
        name: "The Fallen",
        score: 96,
      },
    ],
  },
];

export const useLeaderboardStore = create(
  devtools(
    persist(
      immer((set) => ({
        leaderboard,
        setLeaderboard: (player) => {
          set((state) => {
            const difficultyIndex = state.leaderboard.findIndex(
              (d) => d.difficulty === difficultyMap[player.difficulty]
            );

            const youIndex = state.leaderboard[
              difficultyIndex
            ].leaderboard.findIndex((player) => player.name === "YOU");

            if (
              youIndex &&
              state?.leaderboard?.[difficultyIndex]?.leaderboard?.[youIndex]
                ?.score >= player.score
            ) {
              return;
            }

            if (youIndex) {
              state.leaderboard[difficultyIndex].leaderboard.splice(
                youIndex,
                1
              );
            }
            state.leaderboard[difficultyIndex].leaderboard.push({
              name: "YOU",
              score: Math.floor(player.score),
            });
            state.leaderboard[difficultyIndex].leaderboard.sort(
              (a, b) => b.score - a.score
            );
            if (!youIndex) state.leaderboard[difficultyIndex].leaderboard.pop();
          });
        },
      })),
      { name: "leaderboard" }
    ),
    { name: "leaderboardStore" }
  )
);
