/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      'xs': '400px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
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
        // Semantic mappings (light theme)
        primary: "#2E4C7F",
        secondary: "#3E6FB2",
        cta: "#2E4C7F",
        accent: "#3E6FB2",
        background: "#FFFFFF",
        surface: "#F8FAFC",
        text: "#0F172A",
        border: "#E2E8F0",
        muted: "#64748B",
        highlight: "#EFF4FB",
      },
      fontFamily: {
        display: ["Inter", "Noto Sans SC", "system-ui"],
        body: ["Inter", "Noto Sans SC", "system-ui"],
      },
      animation: {
        ticker: "ticker 32s linear infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
