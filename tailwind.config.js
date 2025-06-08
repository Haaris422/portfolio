module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // adjust as needed
  theme: {
    extend: {
      screens: {
        'short': { 'raw': '(max-height: 500px)' },
      },

      textShadow: {
        outline: [
          "-1px -1px 0 #000",
          "1px -1px 0 #000",
          "-1px 1px 0 #000",
          "1px 1px 0 #000"
        ],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-outline': {
          textShadow: `
            -1px -1px 0 #000,
             1px -1px 0 #000,
            -1px  1px 0 #000,
             1px  1px 0 #000
          `
        },
        '.text-stroke': {
          '-webkit-text-stroke': '1px black'
        }
      })
    }
  ],
}
