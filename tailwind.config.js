module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Exo\\ 2', 'Segoe\\ UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica\\ Neue', 'sans-serif'],
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
    display: ["group-hover"],
  },
  plugins: [require('@tailwindcss/forms'),],
}
