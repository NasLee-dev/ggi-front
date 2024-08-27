import { TabMenu } from '@/app/data-pro/constants/Tab'
import { useState } from 'react'

export default function TabComponent() {
  const INITIAL_TAB = '매각통계'
  const [activeTab, setActiveTab] = useState(INITIAL_TAB)

  return (
    <div className="flex w-full h-[120px] justify-center items-center flex-row">
      {TabMenu.map((tab, index) => (
        <div
          key={index}
          className={`flex flex-1 h-full text-center cursor-pointer items-center justify-center`}
          onClick={() => {
            setActiveTab(tab.label)
          }}
          style={{
            transition: 'border-color 0.3s ease',
            borderBottom: tab.label === activeTab ? '2px solid #2563eb' : ``,
          }}
        >
          <p
            className={`text-center ${activeTab === tab.label ? 'text-[#2563eb]' : 'text-gray-500'} text-xl font-bold font-['SUIT'] leading-[27px] tracking-tight`}
          >
            {tab.label}
          </p>
        </div>
      ))}
    </div>
  )
}
