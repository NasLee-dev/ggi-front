'use client'
import { useEffect, useState } from 'react'
import StatisticsPage from './Statistics'

export default function UI() {
  const [pathName, setPathName] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathName(window.location.pathname)
    }
  }, [])
  return (
    <main
      className="flex w-full bg-[#F5F5F5] relative"
      style={{
        height: pathName === '/data-pro' ? 'calc(100vh - 88px)' : '100vh',
      }}
    >
      <StatisticsPage />
    </main>
  )
}
