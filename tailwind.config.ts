import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background + UI colors
        primary: '#1E3A8A',   // Dark blue (used for bg)
        secondary: '#3B82F6', // Bright blue (accent/CTA)
        accent: '#93C5FD',    // Soft blue (hover/bg-light)

        // Text colors for contrast
        textPrimary: '#FFFFFF',   // White text for dark backgrounds
        textSecondary: '#1F2937', // Dark gray for light backgrounds
      },
    },
  },
  plugins: [],
}

export default config
