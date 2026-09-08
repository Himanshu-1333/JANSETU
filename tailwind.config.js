/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      colors: {
        /* CSS variable tokens for runtime theming */
        site: 'var(--site-bg)',
        surface: 'var(--surface-bg)',
        muted: 'var(--muted-bg)',
        'card-border': 'var(--card-border)',
        'text-default': 'var(--text-default)',
        'muted-text': 'var(--muted-text)',
        'accent-indigo': 'var(--accent-indigo, #6366f1)',
        'accent-emerald': 'var(--accent-emerald, #10b981)',

        brand: {
          50: '#FFFFFF',
          100: '#FAFAF8',
          200: '#F5F5F3',
          300: '#EEEEEC',
          400: '#E5E5E2',
          500: '#DCDCD8',
          600: '#CFCFCA',
          700: '#BDBDB7',
          800: '#A9A9A2',
          900: '#92928B',

          background: '#F5F5F3',
          surface: '#FFFFFF',
          card: '#FFFFFF',

          border: '#DCDCDC',
          text: '#252525',
          muted: '#777777',
        },

        gov: {
          bg: '#F5F5F3',
          surface: '#FFFFFF',
          card: '#FFFFFF',

          text: '#252525',
          muted: '#777777',

          border: '#DCDCDC',

          accent: '#7666C8',
          accentLight: '#EEEBFA',

          success: '#3E8E6B',
          successLight: '#EDF7F2',

          warning: '#C58A32',
          warningLight: '#FFF6E5',

          critical: '#C85C5C',
          criticalLight: '#FCEEEE',

          info: '#7666C8',
          infoLight: '#EEEBFA',
        },
      },

      borderRadius: {
        xl: '12px',
        '2xl': '16px',
        '3xl': '18px',
      },

      boxShadow: {
        card: '0 2px 10px rgba(0, 0, 0, 0.05)',
        soft: '0 1px 5px rgba(0, 0, 0, 0.04)',
      },
    },
  },

  plugins: [],
};