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
    <div className="overflow-x-auto custom-scrollbar">
      <div
        style={{ width: width ? width : '1640px' }}
        className="w-full flex flex-col"
      >
        {children}
      </div>
    </div>
  )
}
