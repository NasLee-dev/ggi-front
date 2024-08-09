'use client'
import ReactQueryProviders from '@/hooks/useReactQuery'
import Script from 'next/script'
import EmotionProvider from './components/layout/EmotionProvider'
import InterestContextProvider from 'contexts/useModalContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false`

  return (
    <html lang="en">
      <head>
        <meta name="google" content="notranslate" />
        <meta
          name="content-disposition"
          content='attachment; filename="filename.pdf"'
        />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT/fonts/static/woff2/SUIT.css"
        />
        <meta
          name="viewport"
          content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width, minimum-scale=1.0"
        />
        <Script src={KAKAO_SDK_URL} strategy="lazyOnload" />
      </head>
      <body>
        <ReactQueryProviders>
          <EmotionProvider>
            <InterestContextProvider>{children}</InterestContextProvider>
          </EmotionProvider>
          <div id="root-portal" />
          <div id="portal" />
          <div id="portal-root" />
        </ReactQueryProviders>
      </body>
    </html>
  )
}
