import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        // Add other font styles if needed
      },
       // Add custom gradient
       backgroundImage: {
        'orange-gradient': 'linear-gradient(135deg, #FF6F00, #ff9400)', // Darker orange to lighter orange
        'orange-gradient-hover': 'linear-gradient(135deg, #ff9400, #FF6F00)', // Hover state

      },
    },
	},
	plugins: [daisyui],

	daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#ff8036", 
          "secondary": "#71717a", // zinc-500 
          "accent": "#37cdbe", // Teal accent
          "neutral": "#1f1f1f", // Dark grey (used as background in the images)
          "base-100": "#111111", // Very dark grey (used for cards and main content background)
          "info": "#3ABFF8", // Light blue
          "success": "#36D399", // Green
          "warning": "#FBBD23", // Yellow
          "error": "#F87272", // Red
          // ... other properties
        },
      },
    ],
  },
};