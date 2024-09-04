import { ReactNode } from 'react'

interface PickTextProps {
  text: string | ReactNode
}

export default function PickText({ text }: PickTextProps) {
  return (
    <p className="text-[16px] font-medium text-[#2563EB] ggi:text-[14px] ggi:leading-relaxed">
      {text}
    </p>
  )
}
