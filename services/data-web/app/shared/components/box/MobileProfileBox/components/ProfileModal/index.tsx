import CancelWhiteIcon from '@/app/shared/components/icons/CancelWhiteIcon'
import QuestionIcon from '@/app/shared/components/icons/QuestionIcon'
import { MouseEvent } from 'react'

interface ProfileModalProps {
  handleToggleProfile: () => void
}

export default function ProfileModal({
  handleToggleProfile,
}: ProfileModalProps) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleToggleProfile()
    }
  }

  return (
    <div
      className="w-full h-screen fixed top-0 left-0 right-0 bottom-0 z-[5000] backdrop-brightness-50"
      onClick={handleBackdropClick}
    >
      <div className="w-[340px] p-6 rounded-2xl bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-full flex justify-between items-end mb-4">
          <h3 className="text-[16px] font-extrabold text-[#1F2937]">ID님</h3>
          <p className="text-[16px] font-normal text-[#6B7280]">
            yyyy.mm.dd ~ yyyy.mm.dd
          </p>
        </div>
        <div className="w-full p-4 border border-[#E5E7EB] bg-[#F8FAFC] rounded-2xl">
          <div className="mb-3 flex items-center gap-1">
            <span>잔여갯수</span>
            <button>
              <QuestionIcon />
            </button>
          </div>
          <p className="text-[16px] font-bold text-[#6B7280]">
            <span className="text-[#2563EB]">일 ???개</span> / 월 ???개
          </p>
        </div>
        <button
          className="flex items-center gap-1 absolute left-1/2 -translate-x-1/2 -bottom-[45px]"
          onClick={handleToggleProfile}
        >
          <span className="text-[20px] font-bold text-white">닫기</span>
          <CancelWhiteIcon />
        </button>
      </div>
    </div>
  )
}
