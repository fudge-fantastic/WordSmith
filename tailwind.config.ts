import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}", 
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        // add your fonts here with respect to their names
        aflux: ['Afacad Flux'],
        raleway: ['Raleway'],
        rhd: ['Red+Hat+Display'],
        cinzel: ['Cinzel'],

      },

      colors: {
        'vanila': '#e0d6c2',
        'green_vanila': '#8F8868',
        'red_vanila': '#976C54',
        'skin_vanila': '#B5A38D',
        'dark_vanila': '#1a1c19',
        'vanila_text': "#342415"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
} satisfies Config;
