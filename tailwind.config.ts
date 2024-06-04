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
      },
      backgroundColor:{
        fadeBlack: "rgb(0,0,0,0.5)",
        commonGray:'rgb(32, 32, 32)'
      },
      colors:{
        commonGrayColor:'rgb(32, 32, 32)',
      },
      height:{
        "screen-20":"20vh",
        "screen-40":"40vh",
        "screen-50":"50vh",
        "screen-60":"60vh",
        "screen-80":"80vh",
        "192":"48rem",
      },
    },
  },
  plugins: [],
};
export default config;
