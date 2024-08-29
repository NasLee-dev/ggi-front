import { SearchCondition } from '@/app/data-pro/models/Common'
import { Dispatch, SetStateAction } from 'react'
import CustomSelect from './CustomSelect'

interface TableComponentProps {
  activeTab: string
  searchCondition: SearchCondition
  setSearchCondition: Dispatch<SetStateAction<SearchCondition>>
}

export default function TableComponent({
  activeTab,
  searchCondition,
}: TableComponentProps) {
  return (
    <div className="flex w-full p-[40px] flex-col items-center rounded-[24px] border border-[#E5E7EB] bg-white">
      <div className="flex flex-col gap-[12px] justify-start w-full h-[60px]">
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-[12px] justify-start w-full h-[60px]">
            <p className="text-gray-800 text-xl font-bold font-['SUIT'] leading-[27px]">
              {activeTab === '매각통계' ? '간단 매각통계' : '실거래 통계'}
            </p>
            <p className="text-blue-600 text-base font-medium font-['SUIT'] leading-snug">
              {'서울특별시 용산구 청파동'} {', '}{' '}
              {'2023.08.01 ~ 2024.07.31 경매매각 건'} {', '}{' '}
              {searchCondition.usage.main.label === '선택안함'
                ? '전체'
                : searchCondition.usage.main.label}{' '}
            </p>
          </div>
          <div className="flex w-[200px] h-[60px]">
            <CustomSelect />
          </div>
        </div>
      </div>
    </div>
  )
}
