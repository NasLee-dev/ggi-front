'use client'

import Head from 'next/head'
import DeunggiSection from './components/DeunggiSection'

export default function Deunggi() {
  return (
    <>
      <Head>
        <title>바로등기</title>
        <meta name="description" content="바로등기 서비스" />
      </Head>

      <DeunggiSection />
    </>
  )
}
