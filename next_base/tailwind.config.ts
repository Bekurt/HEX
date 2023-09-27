import { url } from "inspector";
import type { Config } from "tailwindcss";

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
    },
  },
  plugins: [],
};
export default config;
