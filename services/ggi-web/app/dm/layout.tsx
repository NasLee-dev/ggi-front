'use client'

import Header from "./components/layout/Header"
import { DmContainer } from "./components/styles/Boxes"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
      <Header />
      <DmContainer>
        {children}
      </DmContainer>
    </>
  )
}
