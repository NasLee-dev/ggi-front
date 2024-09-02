import { HTMLAttributes } from 'react'

interface FilterButtonProps extends HTMLAttributes<HTMLButtonElement> {
  active?: boolean
  text: string
}

export default function FilterButton({
  active,
  text,
  ...props
}: FilterButtonProps) {
  return (
    <button
      className={`py-[6px] px-2 text-[16px] font-normal ${active ? `text-[#1E40AF]` : 'text-[#6B7280]'}  ${active ? `bg-[#DBEAFE] ` : 'bg-[#F3F4F6] '}rounded-2xl`}
      {...props}
    >
      {text}
    </button>
  )
}
