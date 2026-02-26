/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#ffc900",
                "accent-pink": "#ff8fe9",
                "background-light": "#fffdf0",
                "teal-accent": "#23a094",
            },
            fontFamily: {
                "display": ["Space Grotesk", "sans-serif"]
            },
            boxShadow: {
                "hard": "4px 4px 0px 0px #000000",
                "hard-lg": "8px 8px 0px 0px #000000",
                "hard-sm": "2px 2px 0px 0px #000000",
            },
            animation: {
                'slide-up': 'slideUp 0.3s ease-out forwards',
                'fade-in': 'fadeIn 0.2s ease-out forwards',
            },
            keyframes: {
                slideUp: {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                }
            }
        },
    },
    plugins: [],
}
