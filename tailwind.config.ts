import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050508",
          900: "#0A0C12",
          800: "#10141C",
          700: "#171D28",
          600: "#222C3A",
        },
        signal: {
          400: "#5EEAD4",
          500: "#2DD4BF",
          600: "#14B8A6",
        },
        amber: {
          400: "#FBBF6B",
          500: "#F5A623",
        },
        mist: {
          100: "#EDF1F5",
          300: "#B7C2CF",
          500: "#7C8798",
          700: "#3A4455",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
