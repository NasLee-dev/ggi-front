import { ReactNode } from 'react'

interface TableContainerProps {
  children: ReactNode
  width?: string
}

export default function TableContainer({
  children,
  width,
}: TableContainerProps) {
  return (
    <div className="overflow-x-auto custom-scrollbar ml-4">
      <div
        style={{ width: width ? width : '1632px' }}
        className="w-full flex flex-col"
      >
        {children}
      </div>
    </div>
  )
}
