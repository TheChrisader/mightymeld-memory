const hints = [
  "Your score automatically gets added to the leaderboard if it's high enough",
  "Take the quick start guide for more information",
  "You can choose the number of tiles you want",
  "Don't let the timer hit five minutes",
];

const getRandomItem = (arr) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

export const Loader = () => {
  const hint = getRandomItem(hints);

  return (
    <>
      <svg>
        <defs>
          <filter id="filter">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="18"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -10"
              result="filter"
            />
            <feComposite in="SourceGraphic" in2="filter" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="absolute top-0 left-0 w-full h-full z-20 filter-[url(#filter)] loader-wrapper">
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
      </div>
      <div className="bg-mainBg fixed top-0 left-0 w-screen h-screen z-[15]">
        <span
          style={{ transform: "translate(-50%, -50%)" }}
          className="fixed font-bold text-darkGray text-center text-xl left-1/2 w-full px-1 bottom-[30vh] blink"
        >
          {hint}...
        </span>
      </div>
    </>
  );
};
