import plugin from "tailwindcss/plugin";
import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{svelte,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" }
    },
    extend: {
      colors: () => ({
        border: "hsl(var(--color-border))",
        foreground: "hsl(var(--color-foreground))",
        background: "hsl(var(--color-background))",
        primary: {
          DEFAULT: "hsl(var(--color-primary))",
          foreground: "hsl(var(--color-primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--color-secondary))",
          foreground: "hsl(var(--color-secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--color-muted))",
          foreground: "hsl(var(--color-muted-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--color-destructive))",
          foreground: "hsl(var(--color-destructive-foreground))"
        }
      }),
      fontFamily: () => ({
        primary: ["var(--font-sans)", ...fontFamily.sans]
      }),
      borderColor: () => ({
        DEFAULT: "hsl(var(--color-border))"
      })
    }
  },
  plugins: [
    plugin(function ({ addVariant }) {
      const prefix = "ui";
      for (let state of ["open", "checked", "selected", "active", "disabled", "highlighted"]) {
        addVariant(`${prefix}-${state}`, [
          `&[data-state~="${state}"]`,
          `:where([data-state~="${state}"]):not(:has([data-state])) &`
        ]);
      }
    })
  ]
};
