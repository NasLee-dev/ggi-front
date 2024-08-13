'use client'
import Header from 'app/deunggi/components/layout/Header'
import DeunggiSection from './components/DeunggiSection'
import { Suspense } from 'react'

export default function Deunggi() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <DeunggiSection />
      </Suspense>
    </>
  )
}
