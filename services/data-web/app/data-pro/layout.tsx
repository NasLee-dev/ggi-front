'use client'
import React from 'react'
import './global.css'
import Header from './components/Header'
import RootLayoutProvider from './config/RootLayoutProvider'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RootLayoutProvider>
      <Header />
      {children}
    </RootLayoutProvider>
  )
}
