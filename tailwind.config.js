module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#D25235',
          'primary-focus': '#8C3623',
          'primary-content': '#ffffff',
          secondary: '#D25235',
          'secondary-focus': '#8C3623',
          'secondary-content': '#ffffff',
          accent: '#D25235',
          'accent-focus': '#8C3623',
          'accent-content': '#ffffff',
          neutral: '#545554',
          'neutral-focus': '#383838',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#d1d5db',
          'base-content': '#1f2937',
          info: '#2094f3',
          success: '#009485',
          warning: '#ff9900',
          error: '#ff5724',
        },
      },
    ],
  },
};
