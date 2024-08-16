'use client'
import { useEffect, useState } from 'react'
import Steps from './components/steps'
import useGetAuth from './components/hooks/useGetAuth'
import { useSetRecoilState } from 'recoil'
import { authInfo } from '@/store/atom/auth'

interface BidFormProps {
  searchParams: {
    idcode?: string | null
    token?: string | null
    mstSeq?: string | null
  }
}

const fetchQueryString = (searchParams: URLSearchParams) => {
  const token = searchParams.get('token')
  const mstSeq = searchParams.get('mstSeq')
  const idCode = searchParams.get('idcode')
  return { token, mstSeq, idCode }
}

export default function BidForm({ searchParams }: BidFormProps) {
  const setAuthInfo = useSetRecoilState(authInfo)
  const initialData = fetchQueryString(
    new URLSearchParams(searchParams as Record<string, string>),
  )
  const [loading, setLoading] = useState(false)
  const { mutate: getAuth } = useGetAuth(
    initialData.token,
    initialData?.idCode,
    initialData?.mstSeq,
  )

  useEffect(() => {
    setLoading(true)
    getAuth()
    setLoading(false)
    setAuthInfo((prev) => ({
      ...prev,
      ...initialData,
    }))
  }, [])

  return <Steps loading={loading} />
}
