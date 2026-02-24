import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#d9e6ff",
          200: "#bcd3ff",
          300: "#8eb8ff",
          400: "#5990ff",
          500: "#3366ff",
          600: "#1a44f5",
          700: "#1433e1",
          800: "#172cb6",
          900: "#192a8f",
          950: "#131c57",
        },
        accent: {
          50: "#fffbeb",
          100: "#fff3c6",
          200: "#ffe588",
          300: "#ffd24a",
          400: "#ffbf20",
          500: "#f99d07",
          600: "#dd7602",
          700: "#b75306",
          800: "#943f0c",
          900: "#7a340d",
          950: "#461a02",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "scale-in": "scaleIn 0.4s ease-out forwards",
        "count-up": "countUp 2s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      boxShadow: {
        "card": "0 1px 3px 0 rgba(0,0,0,.04), 0 1px 2px -1px rgba(0,0,0,.04)",
        "card-hover": "0 10px 40px -12px rgba(0,0,0,.12), 0 4px 16px -4px rgba(0,0,0,.06)",
        "glow": "0 0 40px -8px rgba(51,102,255,.25)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
