import { useEffect, useState } from "react";
import { StartScreen } from "./StartScreen";
import { PlayScreen } from "./PlayScreen";
import { TaskBar } from "./taskBar";
import { Sidebar } from "./sidebar";
import { useThemeStore } from "./store/themeStore";
import { Loader } from "./Loader";

import CursorContextProvider from "./context/cursorContext";

import { Steps } from "intro.js-react";
import "intro.js/introjs.css";
import "./App.css";
import { Cursor } from "./cursor";

const steps = [
  {
    element: "#tries",
    intro:
      "This represents your total number of tries. 'Try' to keep it as low as possible.",
  },
  {
    element: "#timer",
    intro:
      "The timer. May not seem like a lot now, but if it hits 5 minutes, that's game over! Watch out for it in Impossible mode.",
  },
  {
    element: "#score",
    intro: "Self explanatory.",
    position: "left",
  },
  {
    element: "#refresh",
    intro:
      "The refresh button. Use it to immediately refresh the board and start a new game.",
    position: "right",
  },
  {
    element: "#undo",
    intro: "Use this to undo the last move. Your score will also be reduced.",
  },
  {
    element: "#hint",
    intro: "Use this to get a hint. Your score will be slightly reduced.",
  },
  {
    element: "#theme",
    intro: "Use this to toggle between light and dark theme.",
  },
  {
    element: "#menu",
    intro:
      "Use this to toggle the sidebar for further options, like viewing your highest scores on the leaderboard, changing the number of tiles, or customizing the background",
  },
];

function App() {
  const [gameState, setGameState] = useState("start");
  const [isLoading, setIsLoading] = useState(true);
  const [openSidebar, setOpenSidebar] = useState(false);
  const isLightTheme = useThemeStore((state) => state.isLightTheme);

  const [enabled, setEnabled] = useState(false);
  const [initialStep] = useState(0);

  const menuAudio = new Audio("/assets/menu-select.mp3");

  useEffect(() => {
    if (!isLightTheme) {
      document.body.classList.add("dark");
    }
  }, []); //eslint-disable-line

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 4500);

    return () => clearTimeout(timeout);
  }, []);

  const toggleSidebar = () => {
    menuAudio.play();
    setOpenSidebar(!openSidebar);
  };

  const onExit = () => {
    setEnabled(false);
  };

  return (
    <CursorContextProvider>
      <Cursor />
      <Steps
        enabled={enabled}
        steps={steps}
        initialStep={initialStep}
        onExit={onExit}
      />
      {isLoading && <Loader />}
      {gameState === "start" && !isLoading && (
        <StartScreen start={() => setGameState("play")} />
      )}
      {gameState === "play" && !isLoading && (
        <>
          <PlayScreen end={() => setGameState("start")} />
          <TaskBar toggleSidebar={toggleSidebar} />

          <Sidebar
            startTutorial={setEnabled}
            isVisible={openSidebar}
            toggle={toggleSidebar}
          />
        </>
      )}
    </CursorContextProvider>
  );
}

export default App;
