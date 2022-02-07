module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#EC3C54',
          'primary-focus': '#9D2838',
          'primary-content': '#ffffff',
          secondary: '#FBD800',
          'secondary-focus': '#A79000',
          'secondary-content': '#ffffff',
          accent: '#17B9CF',
          'accent-focus': '#0F7B8A',
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
