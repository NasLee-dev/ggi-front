'use client'

import { ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { ModalContainer } from './style'

interface ModalProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

export default function ModalPortal({ children, isOpen, onClose }: ModalProps) {
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

  if (!isOpen) return null

  const modalRoot = document.getElementById('modal-portal')

  if (!modalRoot) {
    console.error("Modal root element with id 'modal-portal' not found.")
    return null
  }

  return ReactDOM.createPortal(
    <ModalContainer onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </ModalContainer>,
    modalRoot,
  )
}
