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
        'grey-5' :'#EAFFFB',
        'light-greenn' :'#007B65',
       

      },
      minWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'modal-sm': '568px',
      },
      maxWidth: {
        'modal-sm': '568px',
      },
      minHeight: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      maxHeight: {
        456: '456px',
      },
      fontFamily: {
        nunito: ['Nunito Sans', 'sans-serif'],
      },
      borderRadius: {
        link: '4px',
        input: '4px',
        4: '4px',
      },
      borderWidth: {
        1: '1px',
      },
      padding: {
        30: '120px',
      },
      boxShadow: {
        'main-search':
          '0px 2px 4px rgba(7, 4, 146, 0.1), 0px 24px 60px rgba(6, 47, 125, 0.05), 0px 12px 24px rgba(27, 59, 119, 0.05)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
