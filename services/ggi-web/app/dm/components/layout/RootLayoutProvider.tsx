'use client'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { ReactNode } from 'react'
import GlobalStyle from 'styles/globalStyle'
import ReactQueryProviders from 'app/map/components/layout/RootQueryProvider'
import ChaProvider from './ChaProvider'

const cache = createCache({ key: 'css' })

export default function RootLayoutProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <ReactQueryProviders>
      <CacheProvider value={cache}>
        <ChaProvider>
          <GlobalStyle />
          {children}
          <div id="root-portal"></div>
        </ChaProvider>
      </CacheProvider>
    </ReactQueryProviders>
  )
}
