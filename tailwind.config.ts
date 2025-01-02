import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#123262",
        background: "#e4e2de",
      },
      boxShadow: {
        custom: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config 