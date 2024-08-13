'use client'
import { CacheProvider, Global, ThemeProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { ReactNode } from 'react'
import globalStyles from 'app/styles/globalStyles'
import ReactQueryProviders from 'app/shared/components/layout/ReactQueryProviders'
import theme from 'app/shared/styles/theme'

const cache = createCache({ key: 'css' })

export default function RootLayoutProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <ReactQueryProviders>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <Global styles={globalStyles} />
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
