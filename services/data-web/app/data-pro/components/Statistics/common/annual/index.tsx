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
import { useRef } from 'react'
import domtoimage from 'dom-to-image'
import axios from 'axios'

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
  const chartRef = useRef(null)

  const sendImage = async () => {
    try {
      // `chartRef`는 해당 DOM 요소를 참조하는 React ref 객체입니다.
      const blob = await domtoimage.toBlob(chartRef.current)

      const formData = new FormData()
      formData.append('file', blob, 'chart.png') // 이미지 Blob과 파일 이름 설정

      const response = await axios.post(
        'http://localhost:8000/api/generateDataPDF',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      if (response.status === 200) {
        console.log('success')
      }
    } catch (error) {
      console.error('Error sending image:', error)
    }
    // try {
    //   // DOM 요소를 Blob으로 변환
    //   const blob = await domtoimage.toBlob(chartRef.current)
    //   // Blob을 URL로 변환
    //   const link = document.createElement('a')
    //   link.href = URL.createObjectURL(blob)
    //   link.download = 'chart.png' // 다운로드할 이미지 파일 이름
    //   link.click() // 링크 클릭하여 다운로드 트리거
    //   URL.revokeObjectURL(link.href) // URL 해제
    // } catch (error) {
    //   console.error('Error downloading image:', error)
    // }
  }

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
        ref={chartRef}
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
            <DownIcon
              data={data}
              tableHeader={AnnualHeader}
              sendImage={sendImage}
            />
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
