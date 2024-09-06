import { Header } from '@/app/data-pro/models/Table'

interface TableHeaderProps {
  tableHeader: Header
}
export default function TableHeader({ tableHeader }: TableHeaderProps) {
  return (
    <div className="flex flex-row w-full">
      {tableHeader.header.map((header, index) => (
        <div
          key={index}
          className={`flex w-[214px] h-[50px] pt-3 pb-3 pl-5 pr-5 justify-center items-center border-b border-gray-200`}
        >
          <p className="text-gray-500 text-base font-bold font-['NanumGothic'] leading-snug text-center">
            {header.title}
          </p>
        </div>
      ))}
    </div>
  )
}
