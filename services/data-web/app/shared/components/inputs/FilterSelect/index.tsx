import Image from 'next/image'

interface FilterSelectProps {
  width?: string
  height?: string
}

export default function FilterSelect({
  width,
  height,
  ...props
}: FilterSelectProps) {
  return (
    <div
      className={`flex items-center ${width ? `w-[${width}]` : 'w-[398px]'} ${height ? `h-[${height}]` : 'h-[50px]'}  border border-[#E5E7EB] rounded-2xl relative`}
    >
      <select
        className="w-full h-full appearance-none outline-none px-4 bg-transparent cursor-pointer"
        {...props}
      >
        <option value="선택1">선택1</option>
      </select>
      <Image
        width={16}
        height={16}
        src="/images/select_icon.png"
        alt="필터 셀레트 아이콘"
        className="absolute top-1/2 -translate-y-1/2 right-2 -z-10"
      />
    </div>
  )
}
