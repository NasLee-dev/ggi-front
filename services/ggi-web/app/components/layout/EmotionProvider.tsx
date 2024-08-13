'use client'
import { CacheProvider, Global } from '@emotion/react'
import createCache from '@emotion/cache'
import { ReactNode } from 'react'
import globalStyles from 'app/styles/globalStyles'

const cache = createCache({ key: 'css' })

export default function EmotionProvider({ children }: { children: ReactNode }) {
  return (
    <CacheProvider value={cache}>
      <Global styles={globalStyles} />
      {children}
    </CacheProvider>
  )
}
