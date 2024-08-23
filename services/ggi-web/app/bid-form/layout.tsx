'use client'
import Navbar from './components/Navbar'
import './global.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="layout justify-center items-center w-[100%]">
      <Navbar />
      {children}
    </div>
  )
}
