/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Void black and cosmic obsidian palette (Antigravity Theme)
        void: {
          950: '#030712',
          900: '#050814',
          850: '#0B0F1F',
          800: '#111827',
          750: '#1E293B',
          700: '#334155',
        },
        navy: {
          950: '#030712',
          900: '#060B18',
          850: '#0B1124',
          800: '#101935',
          750: '#1A2544',
          700: '#26345A',
          600: '#3A4B75',
          500: '#526698',
          400: '#7E90B8',
        },
        // Antigravity High-Energy Physics Accents
        antigravity: {
          purple: '#8B5CF6',
          violet: '#7C3AED',
          neon: '#A855F7',
          cyan: '#06B6D4',
          electric: '#38BDF8',
          gold: '#F59E0B',
          solar: '#FBBF24',
          mint: '#10B981',
          holo: '#34D399',
        },
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#3B82F6',
          600: '#1D64EC', // Exact Primary Brand Blue
          700: '#1D4ED8',
          purple: '#8B5CF6',
          cyan: '#0EA5E9',
          gold: '#FBBF24',
          emerald: '#16A34A',
        },
        meta: {
          blue: '#1877F2',
          instagram: '#E1306C',
          teal: '#00B2A9',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'panel': '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
        'glow-purple': '0 0 25px -3px rgba(139, 92, 246, 0.45), 0 0 10px 0 rgba(168, 85, 247, 0.3)',
        'glow-cyan': '0 0 25px -3px rgba(6, 182, 212, 0.45), 0 0 10px 0 rgba(56, 189, 248, 0.3)',
        'glow-gold': '0 0 20px -2px rgba(245, 158, 11, 0.35)',
        'glow-mint': '0 0 20px -2px rgba(16, 185, 129, 0.35)',
        'card-inset': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px 0 rgba(139, 92, 246, 0.15)',
      }
    },
  },
  plugins: [],
}
