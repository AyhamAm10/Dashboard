/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'green': '#8AC389',
      'ofgreen':'#8ac3984d',
      'red': '#FE5E37',
      'black': '#0A0A0A',
      'ofblack': '#7c7c7cb5',
      'ofwhite': '#ECEDEF',
      'white': '#FFFFFF',
      'blue': "rgb(42, 165, 221)"
    },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
        'full': '9999px', // يمكنك استخدام هذه القيمة لجعل الحواف مستديرة تمامًا
      },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
     
    }
},
  plugins: [],
}