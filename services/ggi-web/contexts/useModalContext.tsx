import InterestProps from 'app/components/interest'
import React, {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

type ModalProps = ComponentProps<typeof InterestProps>
type ModalOptions = Omit<ModalProps, 'open'>

interface ModalContextValue {
  open: (options: ModalOptions) => void
}

const Context = createContext<ModalContextValue | undefined>(undefined)

const defaultValues: ModalProps = {
  open: false,
  type: '',
  id: '',
  onButtonClick: () => {},
}

export default function InterestContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [interestState, setInterestState] = useState(defaultValues)
  const [element, setElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setElement(document.getElementById('portal-root'))
  }, [])

  const close = useCallback(() => {
    setInterestState(defaultValues)
  }, [])

  const open = useCallback(
    ({ onButtonClick, ...options }: ModalOptions) => {
      setInterestState({
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
  if (!element) {
    return null
  }

  return (
    <Context.Provider value={values}>
      {children}
      {element != null && interestState.open
        ? createPortal(<InterestProps {...interestState} />, element)
        : null}
    </Context.Provider>
  )
}

export function useInterestContext() {
  const values = useContext(Context as React.Context<ModalContextValue>)

  if (values == null) {
    throw new Error(
      'useInterestContext must be used within a InterestContextProvider',
    )
  }
  return values
}
