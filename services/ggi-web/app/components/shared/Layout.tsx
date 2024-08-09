'use client'
import SEO from './SEO'
import Head from 'next/head'
// import Navbar from '../bidForm/Navbar'

function Layout({
  children,
  lastPathPart,
}: {
  children: React.ReactNode
  lastPathPart: string
}) {
  return (
    <div>
      {lastPathPart === 'bid-form' ? // <Navbar />
      null : (
        <>
          <SEO title="지지옥션-지도검색" description="지도 검색" image="" />
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
        </>
      )}
      {children}
    </div>
  )
}

export default Layout
