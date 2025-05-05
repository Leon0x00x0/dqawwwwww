/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}' // Falls du einen 'src'-Ordner verwendest
  ],
  darkMode: 'class', // Ermöglicht die Verwendung von 'dark' Klasse für den Dunkelmodus
  theme: {
    extend: {
      colors: {
        solana: {
          purple: '#9945FF',
          green: '#14F195',
          blue: '#80ECFF'
        }
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
  corePlugins: {
    preflight: true // Wichtig für die Kompatibilität mit Solana-Wallet-Komponenten
  }
};
