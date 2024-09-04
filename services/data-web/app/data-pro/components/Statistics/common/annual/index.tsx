import { Usage } from '@/app/data-pro/constants/Usage'
import CustomSelect from '../table/CustomSelect'
import SummaryComponent from './summary'
import TopComponent from './top'
import ChartComponent from './chart'
import TableHeader from '../table/T.header'
import { AnnualHeader } from '@/app/data-pro/constants/Table'
import AnnualTableBody from './table/T.body'
import DownIcon from './icon/down'
import { Dummy } from '@/app/data-pro/models/Dummy'

interface AnnualDataComponentProps {
  activeTab: string
}

export default function AnnualDataComponent({
  activeTab,
}: AnnualDataComponentProps) {
  const data: Dummy[] = [
    {
      year: '2023.07',
      appraisalSum: 100000000,
      auctionSum: 100000000,
      auctionRate: 100,
      progressCount: 100,
      auctionCount: 100,
      avgBidCount: 100,
      auctionRate2: 100,
    },
    {
      year: '2023.08',
      appraisalSum: 100000000,
      auctionSum: 100000000,
      auctionRate: 100,
      progressCount: 100,
      auctionCount: 100,
      avgBidCount: 100,
      auctionRate2: 100,
    },
    {
      year: '2023.09',
      appraisalSum: 100000000,
      auctionSum: 100000000,
      auctionRate: 100,
      progressCount: 100,
      auctionCount: 100,
      avgBidCount: 100,
      auctionRate2: 100,
    },
    {
      year: '2023.10',
      appraisalSum: 100000000,
      auctionSum: 100000000,
      auctionRate: 100,
      progressCount: 100,
      auctionCount: 100,
      avgBidCount: 100,
      auctionRate2: 100,
    },
    {
      year: '2023.11',
      appraisalSum: 100000000,
      auctionSum: 100000000,
      auctionRate: 100,
      progressCount: 100,
      auctionCount: 100,
      avgBidCount: 100,
      auctionRate2: 100,
    },
    {
      year: '2023.12',
      appraisalSum: 100000000,
      auctionSum: 100000000,
      auctionRate: 100,
      progressCount: 100,
      auctionCount: 100,
      avgBidCount: 100,
      auctionRate2: 100,
    },
    {
      year: '2024.01',
      appraisalSum: 100000000,
      auctionSum: 100000000,
      auctionRate: 100,
      progressCount: 100,
      auctionCount: 100,
      avgBidCount: 100,
      auctionRate2: 100,
    },
    {
      year: '2024.02',
      appraisalSum: 100000000,
      auctionSum: 100000000,
      auctionRate: 100,
      progressCount: 100,
      auctionCount: 100,
      avgBidCount: 100,
      auctionRate2: 100,
    },
    {
      year: '2024.03',
      appraisalSum: 100000000,
      auctionSum: 100000000,
      auctionRate: 100,
      progressCount: 100,
      auctionCount: 100,
      avgBidCount: 100,
      auctionRate2: 100,
    },
    {
      year: '2024.04',
      appraisalSum: 100000000,
      auctionSum: 100000000,
      auctionRate: 100,
      progressCount: 100,
      auctionCount: 100,
      avgBidCount: 100,
      auctionRate2: 100,
    },
    {
      year: '2024.05',
      appraisalSum: 100000000,
      auctionSum: 100000000,
      auctionRate: 100,
      progressCount: 100,
      auctionCount: 100,
      avgBidCount: 100,
      auctionRate2: 100,
    },
    {
      year: '2024.06',
      appraisalSum: 100000000,
      auctionSum: 100000000,
      auctionRate: 100,
      progressCount: 100,
      auctionCount: 100,
      avgBidCount: 100,
      auctionRate2: 100,
    },
    {
      year: '12개월 전체',
      appraisalSum: 100000000,
      auctionSum: 100000000,
      auctionRate: 100,
      progressCount: 100,
      auctionCount: 100,
      avgBidCount: 100,
      auctionRate2: 100,
    },
  ]
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
        className={`flex ${activeTab === '매각통계' && 'flex-row gap-10'} w-full h-[600px]`}
      >
        <ChartComponent activeTab={activeTab} />
      </div>
      {activeTab === '매각통계' && (
        <>
          <div className="flex w-full justify-between">
            <div className="flex w-30 h-[50px] pl-4 pr-4 pt-[14px] pb-[14px] justify-center items-center rounded-[16px] border border-[#E5E7EB] cursor-pointer">
              <p className="text-gray-800 text-lg font-bold font-['SUIT'] leading-normal">
                월 평균
              </p>
            </div>
            <DownIcon data={data} tableHeader={AnnualHeader} />
          </div>
          <div className="flex flex-col w-full h-full">
            <TableHeader tableHeader={AnnualHeader} />
            <AnnualTableBody data={data} />
          </div>
        </>
      )}
    </div>
  )
}
