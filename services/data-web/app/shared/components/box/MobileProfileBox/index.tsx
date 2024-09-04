'use client'

import ProfileIcon from '@/app/shared/components/box/MobileProfileBox/components/ProfileIcon'
import ProfileModal from '@/app/shared/components/box/MobileProfileBox/components/ProfileModal'
import DropDownIcon from '@/app/shared/components/icons/DropDownIcon'
import { useState } from 'react'

interface MobileProfileBox {
  isFilter?: boolean
  filterClick?: () => void
}
export default function MobileProfileBox({
  isFilter,
  filterClick,
}: MobileProfileBox) {
  const [isProfile, setIsProfile] = useState(false)

  const handleToggleProfile = () => {
    setIsProfile((prev) => !prev)
  }

  return (
    <div className="w-full px-4 py-5 justify-between items-center hidden border-b border-[#E5E7EB] ggi:flex">
      <div className="flex items-center gap-1">
        <h2 className="text-[18px] font-bold text-[#1F2937]">GG프로바이저</h2>
        <button onClick={handleToggleProfile}>
          <ProfileIcon />
        </button>
      </div>
      {isFilter && (
        <button onClick={filterClick}>
          <DropDownIcon />
        </button>
      )}
      {isProfile && <ProfileModal handleToggleProfile={handleToggleProfile} />}
    </div>
  )
}
