'use client'

import FilterBox from '@/app/shared/components/box/FilterBox'
import ToggleButton from '@/app/shared/components/buttons/ToggleButton'
import { useState } from 'react'

export default function SearchContainer() {
  const [isToggled, setIsToggled] = useState(false)

  const handleToggle = () => {
    setIsToggled(!isToggled)
  }

  return (
    <div>
      <FilterBox title="경매통계 검색">
        <ToggleButton
          isToggled={isToggled}
          handleToggle={handleToggle}
          buttonTextArrays={['법원', '지역']}
        />
      </FilterBox>
    </div>
  )
}
