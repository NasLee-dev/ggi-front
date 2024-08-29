'use client'

import { useState } from 'react'
import { Usage } from '../../constants/Usage'
import TopComponent from './common/Top'
import SearchComponent from './common/search'
import SearchBtn from './common/search/SearchBtn'
import Divider from './common/Divider'
import TabComponent from './common/tab'
import TableComponent from './common/table'

export default function StatisticsPage() {
  const INITIAL_TAB = '매각통계'
  const [activeTab, setActiveTab] = useState(INITIAL_TAB)
  const [searchCondition, setSearchCondition] = useState({
    keyword: '',
    address: {
      sido: false,
      sigungu: false,
      eupmyeondong: false,
    },
    usage: {
      main: Usage[0],
      compare1: Usage[0],
      compare2: Usage[0],
    },
  })

  return (
    <div
      className="flex flex-col absolute left-[150px] top-0 bg-white h-full pl-[40px] pr-[40px] pt-[40px] gap-[40px] overflow-y-auto custom-scrollbar"
      style={{
        width: 'calc(100% - 150px)',
      }}
    >
      <TopComponent
        keyword={searchCondition.keyword}
        setSearchCondition={setSearchCondition}
      />
      <SearchComponent
        searchCondition={searchCondition}
        setSearchCondition={setSearchCondition}
      />
      <SearchBtn />
      <Divider />
      <TabComponent activeTab={activeTab} setActiveTab={setActiveTab} />
      {(activeTab === '매각통계' || activeTab === '실거래통계') && (
        <TableComponent
          activeTab={activeTab}
          searchCondition={searchCondition}
          setSearchCondition={setSearchCondition}
        />
      )}
    </div>
  )
}
