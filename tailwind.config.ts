import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  "#fdf8ef",
          100: "#f9edd4",
          200: "#f2d9a8",
          300: "#e8bf72",
          400: "#dda040",
          500: "#c8862a",
          600: "#a66a22",
          700: "#85501f",
          800: "#6d4120",
          900: "#5c371e",
          950: "#3a2010",
        },
        charcoal: {
          50:  "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#1a1a1a",
          950: "#0f0f0f",
        },
        himalaya: {
          950: "#0d0b08",
          900: "#13100a",
          800: "#1a1208",
          700: "#241a0e",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans:  ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeInUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slowZoom: {
          "0%, 100%": { transform: "scale(1.0)" },
          "50%":      { transform: "scale(1.08)" },
        },
        shimmerSlide: {
          "0%":   { left: "-100%" },
          "100%": { left: "200%" },
        },
        floatUpDown: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212,169,67,0.4)" },
          "50%":      { boxShadow: "0 0 0 12px rgba(212,169,67,0)" },
        },
        pingGold: {
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
        rotateSlow: {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in-up":   "fadeInUp 0.8s ease both",
        "fade-in":      "fadeIn 0.6s ease both",
        "slow-zoom":    "slowZoom 30s ease-in-out infinite",
        "float":        "floatUpDown 6s ease-in-out infinite",
        "pulse-gold":   "pulseGold 2s ease-in-out infinite",
        "ping-gold":    "pingGold 1.5s cubic-bezier(0,0,0.2,1) infinite",
        "rotate-slow":  "rotateSlow 20s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
