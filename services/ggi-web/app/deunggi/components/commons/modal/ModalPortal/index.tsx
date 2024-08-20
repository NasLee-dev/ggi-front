'use client'

import { ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { ModalContainer } from './style'
import usePreventScroll from 'app/shared/hooks/usePreventScroll'

interface ModalProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

export default function ModalPortal({ children, isOpen, onClose }: ModalProps) {
  usePreventScroll(isOpen)

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
