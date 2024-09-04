import { excelDownload } from '@/app/data-pro/utils/excel'
import '../../../../../styles/icon.css'
import { Header } from '@/app/data-pro/models/Table'

export default function DownIcon({
  data,
  tableHeader,
}: {
  data: any[]
  tableHeader: Header
}) {
  return (
    <div
      className="download-container flex flex-row gap-1 w-30 h-[50px] pl-3 pr-3 pt-2 pb-2 justify-center items-center rounded-[16px] border border-[#E5E7EB] cursor-pointer"
      onClick={() => {
        excelDownload({
          data,
          fileName: `경매통계(연간)_${new Date().getTime()}`,
          header: tableHeader,
          condition: {
            location: `서울특별시 용산구 청파동`,
            period: `2023.07 ~ 2024.06`,
            usage: `아파트`,
          },
        })
      }}
    >
      <p className="text-gray-500 text-base font-bold font-['SUIT'] leading-snug">
        다운로드
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
      >
        <path
          d="M17.2992 17.1857H7.69922H17.2992Z"
          className="icon-path"
          fill="#6B7280"
        />
        <path
          d="M17.2992 17.1857H7.69922"
          className="icon-path"
          stroke="#6B7280"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.5564 6.90002V11.0143H17.2992L12.4992 15.8143L7.69922 11.0143H10.4421V6.90002H14.5564Z"
          className="icon-path"
          fill="#6B7280"
          stroke="#6B7280"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
