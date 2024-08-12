'use client'
import ReactQueryProviders from 'app/map/components/layout/RootQueryProvider'
import Script from 'next/script'
import InterestContextProvider from 'contexts/useModalContext'
import EmotionProvider from './components/layout/EmotionProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false`

  return (
    <html lang="en">
      <Script src={KAKAO_SDK_URL} strategy="lazyOnload" />
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
