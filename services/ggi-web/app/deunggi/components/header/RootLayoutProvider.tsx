'use client'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { ReactNode } from 'react'
import GlobalStyle from 'styles/globalStyle'
import ReactQueryProviders from 'app/map/components/layout/RootQueryProvider'
import { ChakraProvider } from '@chakra-ui/react'

const cache = createCache({ key: 'css' })

export default function RootLayoutProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <ReactQueryProviders>
      <CacheProvider value={cache}>
        <ChakraProvider>
          <GlobalStyle />
          {children}
          <div id="modal-portal"></div>
        </ChakraProvider>
      </CacheProvider>
    </ReactQueryProviders>
  )
}
