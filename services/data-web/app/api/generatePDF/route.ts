// import { NextApiRequest, NextApiResponse } from "next";

// export default async function GET(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     const contentWrapperStart = `
//       <!DOCTYPE html>
//         <html lang="en">
//         <head>
//           <meta charset="UTF-8" />
//           <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
//         <link rel="preconnect" href="https://fonts.googleapis.com">
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//         <link href="https://fonts.googleapis.com/css2?family=Gowun+Batang&display=swap" rel="stylesheet">
//           </head>
//         <script src="https://cdn.tailwindcss.com"></script>
//         <script>
//           tailwind.config = {
//             content: [
//               './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
//               './src/components/**/*.{js,ts,jsx,tsx,mdx}',
//               './src/app/**/*.{js,ts,jsx,tsx,mdx}',
//             ],
//             theme: {
//               extend: {
//                 fontFamily: {
//                   nanum: ['NanumGothic', 'sans-serif'],
//                   batang: ['Batang', 'serif'],
//                 },
//                 backgroundImage: {
//                   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//                   'gradient-conic':
//                     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
//                 },
//               },
//               colors: {
//                 white: colors.white,
//                 black: colors.black,
//                 gray: colors.gray,
//                 blue: colors.blue,
//                 red: colors.red,
//                 yellow: colors.yellow,
//                 green: colors.green,
//                 indigo: colors.indigo,
//                 purple: colors.purple,
//                 pink: colors.pink,
//                 teal: colors.teal,
//                 orange: colors.orange,
//                 cyan: colors.cyan,
//                 lime: colors.lime,
//                 emerald: colors.emerald,
//                 rose: colors.rose,
//                 fuchsia: colors.fuchsia,
//                 violet: colors.violet,
//                 amber: colors.amber,
//                 sky: colors.sky,
//                 mygray: '#8D8D8D',
//                 mybg: '#F6F6F6',
//                 myborder: '#E0E0E0',
//                 mygold: '#C89C23',
//                 mygraybg: '#D1D1D1',
//                 myyellow: '#D3AB3B',
//                 myRed: '#FF0000',
//                 myBlue: '#4a81a4'
//               }
//             },
//             plugins: [require("tailwind-scrollbar-hide")],
//           }
//         </script>
//         <body>
//           <div class="flex flex-col bg-white h-[100%] w-[100%] mx-auto relative justify-center items-center">
//       `
    
//   }
// }