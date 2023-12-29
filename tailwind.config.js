module.exports = {
  darkMode: 'class',
  content: [
    `./components/**/*.{vue,js,ts}`,
    `./layouts/**/*.vue`,
    `./pages/**/*.vue`,
    `./composables/**/*.{js,ts}`,
    `./plugins/**/*.{js,ts}`,
    `./utils/**/*.{js,ts}`,
    `./App.{js,ts,vue}`,
    `./app.{js,ts,vue}`,
    `./Error.{js,ts,vue}`,
    `./error.{js,ts,vue}`,
    `./app.config.{js,ts}`,
  ],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        agro: {
          100: '#0cb14b',
        },
      },
      // gridTemplateColumns: {
      //   'fill-16': 'repeat(auto-fill, minmax(4rem, 1fr))',
      //   'fill-20': 'repeat(auto-fill, minmax(5rem, 1fr))',
      // },
      screens: {
        // xs: '575px',
      },
    },
  },
  variants: {},
  // plugins: [require('@tailwindcss/forms')],
};
