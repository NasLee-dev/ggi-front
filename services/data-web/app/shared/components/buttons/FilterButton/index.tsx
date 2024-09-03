import { ButtonHTMLAttributes, ReactNode } from 'react'

interface FilterButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  name?: string
  text: string | ReactNode
}

export default function FilterButton({
  active,
  text,
  name,
  ...props
}: FilterButtonProps) {
  return (
    <button
      className={`py-[6px] px-2 text-[16px] font-normal ${active ? `text-[#1E40AF]` : 'text-[#6B7280]'}  ${active ? `bg-[#DBEAFE] ` : 'bg-[#F3F4F6]'} rounded-2xl disabled:text-[#D1D5DB]`}
      name={name}
      {...props}
    >
      {text}
    </button>
  )
}
