import { TabMenu } from '@/app/data-pro/constants/Tab'
import { Dispatch, SetStateAction } from 'react'
import Print from './Print'

interface TabComponentProps {
  activeTab: string
  setActiveTab: Dispatch<SetStateAction<string>>
  handleScroll: (id: string) => void
}

export default function TabComponent({
  activeTab,
  setActiveTab,
  handleScroll,
}: TabComponentProps) {
  return (
    <div className="flex w-full h-[45px] justify-center items-center flex-row">
      {TabMenu.map((tab, index) => (
        <div
          key={index}
          className={`flex flex-1 w-[30%] h-full text-center cursor-pointer items-center justify-center`}
          onClick={() => {
            setActiveTab(tab.label)
            setTimeout(() => {
              handleScroll('tab')
            }, 100)
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
      <div className="flex justify-end w-[10%] h-full">
        <Print />
      </div>
    </div>
  )
}
