import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export default function ModalPortal({ children }: any) {
  const [isRendered, setIsRendered] = useState<boolean>(false)

  useEffect(() => {
    setIsRendered(true)
  }, [])

  if (typeof window === 'undefined') return <></>
  if (!isRendered) return <></>

  const node = document.getElementById('root-portal') as Element
  return ReactDOM.createPortal(children, node)
}
