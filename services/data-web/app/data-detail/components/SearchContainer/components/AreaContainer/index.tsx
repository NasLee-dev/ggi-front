import ToggleButton from '@/app/shared/components/buttons/ToggleButton'
import FilterTitle from '@/app/shared/components/text/FilterTitle'
import { useState } from 'react'

export default function AreaContainer() {
  const [isToggled, setIsToggled] = useState(false)

  const handleToggle = () => {
    setIsToggled(!isToggled)
  }

  return (
    <div>
      <FilterTitle title="검색지역" />
      <ToggleButton
        isToggled={isToggled}
        handleToggle={handleToggle}
        buttonTextArrays={['법원', '지역']}
      />
    </div>
  )
}
