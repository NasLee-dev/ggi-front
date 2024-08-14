'use client'

import { useDeunggiStore } from '@/store/useDeunggiStore'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function ModeSetter() {
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')

  const { setMode } = useDeunggiStore()

  useEffect(() => {
    if (mode === '등기발행' || mode === '장바구니' || mode === '등기관리')
      setMode(mode)
  }, [mode, setMode])

  return null
}
