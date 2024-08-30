import { ReactNode } from 'react'

interface FilterBoxProps {
  title: string
  children: ReactNode
}

export default function FilterBox({ title, children }: FilterBoxProps) {
  return (
    <div className="w-full border border-[#E5E7EB] rounded-[18px] ">
      <div className="w-full px-[20px] py-[15px] bg-[#F8FAFC] border-b-[1px] border-[#E5E7EB] rounded-t-[18px]">
        <h3 className="text-[15px] font-[800] text-[#6B7280]">{title}</h3>
      </div>
      <div className="w-full p-10">{children}</div>
    </div>
  )
}
