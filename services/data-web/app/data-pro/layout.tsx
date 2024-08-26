'use client'
import React from 'react'
import './globals.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ReactQueryClientProvider from './config/ReactQueryClientProvider'
import { ThemeProvider } from './config/material-tailwind-theme-provider'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryClientProvider>
      <ThemeProvider>
        <div className="app-layout">
          <Header />
          <Sidebar />
          <div className="content-area">
            <main>{children}</main>
          </div>
        </div>
      </ThemeProvider>
    </ReactQueryClientProvider>
  )
}
