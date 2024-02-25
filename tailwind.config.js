/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  safelist: ["linesPattern", "rhombusPattern", "checkeredPattern"],
  theme: {
    extend: {
      colors: {
        mainBg: "var(--main-bg)",
        mainWhite: "var(--main-white)",
        lightGray: "var(--light-gray)",
        lightMidGray: "var(--light-mid-gray)",
        midGray: "var(--mid-gray)",
        darkGray: "var(--dark-gray)",
        switchChecked: "var(--switch-checked)",
        switchUnchecked: "var(--switch-unchecked)",
        tileBasic: "var(--tile-basic)",
        tileHint: "var(--tile-hint)",
        tileHover: "var(--tile-hover)",
        deepIndigo: "var(--deep-indigo)",
        fadedIndigo: "var(--faded-indigo)",
        taskButtonHoverIcon: "var(--task-button-hover-icon)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
