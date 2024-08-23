import Image from 'next/image'

export default function Header() {
  return (
    <header className="w-full h-full">
      <div className="flex w-full h-[88px] pt-[20px] pb-[20px] pl-[24px] pr-[24px] justify-between items-center bg-[#333]">
        <div className="flex flex-row">
          <Image
            src="/images/logo.svg"
            alt="지지옥션"
            width={132}
            height={44}
          />
        </div>
        <button className="w-[85px] h-[48px] bg-[#6b7280] rounded-[8px] text-[15px] font-[700] text-white">
          종료하기
        </button>
      </div>
    </header>
  )
}
