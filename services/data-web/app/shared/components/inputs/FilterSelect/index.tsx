import SelectIcon from '@/app/shared/components/inputs/FilterSelect/components/SelectIcon'
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
      className={`flex items-center ${width ? `w-[${width}]` : 'w-[398px]'} ${height ? `h-[${height}]` : 'h-[50px]'}  border border-[#E5E7EB] rounded-2xl px-4 cursor-pointer relative`}
    >
      <p className="text-[16px] font-normal text-[#6B7280]">선택안함</p>
      <Image
        width={16}
        height={16}
        src="/images/select_icon.png"
        alt="필터 셀레트 아이콘"
        className="absolute top-1/2 -translate-y-1/2 right-2 -z-10"
      />

      {/* <ul className="absolute top-[62px] left-0 w-full p-2 border border-[#E5E7EB] rounded-2xl z-50 flex flex-col bg-white">
        <li className="relative py-2 pl-12 pr-3 text-[16px] font-normal text-[#6B7280]">
          선택1
          <div className="absolute left-[18px] top-1/2 -translate-y-1/2">
            <SelectIcon />
          </div>
        </li>
      </ul> */}
    </div>
  )
}
