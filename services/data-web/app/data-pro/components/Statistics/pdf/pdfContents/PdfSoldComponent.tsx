import { Option } from '@/app/data-pro/constants/Option'
import CustomSelect from '../../common/table/CustomSelect'
import TableList from '../../common/table/TableList'

export default function PdfSoldComponent({ activeTab, searchCondition }) {
  return (
    <div className="flex flex-col items-start w-full h-full">
      <div className="flex flex-col gap-[12px] justify-start w-full h-[60px]">
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-[12px] justify-start w-full h-[60px]">
            <p className="text-gray-800 text-xl font-bold font-['SUIT'] leading-[27px]">
              간단 매각통계
            </p>
            <p className="text-blue-600 text-base font-medium font-['SUIT'] leading-snug">
              {'서울특별시 용산구 청파동'} {', '}{' '}
              {'2023.08.01 ~ 2024.07.31 경매매각 건'} {', '}{' '}
              {searchCondition.usage.main.label === '선택안함'
                ? '전체'
                : searchCondition.usage.main.label}{' '}
            </p>
          </div>
          <div className="flex w-[200px] h-[50px]">
            <CustomSelect label="기간" option={Option} />
          </div>
        </div>
        <div className="flex w-full h-full">
          <TableList activeTab={activeTab} />
        </div>
      </div>
    </div>
  )
}
