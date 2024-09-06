'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
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
import PdfSoldComponent from './pdf/pdfContents/PdfSoldComponent'
import PdfAnnualComponent from './pdf/pdfContents/PdfAnnualComponent'
import { SearchCondition } from '../../models/Conditions'
import PdfRealComponent from './pdf/pdfContents/PdfRealComponent'
import PdfAnnualTableComponent from './pdf/pdfContents/PdfAnnualTableComponent'

export default function StatisticsPage() {
  const INITIAL_TAB = '매각통계'
  const [activeTab, setActiveTab] = useState(INITIAL_TAB)
  const [isMounted, setIsMounted] = useState(false)
  const isMobile = window.innerWidth < 1080
  const [searchCondition, setSearchCondition] = useState<SearchCondition>({
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

  const handleGetFileName = useCallback(() => {
    return 'myGeneratedPdf'
  }, [])

  const handleDownPC = useCallback(
    (file: Blob) => {
      if (isMobile) return
      const url = window.URL.createObjectURL(file)
      const a = document.createElement('a')
      a.href = url
      a.download = 'myGeneratedPdf.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    },
    [isMobile],
  )

  const handleDownMobile = useCallback(
    (file: Blob) => {
      if (!isMobile) return
      const url = window.URL.createObjectURL(file)
      const a = document.createElement('a')
      a.href = url
      a.download = 'myGeneratedPdf.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    },
    [isMobile],
  )

  const sendHtmlToNode = async () => {
    try {
      const response = await fetch('/api/generatePdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          html: document.getElementById('pdf-zone').innerHTML,
          pageNum: 2,
          fileName: 'myGeneratedPdf',
        }),
      })
      if (!response.ok) {
        throw new Error('PDF 다운로드 실패')
      }
      const blob = await response.blob()
      const file = new Blob([blob], { type: 'application/pdf' })
      const mobileFile = new Blob([blob], { type: 'application/octet-stream' })

      if (isMobile) {
        handleDownMobile(mobileFile)
        return
      } else {
        handleDownPC(file)
        return
      }
    } catch (error) {
      console.error('Error while sending HTML to server:', error.message)
    }
  }

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
    <div className="flex flex-col w-full h-full gap-10 bg-white">
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
            sendImage={sendHtmlToNode}
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
            <RepresentComponent isPdfContent={false} />
            <RealStatistics
              searchCondition={searchCondition}
              activeTab={'실거래통계'}
              isPdfContent={false}
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
      <div id="pdf-zone" className={`flex flex-col bg-white w-full gap-10`}>
        <div className="flex flex-col w-full h-[1000px]">
          <PdfSoldComponent
            activeTab={activeTab}
            searchCondition={searchCondition}
          />
        </div>
        <div className="flex flex-col w-full h-[1000px] gap-5">
          <PdfAnnualComponent activeTab={'매각통계'} />
        </div>
        <div className="flex flex-col w-full h-[1000px]">
          <PdfAnnualTableComponent isPdfContent={true} />
        </div>
        <div className="flex flex-col w-full h-[1000px]">
          <PdfRealComponent searchCondition={searchCondition} />
        </div>
        <div className="flex flex-col w-full h-[1000px] gap-5">
          <PdfAnnualComponent activeTab={'실거래통계'} />
        </div>
      </div>
    </div>
  )
}
