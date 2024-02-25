import { motion } from "framer-motion";
import { useSettingsStore } from "./store/settingsStore";
import { useEffect, useState } from "react";

export function Tile({ content: Content, flip, state, hint }) {
  const [boardStyling, setBoardStyling] = useState("");
  const currentDifficulty = useSettingsStore(
    (state) => state.currentDifficulty
  );

  const styles = {
    4: "size-[150px] max-[500px]:size-[150px] max-[410px]:size-[150px]",
    16: "size-[75px] max-[500px]:size-[75px] max-[410px]:size-[65px]",
    36: "size-[55px] max-[410px]:size-[44px]",
    64: "size-[34px] p-[2px] max-[500px]:size-[33px] max-[450px]:size-[30px] max-[410px]:size-[29px]",
  };

  useEffect(() => {
    setBoardStyling(styles[currentDifficulty]);
  }, [currentDifficulty]); // eslint-disable-line

  switch (state) {
    case "start":
      return (
        <Back
          className={`inline-block bg-tileBasic text-center rounded-md cursor-pointer hover:scale-110 hover:bg-tileHover transition-all ${
            hint ? "bg-tileHint" : ""
          } ${boardStyling}`}
          flip={flip}
        />
      );
    case "flipped":
      return (
        <Front
          className={`inline-block bg-tileHint p-2 fill-mainWhite rounded-md cursor-pointer transition-colors ${boardStyling}`}
        >
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
              fill: "white",
            }}
          />
        </Front>
      );
    case "matched":
      return (
        <Matched
          className={`inline-block text-lightMidGray transition-colors rounded-md ${boardStyling}`}
        >
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
            }}
          />
        </Matched>
      );
    default:
      throw new Error("Invalid state " + state);
  }
}

const turnAnimation = {
  initial: { rotateY: 90 },
  enter: () => ({
    rotateY: 0,
    transition: {
      duration: 0.3,
      ease: [0.75, 0, 0.24, 1],
    },
  }),
  exit: () => ({
    rotateY: 90,
    transition: {
      duration: 0.2,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

function Back({ className, flip }) {
  return (
    <motion.div
      onClick={flip}
      className={className}
      variants={turnAnimation}
      initial="initial"
      animate="enter"
      exit="exit"
    ></motion.div>
  );
}

function Front({ className, children }) {
  return (
    <motion.div
      className={className}
      variants={turnAnimation}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

function Matched({ className, children }) {
  return (
    <motion.div
      variants={turnAnimation}
      initial="initial"
      animate="enter"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
}
