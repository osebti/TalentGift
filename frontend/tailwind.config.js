/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "var(--white)",
        black: "var(--black)",
        green: "var(--pakistan-green)",
        darkPurple: "var(--finn-purple)",
        lightPurple: "var(--sky-magenta)",
        darkGreen: "var(--hunter-green)",
        primary: "#774077",
        secondary: "#b766a3",
        accent: "#5d8059",
        primaryTransparent: "#77407722",
        secondaryTransparent: "#b766a322",
        accentTransparent: "#5d805922",
        neutralTransparent: "#1d1d1d22",
      },
    },
  },
  variants: {
    extend: {
      // ...
      backdropBrightness: ["hover", "focus"],
    },
  },

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#774077",
          secondary: "#b766a3",
          accent: "#5d8059",
          primaryTransparent: "#774077",
          secondaryTransparent: "#b766a322",
          accentTransparent: "#5d805922",
          neutral: "#1d1d1d",
          info: "#bfdbfe",
          success: "#34d399",
          warning: "#fcd34d",
          error: "#f87171",
          "base-100": "#f1f1f1",
        },
      },
    ],
  },

  plugins: [daisyui],
};
