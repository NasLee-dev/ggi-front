'use client'
import { CacheProvider, Global } from '@emotion/react'
import createCache from '@emotion/cache'
import { ReactNode } from 'react'
import globalStyles from 'app/styles/globalStyles'
import ReactQueryProviders from 'app/shared/components/layout/ReactQueryProviders'

const cache = createCache({ key: 'css' })

export default function RootLayoutProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <ReactQueryProviders>
      <CacheProvider value={cache}>
        <Global styles={globalStyles} />
        {children}
        <div id="modal-portal"></div>
        <div id="root-portal" />
        <div id="portal" />
        <div id="portal-root" />
      </CacheProvider>
    </ReactQueryProviders>
  )
}
