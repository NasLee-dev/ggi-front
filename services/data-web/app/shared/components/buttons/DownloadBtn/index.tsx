import DownloadIcon from '@/app/shared/components/buttons/DownloadBtn/components/DownloadIcon'
import { ButtonHTMLAttributes } from 'react'

interface DownloadBtn extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void
  disabled?: boolean
}

export default function DownloadBtn({
  onClick,
  disabled,
  ...props
}: DownloadBtn) {
  return (
    <button
      className="w-[100px] h-[50px] border border-[#E5E7EB] rounded-2xl flex justify-center gap-[12px] items-center ggi:w-full ggi:mt-5 hover-btn"
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <span className="text-[16px] font-bold text-[#6B7280]">EXCEL</span>
      <DownloadIcon />
    </button>
  )
}
