import { useState } from 'react'
import { TabMenu } from '../../constants/Tab'
import { colors } from '../../styles/collorPallette'

export default function TabComponent() {
  const INITIAL_TAB = '매각통계'
  const [activeTab, setActiveTab] = useState(INITIAL_TAB)

  return (
    <div className="flex w-full h-full justify-center items-center flex-row">
      {TabMenu.map((tab, index) => (
        <div
          key={index}
          className={`flex w-[500px] h-[90px] text-center cursor-pointer items-center justify-center`}
          onClick={() => {
            setActiveTab(tab.label)
          }}
          style={{
            transition: 'border-color 0.3s ease',
            borderBottom: tab.label === activeTab ? '2px solid black' : ``,
          }}
        >
          <p
            className={`text-center ${activeTab === tab.label ? 'text-black' : 'text-gray-400'} text-2xl font-medium font-['Roboto'] leading-[21px] tracking-tight`}
          >
            {tab.label}
          </p>
        </div>
      ))}
    </div>
  )
}
