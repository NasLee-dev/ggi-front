import { Usage } from '@/app/data-pro/constants/Usage'
import TopComponent from '../../common/annual/top'
import CustomSelect from '../../common/table/CustomSelect'
import SummaryComponent from '../../common/annual/summary'
import ChartComponent from '../../common/annual/chart'
interface PdfAnnualComponentProps {
  activeTab: string
}

export default function PdfAnnualComponent({
  activeTab,
}: PdfAnnualComponentProps) {
  return (
    <>
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
        className={`flex ${activeTab === '매각통계' && 'flex-row gap-10'} w-full h-[600px]`}
      >
        <ChartComponent activeTab={activeTab} />
      </div>
    </>
  )
}
