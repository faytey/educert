/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {      
    screens: {
      
      // 'lg': {'min': '1024px', 'max': '1279px'},
      'xl': {'min': '1024px', 'max': '1439px'},
      'xxl': {min: "1440px"},
      tabletAir: { max: "820px" }, // big tablet
      // tablet: { max: "768px" }, //tablet screen
      surfDuo:{max:"540"},
      sm: { max: "480px" },
      xsm: { max: "380px" },
      },
    extend: {
      colors: {
        /** primary */
        "prosperity": "#FCFF52",
        "forest": "#476520",
        /** base */
        "gypsum": "#FCF6F1",
        "sand": "#E7E3D4",
        "wood": "#655947",
        "fig": "#1E002B",
        /** functional */
        "snow": "#FFFFFF",
        "onyx": "#000000",
        "success": "#329F3B",
        "error": "#E70532",
        "disabled": "#9B9B9B",
        /** accent */
        "sky": "#7CC0FF",
        "citrus": "#FF9A51",
        "lotus": "#FFA3EB",
        "lavender": "#B490FF"
      }
    },
  },
  plugins: [],
}
