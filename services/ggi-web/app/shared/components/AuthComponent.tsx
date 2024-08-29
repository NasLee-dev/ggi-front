'use client'

import useSessionStorage from '@/hooks/useSessionSotrage'
import { useAuthStore } from '@/store/useAuthStore'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { fetchQueryString } from 'utils/commons/fetchQueryString'
import { getToken } from 'utils/commons/getToken'

const AuthComponent = () => {
  const searchParams = useSearchParams()
  const initialData = fetchQueryString(searchParams)
  const initialToken = initialData.token

  const { token, setToken } = useAuthStore()

  const [sessionToken] = useSessionStorage({
    key: 'token',
    initialValue: initialToken as string,
  })

  useEffect(() => {
    const sToken = getToken() as string
    if (sToken) {
      setToken(sessionToken)
    }
  }, [sessionToken, setToken])

  if (!token) {
    return null
  }
}

export default AuthComponent
