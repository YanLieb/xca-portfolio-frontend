/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2rem',
      },
      fontFamily: {
        chainprinter: ['chainprinter', 'sans-serif'],
        sans: ['var(--font-geist-sans)']
      },
    },
  },
  plugins: [],
};
