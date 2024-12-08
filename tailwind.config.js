/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        secondary: 'var(--secondary)',
        'dark-text': 'var(--dark-text)',
        'light-bg': 'var(--light-bg)',
        'card-bg': 'var(--card-bg)',
        'border-color': 'var(--border-color)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};