/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          950: '#071a0f',
          900: '#0c2918',
          800: '#113d24',
          700: '#1a5c36',
          600: '#237a49',
          500: '#2d9960',
          400: '#3db877',
          300: '#6dcc9b',
          200: '#a8e3c2',
          100: '#d4f1e3',
          50:  '#edfaf4',
        },
        surface: '#F7F7F5',
        canvas: '#FFFFFF',
        low:      '#16a34a',
        moderate: '#d97706',
        high:     '#dc2626',
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        serif:   ['Lora', 'Georgia', 'serif'],
        mono:    ['JetBrains Mono', 'monospace'],
        display: ['Pacifico', 'cursive'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        card:    '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.04)',
        lifted:  '0 4px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
        nav:     '0 -1px 0 rgba(0,0,0,0.06)',
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
      },
      maxWidth: {
        content: '680px',
        wide:    '900px',
      },
    },
  },
  plugins: [],
};
