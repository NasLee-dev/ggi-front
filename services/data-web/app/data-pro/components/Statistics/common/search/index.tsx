import Address from './Address'
import SearchBtn from './SearchBtn'
import UsageComponent from './Usage'

export default function SearchComponent() {
  return (
    <div className="flex flex-col">
      <div className="flex h-[50px] items-center gap-[10px] self-auto rounded-t-[18px] border border-[#E5E7EB] bg-[#F8FAFC] pt-[15px] pb-[15px] pl-[20px]">
        <p className="text-gray-500 text-[15px] font-extrabold font-['SUIT'] leading-tight tracking-tight">
          경매통계 검색
        </p>
      </div>
      <div className="flex flex-row gap-[32px] p-[40px] items-start self-stretch rounded-b-[18px] border border-r-[#E5E7EB] border-b-[#E5E7EB] border-l-[#E5E7EB] bg-white">
        <Address />
        <UsageComponent />
      </div>
    </div>
  )
}
