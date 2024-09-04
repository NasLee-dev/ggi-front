import DownloadIcon from '@/app/data-detail/components/AreaDetailContainer/components/DownloadBtn/components/DownloadIcon'

export default function DownloadBtn() {
  return (
    <button className="w-[100px] h-[50px] border border-[#E5E7EB] rounded-2xl flex justify-center gap-[12px] items-center ggi:w-full ggi:mt-5">
      <span className="text-[16px] font-bold text-[#6B7280]">EXCEL</span>
      <DownloadIcon />
    </button>
  )
}
