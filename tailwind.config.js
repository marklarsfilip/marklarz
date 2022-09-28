/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black': '#000000',
      'bubble-gum': '#ff77e9',
      'june-bud': '#C5D86D',
      'lavender-blush': '#F8E9E9',
      'russian-violet': '#190933',
      'cadet': '#2E294E',
      'imperial-red': '#F71735',
      'orange-peel': '#FF9F1C',
    },
    fontFamily: {
      roboto: ['Roboto Mono', 'monospace'],
      bangers: ['Bangers', 'cursive'],
      emoji: ['Noto Color Emoji', 'sans-serif'],
    }
  },
  plugins: [],
}
