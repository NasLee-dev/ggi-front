'use client'

import { useState } from 'react'
import { Usage } from '../../constants/Usage'
import TopComponent from './common/Top'
import SearchComponent from './common/search'
import SearchBtn from './common/search/SearchBtn'
import Divider from './common/Divider'
import TabComponent from './common/tab'
import TableComponent from './common/table'
import MapComponent from './mapSearch/Map'
import RepresentComponent from './realStatistics/Represent'
import AnnualDataComponent from './soldStatistics/AnnualData'

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
    <div className="flex flex-col bg-white w-full h-full gap-[40px] overflow-y-hidden overflow-x-hidden custom-scrollbar">
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
      {activeTab === '실거래통계' && <RepresentComponent />}
      <TabComponent activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === '매각통계' || activeTab === '실거래통계' ? (
        <>
          <TableComponent
            activeTab={activeTab}
            searchCondition={searchCondition}
            setSearchCondition={setSearchCondition}
          />
          <AnnualDataComponent />
        </>
      ) : (
        <MapComponent />
      )}
    </div>
  )
}
