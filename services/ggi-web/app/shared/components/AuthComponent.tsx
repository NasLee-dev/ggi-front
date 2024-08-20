'use client'

import useSessionStorage from '@/hooks/useSessionSotrage'
import { useGetUserQuery } from 'app/shared/hooks/useGetUserQuery'
import { useSearchParams } from 'next/navigation'
import { fetchQueryString } from 'utils/commons/fetchQueryString'

const AuthComponent = () => {
  const searchParams = useSearchParams()
  const initialData = fetchQueryString(searchParams)
  const token = initialData.token

  const [tokenValue] = useSessionStorage({
    key: 'token',
    initialValue: token as string,
  })

  if (!token) {
    return null
  }
}

export default AuthComponent
