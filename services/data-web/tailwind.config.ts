import type { Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";
const colors = require("tailwindcss/colors");
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
  colors: {
    white: colors.white,
    black: colors.black,
    gray: colors.gray,
    blue: colors.blue,
    red: colors.red,
    yellow: colors.yellow,
    green: colors.green,
    indigo: colors.indigo,
    purple: colors.purple,
    pink: colors.pink,
    teal: colors.teal,
    orange: colors.orange,
    cyan: colors.cyan,
    lime: colors.lime,
    emerald: colors.emerald,
    rose: colors.rose,
    fuchsia: colors.fuchsia,
    violet: colors.violet,
    amber: colors.amber,
    sky: colors.sky,
    mygray: '#8D8D8D',
    mybg: '#F6F6F6',
    myborder: '#E0E0E0',
    mygold: '#C89C23',
    mygraybg: '#EAEAEF',
    myyellow: '#D3AB3B',
    myRed: '#FF0000',
    myBlue: '#4945FF',
    sutTitle: '#4A4A6A',
    disabled: '#6D6E70',
    prevBtn: '#EAEAEF',
    myOrange: '#FF6433',
    searchBg: '#F4F6FF',
    mySelect: '#F5F5FF',
    unClicked: '#EFEFEF',
  },
};

export default withMT(config);