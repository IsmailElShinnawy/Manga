module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'input-focus': '#0000ff',
        'input-background': '#eee',
        'input-error': '#fa0000',
        'button-background-primary': '#0000ff',
      },
      minWidth: {
        '1/2': '50%',
      },
      minHeight: {
        '1/2': '50%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
