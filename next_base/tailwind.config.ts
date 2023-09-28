import { url } from "inspector";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        hexTri: "url('./img/HexTrimmed.png')",
        hexHero: "url('./img/hexagons.svg')",
      },
      animation: {
        marqee: "marquee 30s linear 0s infinite",
      },
      keyframes: {
        marquee: {
          "0%": {
            "background-position-x": "0px",
            "background-position-y": "0px",
          },
          "100%": {
            "background-position-x": "1400px",
            "background-position-y": "-840px",
          },
        },
      },
      colors: {
        main: colors.indigo[800],
        secondary: colors.indigo[600],
        tertiary: {
          normal: colors.indigo[400],
          hover: colors.indigo[900],
        },
        warning: {
          normal: colors.pink[300],
          hover: colors.pink[900],
        },
        side: { body: colors.neutral[500], title: colors.neutral[600] },
        player2: {
          tile: colors.red[500],
          side: colors.red[600],
        },
        player1: {
          tile: colors.blue[500],
          side: colors.blue[600],
        },
      },
    },
  },
  plugins: [],
};
export default config;
