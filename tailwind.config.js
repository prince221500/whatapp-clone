/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        whatsapp: {
          primary: '#00a884',
          secondary: '#008069',
          light: '#d1f4cc',
          dark: '#111b21',
          gray: '#8696a0',
          'chat-bg': '#0b141a',
          'message-bg': '#202c33',
          'sidebar-bg': '#111b21',
        }
      },
      fontFamily: {
        sans: ['Segoe UI', 'Helvetica Neue', 'Helvetica', 'Lucida Grande', 'Arial', 'Ubuntu', 'Cantarell', 'Fira Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}