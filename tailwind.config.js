/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: {
            950: '#07162c',
            900: '#0B2545',
            800: '#133B6B',
            700: '#1A4F8B',
            600: '#2563EB',
            100: '#EEF4FF',
            50: '#F5F8FC',
          },
          saffron: {
            DEFAULT: '#FF6B1A',
            dark: '#E0550B',
            light: '#FFF0E8',
          },
          green: {
            DEFAULT: '#0F7B3D',
            dark: '#0A5C2D',
            light: '#EBF7F0',
          },
          gold: {
            DEFAULT: '#D4AF37',
            light: '#FDF8E8',
          },
          dark: '#0E1726',
          border: '#D3DEED',
          surface: '#F8FAFC',
        },
        risk: {
          low: '#0F7B3D',
          medium: '#D97706',
          high: '#DC2626',
          lowBg: '#ECFDF5',
          mediumBg: '#FFFBEB',
          highBg: '#FEF2F2',
        }
      },
      fontFamily: {
        serif: ['"Merriweather"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'Roboto', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      boxShadow: {
        gov: '0 1px 3px 0 rgba(11, 37, 69, 0.08), 0 1px 2px -1px rgba(11, 37, 69, 0.08)',
        'gov-md': '0 4px 6px -1px rgba(11, 37, 69, 0.1), 0 2px 4px -2px rgba(11, 37, 69, 0.08)',
        'gov-lg': '0 10px 15px -3px rgba(11, 37, 69, 0.12), 0 4px 6px -4px rgba(11, 37, 69, 0.08)',
      }
    },
  },
  plugins: [],
}
