'use client'

import ChartTest from './ChartTest'
import TabComponent from './shared/Tab'

export default function UI() {
  return (
    <div className="flex w-full h-full pl-[40px] pr-[40px] justify-center items-center flex-col">
      <TabComponent />
      <ChartTest />
    </div>
  )
}
