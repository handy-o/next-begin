/** @type {import('tailwindcss').Config} */



export default {
    content: ["./*.html"],
    theme: {
      extend: {
        "borderRadius": {
            "sexy-name": "11.11px"
        },
        colors: {
          'theme-color': '#49b0aa',
        },
        margin: {
            "top-a-lot":"120px"
        },
        
      },
      
    },
    variants: {
      extend: {
        backgroundColor: ['peer-checked'], // peer-checked 활성화
      },
    },
    plugins: [],
  }
  