import { ReactNode } from 'react'

interface TableContainerProps {
  children: ReactNode
}

export default function TableContainer({ children }: TableContainerProps) {
  return <div className="w-full overflow-x-auto flex flex-col">{children}</div>
}
