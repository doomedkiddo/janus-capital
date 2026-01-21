/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Brand Navy Scale (from logo blue)
        navy: {
          50: "#E8EDF5",
          100: "#C4D1E4",
          200: "#9CB3D0",
          300: "#7494BB",
          400: "#557DAC",
          500: "#3D679D",
          600: "#2E4C7F",
          700: "#1E3358",
          800: "#152340",
          900: "#0C101A",
        },
        // Brand Silver Scale (from logo silver/platinum)
        silver: {
          50: "#FAFBFC",
          100: "#F6F7FB",
          200: "#E8EAEF",
          300: "#D4D8E0",
          400: "#B9C0CC",
          500: "#9AA3B3",
          600: "#7A8599",
          700: "#5C6678",
          800: "#3E4655",
          900: "#222B3D",
        },
        // Brand Blue Accent Scale
        blue: {
          50: "#EBF2FA",
          100: "#D3E3F5",
          200: "#A8C8EB",
          300: "#7CAEDE",
          400: "#5694D1",
          500: "#3E6FB2",
          600: "#325A8F",
          700: "#26456C",
          800: "#1B3049",
          900: "#0F1B27",
        },
        // Semantic mappings
        primary: "#2E4C7F",
        secondary: "#1B2336",
        cta: "#5694D1",
        accent: "#B9C0CC",
        background: "#0C101A",
        surface: "#141A28",
        text: "#F6F7FB",
        border: "#222B3D",
        muted: "#7A8599",
        highlight: "#D4D8E0",
      },
      fontFamily: {
        display: ["Press Start 2P", "Noto Sans SC", "system-ui"],
        body: ["VT323", "Noto Sans SC", "system-ui"],
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        "float-slow": "floatSlow 10s ease-in-out infinite",
        scan: "scan 6s linear infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
        ticker: "ticker 18s linear infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 8px rgba(86, 148, 209, 0.25)" },
          "100%": { boxShadow: "0 0 28px rgba(86, 148, 209, 0.55)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-12px) translateX(10px)" },
        },
        scan: {
          "0%": { transform: "translateY(-60%)" },
          "100%": { transform: "translateY(60%)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: 0.4, transform: "scale(0.98)" },
          "50%": { opacity: 0.9, transform: "scale(1.02)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
