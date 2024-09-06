'use client'
import {
  createContext,
  ComponentProps,
  useState,
  useCallback,
  useMemo,
  useContext,
} from 'react'
import { createPortal } from 'react-dom'
import CommonModalComponent from '../components/modal/CommonModal'

type ModalProps = ComponentProps<typeof CommonModalComponent>
type ModalOptions = Omit<ModalProps, 'open'>

interface ModalContextValue {
  open: (options: ModalOptions) => void
}

const Context = createContext<ModalContextValue | undefined>(undefined)

const defaultValues: ModalProps = {
  open: false,
  title: '',
  description: '',
  buttonLabel: '',
  onButtonClick: () => {},
  width: '',
  height: '',
}

export function ModalContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [modalState, setModalState] = useState(defaultValues)

  const $portal_root =
    typeof window === 'undefined'
      ? null
      : document.getElementById('portal-root')

  const close = useCallback(() => {
    setModalState(defaultValues)
  }, [])

  const open = useCallback(
    ({ onButtonClick, ...options }: ModalOptions) => {
      setModalState({
        ...options,
        onButtonClick: () => {
          close()
          onButtonClick()
        },
        open: true,
      })
    },
    [close],
  )

  const values = useMemo(() => ({ open }), [open])
  return (
    <Context.Provider value={values}>
      {children}
      {$portal_root != null
        ? createPortal(<CommonModalComponent {...modalState} />, $portal_root)
        : null}
    </Context.Provider>
  )
}

export function useModalContext() {
  const values = useContext(Context)
  if (values === null) {
    throw new Error('ModalContextProvider 내부에서 사용!!!')
  }
  return values
}
