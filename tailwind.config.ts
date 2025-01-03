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
        body: "#333333",
        primary: "#123262",
        secondary: "#4A5D79",
        background: "#ffffff",
        grey: "#F0F2F5",
        lightGrey: "#F0F2F5",
        border: "#DDE2E6",
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