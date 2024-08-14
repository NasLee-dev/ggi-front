'use client'

import BackLoading from 'app/deunggi/components/commons/loading/BackLoading'
import Header from 'app/deunggi/components/layout/Header'
import { ReactElement, Suspense } from 'react'

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <Header />
      <Suspense fallback={<BackLoading />}>{children}</Suspense>
    </>
  )
}
