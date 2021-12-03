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
        background: '#ffffff',
        backdrop: '#52527a20',
        primary: '#605DEC',
        'grey-primary': '#6E7491',
        'grey-secondary': '#7C8DB0',
        'grey-ternary': '#CBD4E6',
        'grey-4': '#27273F',
        hover: '#F6F6FE',
        'input-border': '#A1B0CC',
        'pale-purple': '#E9E8FC',
        'grey-5': '#EAFFFB',
        'light-greenn': '#007B65',
      },
      width: {
        '1/7': '14.28571429%',
      },
      minWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'modal-sm': '568px',
      },
      rounded: {
        '1/2': '50%',
      },
      maxWidth: {
        'modal-sm': '568px',
        '100px': '100px',
      },
      minHeight: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        456: '456px',
      },
      maxHeight: {
        456: '456px',
        '100px': '100px',
      },
      fontFamily: {
        nunito: ['Nunito Sans', 'sans-serif'],
      },
      borderRadius: {
        link: '4px',
        input: '4px',
        4: '4px',
        12: '12px',
      },
      borderWidth: {
        1: '1px',
      },
      padding: {
        30: '120px',
        24: '24px',
      },
      boxShadow: {
        'main-search':
          '0px 2px 4px rgba(7, 4, 146, 0.1), 0px 24px 60px rgba(6, 47, 125, 0.05), 0px 12px 24px rgba(27, 59, 119, 0.05)',
        'results-search':
          '0px 2px 2px rgba(28, 5, 77, 0.05), 0px 12px 8px rgba(0, 0, 0, 0.02)',
      },
      margin: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
        xxl: '40px',
        xxxl: '64px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
