'use client'
import React from 'react'
import './global.css'
import { ThemeProvider } from '@material-tailwind/react'
import Header from './components/Header'
import ReactQueryClientProvider from './config/ReactQueryClientProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReactQueryClientProvider>
      <ThemeProvider>
        {/* @ts-ignore */}
        <html lang="en">
          <head></head>
          <body>
            <Header />
            {children}
          </body>
        </html>
      </ThemeProvider>
    </ReactQueryClientProvider>
  )
}
