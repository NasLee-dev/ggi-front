'use client'

import { useDeunggiStore } from '@/store/useDeunggiStore'
import { useEffect } from 'react'

interface ModeSetterProps {
  mode: string | null
}

export default function ModeSetter({ mode }: ModeSetterProps) {
  const { setMode } = useDeunggiStore()

  useEffect(() => {
    if (mode === '등기발행' || mode === '장바구니' || mode === '등기관리')
      setMode(mode)
  }, [mode])

  return null
}
