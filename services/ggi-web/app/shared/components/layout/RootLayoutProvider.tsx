'use client'
import { CacheProvider, Global } from '@emotion/react'
import createCache from '@emotion/cache'
import { ReactNode } from 'react'
import GlobalStyle from 'styles/globalStyle'
import ReactQueryProviders from 'app/map/components/layout/RootQueryProvider'
import { ChakraProvider } from '@chakra-ui/react'
import globalStyles from 'app/styles/globalStyles'

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
