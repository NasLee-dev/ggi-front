'use client'
import React from 'react'
import ReactQueryClientProvider from './ReactQueryClientProvider'
import { ThemeProvider } from '@material-tailwind/react'

export default function RootLayoutProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReactQueryClientProvider>
      <ThemeProvider>
        <div>{children}</div>
      </ThemeProvider>
    </ReactQueryClientProvider>
  )
}
