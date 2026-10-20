import mosaic from "mosaic/tailwind-preset.cjs";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [mosaic],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
}
