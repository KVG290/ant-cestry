/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colony: {
          dark: '#0f172a',
          surface: '#1e293b',
          border: '#334155',
          gold: '#f59e0b',
          ruby: '#ef4444',
          emerald: '#10b981',
          azure: '#0ea5e9'
        }
      },
      keyframes: {
        float1: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '100%': { transform: 'translate(-20px, -240px) rotate(8deg)' }
        },
        float2: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '100%': { transform: 'translate(25px, -310px) rotate(-12deg)' }
        },
        float3: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '100%': { transform: 'translate(-35px, -190px) rotate(15deg)' }
        },
        crash: {
          '0%': { transform: 'translate(var(--float-x, 0), var(--float-y, -250px)) rotate(var(--float-r, 10deg)) scale(1.05)' },
          '70%': { transform: 'translate(0, 8px) rotate(0deg) scale(1.08, 0.92)' },
          '85%': { transform: 'translate(0, -4px) rotate(0deg) scale(0.98, 1.02)' },
          '100%': { transform: 'translate(0, 0) rotate(0deg) scale(1, 1)' }
        }
      },
      animation: {
        'float-1': 'float1 5s ease-in-out infinite alternate',
        'float-2': 'float2 6.5s ease-in-out infinite alternate',
        'float-3': 'float3 5.8s ease-in-out infinite alternate',
        'crash-impact': 'crash 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
      }
    },
  },
  plugins: [],
}
