import type { Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";

const config: Config = {
  content: [
    "./app/data-pro/utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/data-pro/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/data-pro/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/data-pro/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/data-pro/styles/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [require("@tailwindcss/typography")],
};

export default withMT(config);