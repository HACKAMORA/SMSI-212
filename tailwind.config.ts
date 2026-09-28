import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#141413",
          muted: "#6F6E68",
          faint: "#9C9B94",
        },
        paper: {
          DEFAULT: "#F3F2EE",
          raised: "#FFFFFF",
          line: "#E7E5DC",
        },
        teal: {
          DEFAULT: "#4F46E5",
          dark: "#4338CA",
          soft: "#EEF2FF",
        },
        clay: {
          DEFAULT: "#4F46E5",
          soft: "#EEF2FF",
        },
        moss: {
          DEFAULT: "#059669",
          soft: "#D1FAE5",
        },
        amber: {
          DEFAULT: "#D97706",
          soft: "#FEF3C7",
        },
        rose: {
          DEFAULT: "#E11D48",
          soft: "#FFE4E6",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,20,19,0.04), 0 12px 32px -16px rgba(20,20,19,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
