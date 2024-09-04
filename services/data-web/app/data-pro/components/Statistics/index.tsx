'use client'
import { useEffect, useRef, useState } from 'react'
import { Usage } from '../../constants/Usage'
import TopComponent from './common/Top'
import SearchComponent from './common/search'
import SearchBtn from './common/search/SearchBtn'
import Divider from './common/Divider'
import TabComponent from './common/tab'
import SoldComponent from './soldStatistics'
import RealStatistics from './realStatistics'
import MapComponent from './mapSearch/Map'
import RepresentComponent from './realStatistics/Represent'
import AnnualDataComponent from './common/annual'

export default function StatisticsPage() {
  const INITIAL_TAB = '매각통계'
  const [activeTab, setActiveTab] = useState(INITIAL_TAB)
  const [isMounted, setIsMounted] = useState(false)
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
  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
      handleScroll('tab')
    }
  }, [isMounted])

  return (
    <div className="flex flex-col bg-white w-full h-full gap-[40px] overflow-y-hidden overflow-x-hidden">
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
      <div id="tab" className="flex w-full">
        <TabComponent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleScroll={handleScroll}
        />
      </div>
      {activeTab === '매각통계' && (
        <div id="sold" className="flex flex-col w-full gap-10">
          <SoldComponent
            searchCondition={searchCondition}
            activeTab={'매각통계'}
          />
          <AnnualDataComponent activeTab={'매각통계'} />
        </div>
      )}
      {activeTab === '실거래통계' && (
        <div id="real" className="flex flex-col w-full gap-10">
          <RepresentComponent />
          <RealStatistics
            searchCondition={searchCondition}
            activeTab={'실거래통계'}
          />
          <AnnualDataComponent activeTab={'실거래통계'} />
        </div>
      )}
      {activeTab === '인근사례' && (
        <div id="map">
          <MapComponent />
        </div>
      )}
    </div>
  )
}
