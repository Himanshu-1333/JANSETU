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
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          dark: '#0B1020',
        },
        gov: {
          dark: '#0B1020',
          card: '#131B2E',
          accent: '#4F46E5',
          success: '#10B981',
          warning: '#F59E0B',
          critical: '#EF4444',
          bg: '#F8FAFC',
        }
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '18px',
      }
    },
  },
  plugins: [],
}
