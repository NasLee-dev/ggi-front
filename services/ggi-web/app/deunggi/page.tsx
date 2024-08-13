'use client'
import Header from 'app/deunggi/components/layout/Header'
import DeunggiSection from './components/DeunggiSection'
import { Suspense } from 'react'
import BackLoading from 'app/deunggi/components/commons/loading/BackLoading'

export default function Deunggi() {
  return (
    <>
      <Header />
      <Suspense fallback={<BackLoading />}>
        <DeunggiSection />
      </Suspense>
    </>
  )
}
