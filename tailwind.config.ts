import type { Config } from "tailwindcss";

// Brand tokens match TUIGLO_Style_Guide.html's CSS custom properties exactly.
// The 4 official palette colors are brown/beige/cream/offwhite. `ink` is a
// confirmed functional-only text color (NOT part of the official palette,
// never used in the logo) — see TUIGLO_Website_Design_Direction.md §2/§8.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          brown: "#A79277",
          beige: "#D1BB9E",
          cream: "#EAD8C0",
          offwhite: "#FFF2E1",
        },
        ink: "#443A2C",
      },
      fontFamily: {
        arabic: ["var(--font-ibm-plex-sans-arabic)", "sans-serif"],
        latin: ["var(--font-montserrat)", "sans-serif"],
        serif: ["var(--font-lora)", "serif"],
      },
      fontSize: {
        xs: "14px",
        sm: "16px",
        base: "16px",
        lg: "20px",
        xl: "25px",
        "2xl": "32px",
        "3xl": "40px",
        "4xl": "50px",
      },
      spacing: {
        "4.5": "18px",
      },
      borderRadius: {
        sm: "8px",
        md: "16px",
        lg: "28px",
      },
      boxShadow: {
        warm: "0 8px 24px rgba(74,58,32,0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
