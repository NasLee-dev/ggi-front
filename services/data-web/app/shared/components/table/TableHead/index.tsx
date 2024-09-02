import { ReactNode } from 'react'

interface TableHeadProps {
  width: string
  text: string | ReactNode
}

export default function TableHead({ width, text }: TableHeadProps) {
  return (
    <li
      style={{ width }}
      className="h-[62px] text-[16px] font-bold text-[#6B7280] flex justify-center items-center text-center"
    >
      {text}
    </li>
  )
}
