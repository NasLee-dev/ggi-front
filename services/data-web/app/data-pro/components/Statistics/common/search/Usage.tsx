import { Usage } from '@/app/data-pro/constants/Usage'
import CustomSelect from './CustomSelect'
import { useState } from 'react'

export default function UsageComponent() {
  const [compare, setCompare] = useState({
    main: Usage[1],
    compare1: Usage[0],
    compare2: Usage[0],
  })

  return (
    <div className="flex flex-col h-[100px] w-[50%] gap-[12px]">
      <div className="flex justify-start w-full">
        <p className="text-gray-800 text-base font-bold font-['NanumGothic'] leading-snug">
          용도
        </p>
      </div>
      <div className="flex flex-row h-[50px] gap-[8px] w-full ">
        <CustomSelect
          options={Usage}
          label="대표"
          compare={compare}
          setCompare={setCompare}
        />
        <CustomSelect
          options={Usage}
          label="비교1"
          compare={compare}
          setCompare={setCompare}
        />
        <CustomSelect
          options={Usage}
          label="비교2"
          compare={compare}
          setCompare={setCompare}
        />
      </div>
    </div>
  )
}
