import { AnimatePresence, motion } from "framer-motion";
import { SlClose } from "react-icons/sl";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Curve } from "./curve";
import { ChangeBackground } from "./changeBackground";
import { CheckLeaderboard } from "./checkLeaderboard";
import { PickDifficulty } from "./pickDifficulty";
import { useCursorHandlers } from "./hooks/useCursorHandlers";

const menuSlideAnimation = {
  initial: {
    x: "calc(100% + 100px)",
  },
  enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: {
    x: "calc(100% + 100px)",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const slideAnimation = {
  initial: { x: 280 },
  enter: (i) => ({
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.05 * i,
    },
  }),
  exit: (i) => ({
    x: 100,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.05 * i,
    },
  }),
};

export const Sidebar = ({ isVisible, toggle, startTutorial }) => {
  const [toggleCursor, cursorHandlers] = useCursorHandlers({
    returnToggle: true,
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className="fixed h-full w-[30%] py-8 pl-16 pr-1 z-20 top-0 right-0 bg-indigo-600 transition-[width] max-[1300px]:w-[40%] max-[1000px]:w-[50%] max-[750px]:w-[75%] max-[500px]:w-[100%]"
          key="sidebar"
          variants={menuSlideAnimation}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <motion.button
            onClick={() => {
              toggle();
            }}
            className="absolute top-9 right-9 flex items-center justify-center size-[60px] bg-gray-100 rounded-full"
            variants={slideAnimation}
            initial="initial"
            animate="enter"
            exit="exit"
            custom={12}
          >
            <SlClose className="size-[50px] fill-gray-500" />
          </motion.button>
          <div className="relative">
            <motion.div
              className="mt-[15vh] mb-10"
              variants={slideAnimation}
              initial="initial"
              animate="enter"
              exit="exit"
              custom={2}
            >
              <span className="text-white">Options</span>
            </motion.div>
            <ul className="flex flex-col gap-8">
              <motion.li
                variants={slideAnimation}
                initial="initial"
                animate="enter"
                exit="exit"
                custom={4}
              >
                <CheckLeaderboard>
                  <button
                    {...cursorHandlers}
                    className="text-white text-3xl nav-item"
                  >
                    Check Leaderboard
                  </button>
                </CheckLeaderboard>
              </motion.li>
              <motion.li
                variants={slideAnimation}
                initial="initial"
                animate="enter"
                exit="exit"
                custom={6}
              >
                <PickDifficulty>
                  <button
                    {...cursorHandlers}
                    className="text-white text-3xl nav-item"
                  >
                    Change Difficulty
                  </button>
                </PickDifficulty>
              </motion.li>
              <motion.li
                variants={slideAnimation}
                initial="initial"
                animate="enter"
                exit="exit"
                custom={8}
              >
                <ChangeBackground>
                  <button
                    {...cursorHandlers}
                    className="text-white text-3xl nav-item"
                  >
                    Customize Application
                  </button>
                </ChangeBackground>
              </motion.li>
              <motion.li
                variants={slideAnimation}
                initial="initial"
                animate="enter"
                exit="exit"
                custom={10}
              >
                <button
                  {...cursorHandlers}
                  className="text-white text-3xl nav-item"
                  onClick={() => {
                    startTutorial(true);
                    toggle();
                    toggleCursor(false);
                  }}
                >
                  Start Quick Guide
                </button>
              </motion.li>
            </ul>
          </div>
          <div className="text-gray-200/90 absolute bottom-[20px] right-5">
            <span>Share to Social Media:</span>
            <div className="flex w-full justify-between items-center px-2 text-2xl">
              <a href="https://twitter.com/intent/tweet?url=https://mighty-memory.netlify.app/&text=Hey!%20Check%20out%20this%20amazing%20site%20I%20found!">
                <FaSquareXTwitter />
              </a>
              <a href="https://www.linkedin.com/shareArticle?mini=true&url=https://mighty-memory.netlify.app/">
                <FaLinkedin />
              </a>
              <a href="https://www.facebook.com/sharer/sharer.php?u=https://mighty-memory.netlify.app/">
                <FaFacebook />
              </a>
              <a href="mailto:info@example.com?&subject=&cc=&bcc=&body=https://mighty-memory.netlify.app/%0AHey!%20Check%20out%20this%20amazing%20site%20I%20found!">
                <MdEmail />
              </a>
            </div>
          </div>
          <Curve />
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
