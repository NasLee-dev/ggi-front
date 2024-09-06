import { useModalContext } from '@/app/data-pro/context/useModalContext'
import '../../../../styles/icon.css'
import SelectPdf from '../../pdf/SelectPdf'

export default function Pdf({ sendImage }: { sendImage: () => void }) {
  const { open } = useModalContext()
  return (
    <div
      className="print-container flex flex-row gap-1 w-[120px] px-3 py-2 border border-gray-100 justify-center items-center h-full self-stretch bg-white  rounded-full cursor-pointer"
      onClick={() => {
        open({
          title: '다운로드 받을 항목을 선택하세요(PDF)',
          onButtonClick: () => {
            sendImage()
          },
          width: 600,
          height: 430,
          buttonLabel: '선택완료',
          children: <SelectPdf />,
        })
      }}
    >
      <p className="text-gray-500 text-base font-bold font-['SUIT'] leading-snug">
        PDF
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
