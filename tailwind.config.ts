import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#ccff00",
        ink: "#0b0b0b",
        panel: "#141414",
        line: "#292929",
      },
      fontFamily: {
        display: ["Arial Black", "Impact", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
