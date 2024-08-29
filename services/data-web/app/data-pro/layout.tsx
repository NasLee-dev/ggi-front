'use client'
import React, { useEffect, useState } from 'react'
import './globals.css'
import Header from '@/app/shared/components/layout/Header'
import Sidebar from '@/app/shared/components/layout/SideBar'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) {
    return null
  }
  return (
    <div className="content-area">
      <Header />
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}
