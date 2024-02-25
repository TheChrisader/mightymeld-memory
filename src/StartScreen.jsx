import { motion } from "framer-motion";

const startAnimation = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  entry: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0, 1.93, 1, 1.01],
    },
  },
};

export function StartScreen({ start }) {
  return (
    <div className="relative z-10 w-full h-full flex items-center justify-center">
      <motion.div
        className="p-20 flex flex-col items-center gap-8 bg-pink-100 rounded-lg max-[450px]:p-12"
        variants={startAnimation}
        initial="initial"
        animate="entry"
      >
        <h1 className="text-pink-500 text-4xl font-bold">Memory</h1>
        <span className="text-pink-500 font-medium">
          Flip over tiles looking for pairs
        </span>
        <button
          onClick={start}
          className="bg-gray-400 text-white py-2 px-12 font-semibold text-lg rounded-full bg-gradient-to-b from-pink-400 to-pink-600 hover:from-pink-300 hover:to-pink-500 wave-fill"
        >
          Play
        </button>
      </motion.div>
    </div>
  );
}
