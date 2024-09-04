import ProfileIcon from '@/app/shared/components/box/MobileProfileBox/components/ProfileIcon'
import DropDownIcon from '@/app/shared/components/icons/DropDownIcon'

export default function MobileProfileBox() {
  return (
    <div className="w-full px-4 py-5 justify-between items-center hidden border-b border-[#E5E7EB] ggi:flex">
      <div className="flex items-center gap-1">
        <h2 className="text-[18px] font-bold text-[#1F2937]">GG프로바이저</h2>
        <button>
          <ProfileIcon />
        </button>
      </div>
      <button>
        <DropDownIcon />
      </button>
    </div>
  )
}
