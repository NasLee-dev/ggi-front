'use server'
import jsPDF from "jspdf";
import puppeteer from "puppeteer";
import hb from "handlebars";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const { html, pageNum, fileName } = await req.json();
    const contentWrapperStart = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Gowun+Batang&display=swap" rel="stylesheet">
      </head>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        content: [
          './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
          './src/components/**/*.{js,ts,jsx,tsx,mdx}',
          './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        ],
        theme: {
          extend: {
            fontFamily: {
              nanum: ['NanumGothic', 'sans-serif'],
              batang: ['Batang', 'serif'],
            },
            backgroundImage: {
              'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
              'gradient-conic':
                'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
          },
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
            mygraybg: '#D1D1D1',
            myyellow: '#D3AB3B',
            myRed: '#FF0000',
            myBlue: '#4a81a4'
          }
        },
        plugins: [require("tailwind-scrollbar-hide")],
      }
    </script>
    <body>
      <div class="flex flex-col bg-white w-full h-full relative justify-center items-center gap-10 p-10">
      `
    const contentWrapperEnd = `</div></body></html>`
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    const template = hb.compile(
      contentWrapperStart + html + contentWrapperEnd,
      {
        strict: true,
      },
    )
    const result = template({ })
    const htmlResult = result
    await page.setContent(htmlResult)
    await page.setViewport({
      width: 1794,
      height: 1000,
    })

    const imgData = await page.screenshot({
      fullPage: true,
      encoding: "base64",
    });

    const imgWidth = 297;
    const pageHeight = 210;
    const imgHeight = pageNum * pageHeight;

    let heightLeft = imgHeight
    let position = 0

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    })

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight 
    while (heightLeft >= 20) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }
    pdf.save(`${fileName}.pdf`)
    console.log('PDF Generated!!')
    await browser.close()
    return new NextResponse(Buffer.from(
      pdf.output('arraybuffer'),
    ), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}.pdf"`,
      }
    });
  }
  return new NextResponse(null, { status: 405 });
  }
