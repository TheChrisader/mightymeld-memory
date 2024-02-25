import { SlRefresh, SlActionUndo, SlMenu, SlBulb } from "react-icons/sl";
import { Switch } from "./components/switch";
import { Magnetic } from "./Magnetic";

import { useTaskBarStore } from "./store/taskBarStore";
import { motion } from "framer-motion";

const tasksAnimation = {
  initial: {
    y: "300px",
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.4,
    },
  },
};

export const TaskBar = ({ toggleSidebar }) => {
  const refreshBoard = useTaskBarStore((state) => state.refreshBoard);
  const undoStateFunction = useTaskBarStore((state) => state.undoStateFunction);
  const showHint = useTaskBarStore((state) => state.showHint);

  const undo = () => {
    if (!undoStateFunction) {
      console.warn("Undo Function does not exist");
    }
    undoStateFunction();
  };

  const hint = () => {
    if (!showHint) {
      console.warn("Hint Function does not exist");
    }
    showHint();
  };
  return (
    <motion.div
      className="fixed flex bottom-[20px] left-0 right-0 w-fit h-fit translate-y-[-50%] z-10"
      style={{
        margin: "0 auto",
      }}
      variants={tasksAnimation}
      initial="initial"
      animate="enter"
    >
      <div className="relative py-2 px-8 rounded-lg flex gap-7 blur-after max-[500px]:gap-3 max-[411px]:px-2">
        <Magnetic>
          <button
            id="refresh"
            className="p-3 size-[50px] -mt-[30px] bg-lightGray border border-lightMidGray rounded-full shadow-lg transition-colors hover:bg-deepIndigo hover:border-none focus:border-none [&_*]:hover:fill-gray-100 focus:bg-deepIndigo [&_*]:focus:fill-gray-100"
            onClick={refreshBoard}
          >
            <SlRefresh className="size-full fill-darkGray transition-colors" />
          </button>
        </Magnetic>
        <Magnetic>
          <button
            id="undo"
            className="p-3 size-[50px] -mt-[30px] bg-lightGray border border-lightMidGray rounded-full shadow-lg transition-colors hover:bg-deepIndigo hover:border-none focus:border-none [&_*]:hover:fill-gray-100 focus:bg-deepIndigo [&_*]:focus:fill-gray-100"
            onClick={undo}
          >
            <SlActionUndo className="size-full fill-darkGray transition-colors" />
          </button>
        </Magnetic>
        <Magnetic>
          <button
            id="hint"
            className="p-3 size-[50px] -mt-[30px] bg-lightGray border border-lightMidGray rounded-full shadow-lg transition-colors hover:bg-deepIndigo hover:border-none focus:border-none [&_*]:hover:fill-gray-100 focus:bg-deepIndigo [&_*]:focus:fill-gray-100"
            onClick={hint}
          >
            <SlBulb className="size-full fill-darkGray transition-colors" />
          </button>
        </Magnetic>

        <Switch id="theme" className="-mt-[30px] shadow-lg" />

        <Magnetic>
          <button
            id="menu"
            className="p-3 size-[50px] -mt-[30px] bg-lightGray border border-lightMidGray rounded-full shadow-lg transition-colors hover:bg-deepIndigo hover:border-none focus:border-none [&_*]:hover:fill-gray-100 focus:bg-deepIndigo [&_*]:focus:fill-gray-100"
            onClick={toggleSidebar}
          >
            <SlMenu className="size-full fill-darkGray transition-colors" />
          </button>
        </Magnetic>
      </div>
    </motion.div>
  );
};
