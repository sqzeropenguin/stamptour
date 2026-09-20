import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#7D6B7D",
        "ink-light": "#9A889A",
        glass: "rgb(255 255 255 / 0.5)",
      },
      maxWidth: {
        mobile: "430px",
      },
      backdropBlur: {
        glass: "12px",
      },
      boxShadow: {
        glass: "0 8px 32px rgb(125 107 125 / 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
