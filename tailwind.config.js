/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0C0A09",      // main bg
        card: "#1C1917",            // forms/cards
        border: "#292524",          // borders

        gold: "#D97706",            // primary gold
        goldBright: "#F59E0B",      // stars/highlights
        bronze: "#78350F",          // deep bronze

        textMain: "#FAFAF9",        // white
        textBody: "#A8A29E",        // gray body
        textMuted: "#78716C",       // muted
      },

      boxShadow: {
        luxe: "0px 25px 50px rgba(0,0,0,0.5)",
      },

      maxWidth: {
        layout: "1280px",
      },

      letterSpacing: {
        luxe: "0.1em",
      },
    },
  },
  plugins: [],
};
