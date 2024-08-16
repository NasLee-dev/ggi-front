'use client'
import { CacheProvider, Global, ThemeProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { ReactNode } from 'react'
import globalStyles from 'app/styles/globalStyles'
import ReactQueryProviders from 'app/shared/components/layout/ReactQueryProviders'
import theme from 'app/shared/styles/theme'
import Script from 'next/script'

const cache = createCache({ key: 'css' })

export default function RootLayoutProvider({
  children,
}: {
  children: ReactNode
}) {
  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false`
  return (
    <ReactQueryProviders>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <Global styles={globalStyles} />
          <Script src={KAKAO_SDK_URL} strategy="lazyOnload" />
          {children}
          <div id="modal-portal"></div>
          <div id="root-portal" />
          <div id="portal" />
          <div id="portal-root" />
        </ThemeProvider>
      </CacheProvider>
    </ReactQueryProviders>
  )
}
