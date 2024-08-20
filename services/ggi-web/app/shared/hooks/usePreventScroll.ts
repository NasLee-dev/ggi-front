import { useEffect } from 'react'

const usePreventScroll = (isOpen: boolean): void => {
  useEffect(() => {
    const preventScroll = (e: Event): void => {
      e.preventDefault()
      e.stopPropagation()
    }

    if (isOpen) {
      document.body.addEventListener('wheel', preventScroll, { passive: false })
      document.body.addEventListener('touchmove', preventScroll, {
        passive: false,
      })
    } else {
      document.body.removeEventListener('wheel', preventScroll)
      document.body.removeEventListener('touchmove', preventScroll)
    }

    return () => {
      document.body.removeEventListener('wheel', preventScroll)
      document.body.removeEventListener('touchmove', preventScroll)
    }
  }, [isOpen])
}

export default usePreventScroll
