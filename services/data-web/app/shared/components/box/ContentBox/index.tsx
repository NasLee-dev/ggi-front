import { ReactNode } from 'react'

interface ContentBoxProps {
  children: ReactNode
}

export default function ContentBox({ children }: ContentBoxProps) {
  return (
    <div className="w-full p-10 border border-[#E5E7EB] rounded-3xl">
      {children}
    </div>
  )
}
