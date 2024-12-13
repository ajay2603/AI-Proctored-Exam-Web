import authAnimations from "./tailwind/auth_animations";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: { ...authAnimations.keyframes },
      animation: { ...authAnimations.animation },
    },
  },
  plugins: [],
};
