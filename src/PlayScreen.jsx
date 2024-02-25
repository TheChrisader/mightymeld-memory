import { useState, useEffect, useRef } from "react";
import { produce } from "immer";
import confetti from "canvas-confetti";
import * as icons from "react-icons/gi";
import { Tile } from "./Tile";

import { useSettingsStore } from "./store/settingsStore";
import { useTaskBarStore } from "./store/taskBarStore";
import { useThemeStore } from "./store/themeStore";
import { motion } from "framer-motion";
import { useLeaderboardStore } from "./store/leaderboardStore";

let possibleTileContents = [
  icons.GiHearts,
  icons.GiWaterDrop,
  icons.GiDiceSixFacesFive,
  icons.GiUmbrella,
  icons.GiCube,
  icons.GiBeachBall,
  icons.GiDragonfly,
  icons.GiHummingbird,
  icons.GiFlowerEmblem,
  icons.GiOpenBook,
  icons.GiBalloons,
  icons.GiBilledCap,
  icons.GiBlender,
  icons.GiBoba,
  icons.GiMicrophone,
  icons.GiMightyHorn,
  icons.GiSunglasses,
];

const boardAnimation = {
  initial: {
    y: "300px",
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const topTabAnimation = {
  initial: {
    y: "-100px",
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const arrayTo2D = (array, n) => {
  return array.reduce((result, element, index) => {
    const chunkIndex = Math.floor(index / n);
    if (!result[chunkIndex]) {
      result[chunkIndex] = [];
    }
    result[chunkIndex].push(element);
    return result;
  }, []);
};

const Timer = ({ refresh, setTimeEnd }) => {
  const [count, setCount] = useState(0);
  const [gameNumber, difficulty] = refresh;
  let hasReachedHour = false;
  let mount = useRef(0);

  if (count >= 300) {
    hasReachedHour = true;
  }

  useEffect(() => {
    if (mount.current >= 1 && !hasReachedHour) {
      setCount(0);
    }

    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);

    if (hasReachedHour) {
      clearInterval(interval);
      setCount(0);
      setTimeEnd();
    }

    mount.current++;

    return () => clearInterval(interval);
  }, [hasReachedHour, difficulty, gameNumber]); // eslint-disable-line

  const minutes = Math.floor(count / 60);
  const seconds = count % 60;

  return (
    <>
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </>
  );
};

export function PlayScreen({ end }) {
  const [tiles, setTiles] = useState([]);
  const [tryCount, setTryCount] = useState(0);
  const [score, setScore] = useState(0);
  const [movesStack, setMovesStack] = useState([]);
  const [timeEnd, setTimeEnd] = useState(false);

  const [secondFlip, setSecondFlip] = useState(false);
  const [hint, setHint] = useState([]);
  const [trailingCoordinate, setTrailingCoordinate] = useState([]);

  const difficulty = useSettingsStore((state) => state.currentDifficulty);

  const isLightTheme = useThemeStore((state) => state.isLightTheme);

  const gameNumber = useTaskBarStore((state) => state.gameNumber);
  const setUndoStateFunction = useTaskBarStore(
    (state) => state.setUndoStateFunction
  );
  const setShowHint = useTaskBarStore((state) => state.setShowHint);

  const setLeaderboard = useLeaderboardStore((state) => state.setLeaderboard);

  const undoState = () => {
    if (movesStack.length === 0) return;
    let lastMoves = movesStack[movesStack.length - 1];
    let coordinates = [lastMoves[0].coordinate, lastMoves[1].coordinate];

    setTiles(
      produce((draft) => {
        coordinates.forEach((coordinate) => {
          draft[coordinate[0]][coordinate[1]].state = "start";
        });
      })
    );

    setTryCount((c) => c - 1);
    setScore((score) => score - 50);

    setMovesStack(
      produce((draft) => {
        draft.pop();
      })
    );
  };

  useEffect(() => {
    setUndoStateFunction(undoState);
  }, [undoState]); // eslint-disable-line

  useEffect(() => {
    setShowHint(findHintTilePair);
  }, [findHintTilePair]); // eslint-disable-line

  useEffect(() => {
    const getTiles = (tileCount) => {
      if (tileCount % 2 !== 0) {
        throw new Error("The number of tiles must be even.");
      }

      while (tileCount > possibleTileContents.length) {
        possibleTileContents =
          possibleTileContents.concat(possibleTileContents);
      }

      const pairCount = tileCount / 2;

      const usedTileContents = possibleTileContents.slice(0, pairCount);

      const shuffledContents = usedTileContents
        .concat(usedTileContents)
        .sort(() => Math.random() - 0.5)
        .map((content) => ({ content, state: "start" }));

      const result = arrayTo2D(shuffledContents, Math.sqrt(tileCount));
      // setTiles(result);
      return result;
    };

    setTiles(getTiles(difficulty));
    setTryCount(0);
    setScore(0);
    setMovesStack([]);
    setHint([]);
  }, [difficulty, gameNumber]);

  function pickRandomTile() {
    const row = Math.floor(Math.random() * tiles.length);
    const col = Math.floor(Math.random() * tiles[row]?.length);
    return [row, col];
  }

  function getHintTile() {
    let [row, col] = pickRandomTile();
    let hintTile = tiles[row]?.[col];
    if (!hintTile) {
      return;
    }

    while (hintTile.state !== "start") {
      [row, col] = pickRandomTile();
      hintTile = tiles[row][col];
    }

    return {
      coordinate: [row, col],
      tile: hintTile,
    };
  }

  function findHintTilePair() {
    const hintTile = getHintTile();
    for (let i = 0; i < tiles.length; i++) {
      for (let j = 0; j < tiles[i].length; j++) {
        const tile = tiles[i][j];
        if (
          tile.content.name === hintTile.tile.content.name &&
          tile.state === "start" &&
          !(i === hintTile.coordinate[0] && j === hintTile.coordinate[1])
        ) {
          setHint([
            [hintTile.coordinate[0], hintTile.coordinate[1]],
            [i, j],
          ]);
          setScore((score) => score - 15);
        }
      }
    }
  }

  const flip = (origin, index) => {
    if (tiles[origin][index].state === "flipped") return;

    const flippedTiles = [];
    tiles.forEach((tiles) => {
      let foundTile = tiles.find((tile) => tile.state === "flipped");
      if (foundTile) flippedTiles.push(foundTile);
    });

    const flippedCount = flippedTiles.length;

    if (secondFlip) return;

    if (flippedCount === 1) {
      setTryCount((c) => c + 1);
      setHint([]);

      const alreadyFlippedTile = flippedTiles[0];
      const justFlippedTile = tiles[origin][index];
      setSecondFlip(justFlippedTile);

      let newState = "start";

      if (alreadyFlippedTile.content === justFlippedTile.content) {
        confetti({
          ticks: 300,
          particleCount: 100,
        });
        newState = "matched";
        setScore((score) => score + 50);
        setMovesStack(
          produce((draft) => {
            draft.push([
              { coordinate: trailingCoordinate, ...alreadyFlippedTile },
              { coordinate: [origin, index], ...justFlippedTile },
            ]);
          })
        );
      }

      setTimeout(() => {
        setTiles((prevTiles) => {
          const newTiles = produce(prevTiles, (draft) => {
            draft.forEach((tiles) => {
              tiles.forEach((tile) => {
                if (tile.state === "flipped") {
                  tile.state = newState;
                }
              });
            });
          });

          if (
            newTiles.every((tiles) =>
              tiles.every((tile) => tile.state === "matched")
            )
          ) {
            if (!timeEnd) {
              confetti({
                ticks: 1500,
                particleCount: 500,
                gravity: 0.9,
                angle: 90,
                spread: 190,
                startVelocity: 50,
              });
            }
            setLeaderboard({
              difficulty,
              score: ((score + 50) / difficulty) * 4,
            });
            setTimeout(end, 0);
          }

          return newTiles;
        });
        setSecondFlip(null);
      }, 500);
    }

    setTiles(
      produce((draft) => {
        draft[origin][index].state = "flipped";
      })
    );
    setTrailingCoordinate([origin, index]);
  };

  const triggerTimeEnd = () => {
    setTimeEnd(true);
    end();
  };

  return (
    <main className="w-full h-full relative flex flex-col gap-3 items-center justify-center z-10">
      <motion.span
        className={`text-midGray font-medium p-2 flex items-center gap-2 transition-colors duration-[500ms] ${
          !isLightTheme ? "bg-gray-100 rounded-lg shadow-2xl" : ""
        }`}
        variants={topTabAnimation}
        initial="initial"
        animate="enter"
      >
        <div id="tries" className="flex items-center gap-2">
          <span className="text-deepIndigo">Tries: </span>
          <span className="text-center px-2 bg-fadedIndigo rounded-md text-deepIndigo">
            {tryCount}
          </span>
        </div>
        |
        <div id="timer" className="flex items-center gap-2">
          <span className="text-deepIndigo">Time:</span>
          <span className="">
            <Timer
              refresh={[gameNumber, difficulty]}
              setTimeEnd={triggerTimeEnd}
            />
          </span>
        </div>
        |
        <div id="score" className="flex items-center gap-2">
          <span className="text-deepIndigo">Score:</span>
          <span className="text-center px-2 rounded-md text-deepIndigo bg-fadedIndigo">
            {score}
          </span>
        </div>
      </motion.span>
      <motion.div
        className="flex justify-center items-center w-full py-8 bg-fixed bg-center bg-cover max-[750px]:py-1"
        variants={boardAnimation}
        initial="initial"
        animate="enter"
      >
        <div className="flex flex-col gap-3 p-3 rounded-md bg-lightGray shadow-2xl transition-all">
          {tiles.map((tiles, origin) => {
            return (
              <div key={origin} className="flex gap-3">
                {tiles.map((tile, index) => {
                  return (
                    <Tile
                      key={"" + origin + index}
                      flip={() => flip(origin, index)}
                      {...tile}
                      hint={
                        !!hint.find((h) => h[0] === origin && h[1] === index)
                      }
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </motion.div>
    </main>
  );
}
