import { useCallback, useEffect, useRef } from 'react'

function useDebounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number,
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const debouncedFunction = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        func(...args)
      }, wait)
    },
    [func, wait],
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])
  return debouncedFunction
}

export default useDebounce
