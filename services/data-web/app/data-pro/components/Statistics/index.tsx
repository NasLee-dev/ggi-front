'use client'
'use client'
import SearchComponent from './common/search'
import SearchBtn from './common/search/SearchBtn'
import TabComponent from './common/tab'
import TopComponent from './common/Top'

export default function StatisticsPage() {
  return (
    <div
      className="flex flex-col absolute left-[150px] bg-white h-full pl-[40px] pr-[40px] pt-[40px] gap-[40px] overflow-y-auto custom-scrollbar"
      style={{
        width: 'calc(100% - 150px)',
        top: '0px',
      }}
    >
      <TopComponent />
      <SearchComponent />
      <SearchBtn />
      <TabComponent />
    </div>
  )
}
