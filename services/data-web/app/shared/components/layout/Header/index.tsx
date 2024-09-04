import MenuIcon from '@/app/shared/components/layout/Header/components/MenuIcon'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="w-full h-[88px] fixed z-[5001] ggi:h-[50px]">
      <div className="flex w-full h-full py-5 px-6 justify-between items-center bg-[#333] ggi:py-2 ggi:px-4">
        <div className="flex items-center gap-[10px]">
          <button className="hidden ggi:block">
            <MenuIcon />
          </button>
          <div className="flex flex-row w-[132px] h-[44px] relative ggi:w-[90px] ggi:h-[30px]">
            <Image src="/images/logo.svg" alt="지지옥션" fill />
          </div>
        </div>
        <button className="w-[85px] h-[48px] bg-[#6b7280] rounded-[8px] text-[15px] font-[700] text-white ggi:hidden">
          종료하기
        </button>
      </div>
    </header>
  )
}
