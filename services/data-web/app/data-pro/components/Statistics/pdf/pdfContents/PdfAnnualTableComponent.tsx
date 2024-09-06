import { Dummy } from '@/app/data-pro/models/Dummy'
import DownIcon from '../../common/annual/icon/down'
import TableHeader from '../../common/table/T.header'
import AnnualTableBody from '../../common/annual/table/T.body'
import { ANNUAL_HEADER } from '@/app/data-pro/constants/Table'
import { useEffect } from 'react'

interface PdfAnnualTableComponentProps {
  isPdfContent: boolean
}

export default function PdfAnnualTableComponent({
  isPdfContent,
}: PdfAnnualTableComponentProps) {
  const data: Dummy[] = [
    {
      date: '2023.07',
      appraisalTotal: 100000000,
      saleTotal: 100000000,
      salePriceRate: 100,
      progressCount: 100,
      saleCount: 100,
      avgBidCount: 100,
      saleRate: 100,
    },
    {
      date: '2023.08',
      appraisalTotal: 100000000,
      saleTotal: 100000000,
      salePriceRate: 100,
      progressCount: 100,
      saleCount: 100,
      avgBidCount: 100,
      saleRate: 100,
    },
    {
      date: '2023.09',
      appraisalTotal: 100000000,
      saleTotal: 100000000,
      salePriceRate: 100,
      progressCount: 100,
      saleCount: 100,
      avgBidCount: 100,
      saleRate: 100,
    },
    {
      date: '2023.10',
      appraisalTotal: 100000000,
      saleTotal: 100000000,
      salePriceRate: 100,
      progressCount: 100,
      saleCount: 100,
      avgBidCount: 100,
      saleRate: 100,
    },
    {
      date: '2023.11',
      appraisalTotal: 100000000,
      saleTotal: 100000000,
      salePriceRate: 100,
      progressCount: 100,
      saleCount: 100,
      avgBidCount: 100,
      saleRate: 100,
    },
    {
      date: '2023.12',
      appraisalTotal: 100000000,
      saleTotal: 100000000,
      salePriceRate: 100,
      progressCount: 100,
      saleCount: 100,
      avgBidCount: 100,
      saleRate: 100,
    },
    {
      date: '2024.01',
      appraisalTotal: 100000000,
      saleTotal: 100000000,
      salePriceRate: 100,
      progressCount: 100,
      saleCount: 100,
      avgBidCount: 100,
      saleRate: 100,
    },
    {
      date: '2024.02',
      appraisalTotal: 100000000,
      saleTotal: 100000000,
      salePriceRate: 100,
      progressCount: 100,
      saleCount: 100,
      avgBidCount: 100,
      saleRate: 100,
    },
    {
      date: '2024.03',
      appraisalTotal: 100000000,
      saleTotal: 100000000,
      salePriceRate: 100,
      progressCount: 100,
      saleCount: 100,
      avgBidCount: 100,
      saleRate: 100,
    },
    {
      date: '2024.04',
      appraisalTotal: 100000000,
      saleTotal: 100000000,
      salePriceRate: 100,
      progressCount: 100,
      saleCount: 100,
      avgBidCount: 100,
      saleRate: 100,
    },
    {
      date: '2024.05',
      appraisalTotal: 100000000,
      saleTotal: 100000000,
      salePriceRate: 100,
      progressCount: 100,
      saleCount: 100,
      avgBidCount: 100,
      saleRate: 100,
    },
    {
      date: '2024.06',
      appraisalTotal: 100000000,
      saleTotal: 100000000,
      salePriceRate: 100,
      progressCount: 100,
      saleCount: 100,
      avgBidCount: 100,
      saleRate: 100,
    },
    {
      date: '12개월 전체',
      appraisalTotal: 100000000,
      saleTotal: 100000000,
      salePriceRate: 100,
      progressCount: 100,
      saleCount: 100,
      avgBidCount: 100,
      saleRate: 100,
    },
  ]

  const handleDeleteFirstDiv = () => {
    if (!isPdfContent) {
      const firstDiv = document.getElementById('border')
      if (firstDiv) {
        firstDiv.style.border = 'none'
      }
    }
  }

  useEffect(() => {
    handleDeleteFirstDiv()
  }, [])
  return (
    <div
      id="border"
      className={`flex flex-col w-[1714px] h-full p-[40px] bg-white rounded-[24px] gap-8`}
    >
      <div className="flex w-full justify-between">
        <div className="flex w-30 h-[50px] pl-4 pr-4 pt-[14px] pb-[14px] justify-center items-center rounded-[16px] border border-[#E5E7EB] cursor-pointer">
          <p className="text-gray-800 text-lg font-bold font-['SUIT'] leading-normal">
            월 평균
          </p>
        </div>
        <DownIcon data={data} tableHeader={ANNUAL_HEADER} />
      </div>
      <div className="flex flex-col w-full h-full">
        <TableHeader tableHeader={ANNUAL_HEADER} />
        <AnnualTableBody data={data} />
      </div>
    </div>
  )
}
