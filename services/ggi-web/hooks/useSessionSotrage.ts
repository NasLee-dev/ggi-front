'use client'
import { useEffect, useState } from 'react'

interface SessionStorageProps<T> {
  key: string
  initialValue: T
}

const useSessionStorage = <T>({
  key,
  initialValue,
}: SessionStorageProps<T>) => {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const sessionStorageValue = window.sessionStorage.getItem(key)
      return sessionStorageValue
        ? JSON.parse(sessionStorageValue)
        : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  useEffect(() => {
    if (state === initialValue) {
      window.sessionStorage.setItem(key, JSON.stringify(initialValue))
    }
  }, [key, initialValue])

  const setSessionStorage = (value: T) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value))
      setState(value)
    } catch (error) {
      console.error(`Error setting session storage key "${key}":`, error)
    }
  }

  const removeSessionStorage = () => {
    try {
      window.sessionStorage.removeItem(key)
      setState(initialValue)
    } catch (error) {
      console.error(`Error removing session storage key "${key}":`, error)
    }
  }

  return [state, setSessionStorage, removeSessionStorage] as const
}

export default useSessionStorage
