export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0B1220",        // main background
        darkCard: "#111827",      // card background
        darkBorder: "#1F2937",    // subtle borders
        darkText: "#E5E7EB",      // primary text
        darkMuted: "#9CA3AF",     // secondary text
        accentBlue: "#3B82F6",
        accentGreen: "#22C55E",
      },
    },
  },
  plugins: [],
};
