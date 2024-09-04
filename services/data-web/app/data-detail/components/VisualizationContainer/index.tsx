'use client'

import ChartContainer from '@/app/data-detail/components/VisualizationContainer/components/ChartContainer'
import ChartCreateBtn from '@/app/data-detail/components/VisualizationContainer/components/ChartCreateBtn'
import MonthlyStatistics from '@/app/data-detail/components/VisualizationContainer/components/MonthlyStatistics'
import ContentBox from '@/app/shared/components/box/ContentBox'
import SubTitle from '@/app/shared/components/text/SubTitle'
import { useState } from 'react'

export default function VisualizationContainer() {
  const [isCreateBox, setCreateBox] = useState(false)

  const handleToggleCreateBox = () => {
    setCreateBox((prev) => !prev)
  }

  return (
    <ContentBox>
      <div className="w-full mb-8 flex justify-between items-center ggi:px-4">
        <SubTitle title="통계 시각화" />
        <ChartCreateBtn handleToggleCreateBox={handleToggleCreateBox} />
      </div>
      <ChartContainer
        isCreateBox={isCreateBox}
        handleToggleCreateBox={handleToggleCreateBox}
      />
      <MonthlyStatistics />
    </ContentBox>
  )
}
