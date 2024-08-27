'use client'
import React from 'react'
import ReactQueryClientProvider from './ReactQueryClientProvider'
import { ThemeProvider } from './material-tailwind-theme-provider'

export default function RootLayoutProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReactQueryClientProvider>
      <ThemeProvider>
        <>{children}</>
      </ThemeProvider>
    </ReactQueryClientProvider>
  )
}
