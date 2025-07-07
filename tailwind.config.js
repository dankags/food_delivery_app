/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        fontFamily: {
          'quicksand-light': ['Quicksand-Light'],
          'quicksand-regular': ['Quicksand-Regular'],
          'quicksand-medium': ['Quicksand-Medium'],
          'quicksand-semibold': ['Quicksand-SemiBold'],
          'quicksand-bold': ['Quicksand-Bold'],
          'rubik-black': ['Rubik_900Black'],
        },
        colors:{
          'primary': '#FE8C00',
          'text-primary': '#FE8C00',
          'text-secondary': '#181C2E',
          'tab-primary': '#F5F6F9',
        },
        
      },
    },
    plugins: [],
  }