// components/EmotionProvider.tsx
'use client'

import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { ReactNode } from 'react'
import GlobalStyle from 'styles/globalStyle'

const cache = createCache({ key: 'css' })

export default function EmotionProvider({ children }: { children: ReactNode }) {
  return (
    <CacheProvider value={cache}>
      <GlobalStyle />
      {children}
    </CacheProvider>
  )
}
