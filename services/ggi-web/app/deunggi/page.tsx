'use client'
import Header from 'app/deunggi/components/layout/Header'
import DeunggiSection from './components/DeunggiSection'
import { useSearchParams } from 'next/navigation'

export default function Deunggi() {
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')

  return (
    <>
      <Header />
      <DeunggiSection mode={mode} />
    </>
  )
}
