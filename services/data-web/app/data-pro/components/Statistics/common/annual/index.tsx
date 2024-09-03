import { Usage } from '@/app/data-pro/constants/Usage'
import CustomSelect from '../table/CustomSelect'
import SummaryComponent from './summary'
import TopComponent from './top'
import ChartComponent from './chart'
import { useState } from 'react'

interface AnnualDataComponentProps {
  activeTab: string
}

export default function AnnualDataComponent({
  activeTab,
}: AnnualDataComponentProps) {
  return (
    <div className="flex flex-col w-[1714px] h-full p-[40px] border border-[#E5E7EB] bg-white rounded-[24px] gap-8">
      <div className="flex justify-between w-full">
        <TopComponent />
        <div className="flex w-[270px] h-[50px]">
          <CustomSelect
            label="용도"
            option={Usage.filter((usage) => usage.label !== '선택안함')}
            width="270"
            height="50"
          />
        </div>
      </div>
      <SummaryComponent />
      <div
        className={`flex ${activeTab === '매각통계' ? 'flex-row gap-10' : ''} w-full h-[600px]`}
      >
        <ChartComponent activeTab={activeTab} />
      </div>
    </div>
  )
}
