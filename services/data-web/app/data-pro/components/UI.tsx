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
    <main className="flex w-full h-full bg-[#F5F5F5] relative">
      <StatisticsPage />
    </main>
  )
}
