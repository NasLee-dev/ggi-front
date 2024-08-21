import { SearchResultType } from 'app/bid-form/models/Search'
import { biddingInfoState, stepState } from '@/store/atom/bid-form'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useSearchApi } from './hooks/useSearchApi'
import Spinner from '../icons/Spinner'
import Button from '../shared/Button'
import { authInfo } from '@/store/atom/auth'

export default function SearchIpchal() {
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [loading, setLoading] = useState<boolean>(false)
  const [getCase, setGetCase] = useState<string>(
    new Date().getFullYear().toString(),
  )
  const [getAuction, setGetAuction] = useState<string | null>(null)
  const [searchResult, setSearchResult] = useState<number>(1)
  const [getData, setGetData] = useState<SearchResultType[] | null>(null)
  const auth = useRecoilValue(authInfo)
  const { searchCases, checkCases } = useSearchApi()

  const handleSearch = async (caseNum: string, auctionNum: string) => {
    if (auctionNum === '') {
      alert('사건번호를 입력해 주세요.')
      return
    }
    setLoading(true)
    try {
      const cases = await searchCases.mutateAsync({ caseNum, auctionNum })
      if (cases.length > 0) {
        setGetData(cases)
        setBiddingInfo((prev) => ({
          ...prev,
          searchResults: cases,
        }))
        setSearchResult(2)
      } else {
        setGetData(null)
        setSearchResult(3)
      }
    } catch (error) {
      console.error(error)
      setSearchResult(3)
    } finally {
      setLoading(false)
    }
  }

  const handleSearchResult = async (
    infoId: string,
    caseNo: string,
    mulSeq: string,
  ) => {
    setLoading(true)
    try {
      const response = await checkCases.mutateAsync({ infoId, caseNo, mulSeq })
      if (response) {
        setBiddingInfo((prev) => ({
          ...prev,
          ...response,
        }))
        setLoading(false)
        setStateNum(stateNum + 1)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handlePrevButton = () => {
    if (searchResult === 2) {
      setSearchResult(1)
    } else if (searchResult === 3) {
      setSearchResult(1)
    } else {
      setStateNum(stateNum - 1)
    }
  }

  const handleNextButton = (
    number: number,
    infoId: string,
    caseNo: string,
    mulSeq: string,
  ) => {
    if (
      number === 1 &&
      (getAuction === '' || getAuction === null || getAuction === undefined)
    ) {
      alert('사건번호를 입력해 주세요.')
      return
    } else if (
      number === 1 &&
      getAuction !== '' &&
      getAuction !== null &&
      getAuction !== undefined
    ) {
      handleSearch(getCase, getAuction ?? '')
    } else if (number === 2) {
      if (getData?.length === 1) {
        handleSearchResult(infoId, caseNo, mulSeq)
      } else {
        alert('검색결과가 2건 이상입니다. 검색 결과를 클릭해주세요.')
      }
    } else if (number === 3) {
      alert('검색결과가 없습니다. 이전 버튼을 눌러 다시 검색해주세요.')
    } else {
      setStateNum(stateNum + 1)
    }
  }

  const date = new Date()
  const nowDate =
    date.getFullYear().toString() +
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1
    ).toString() +
    date.getDate().toString()

  useEffect(() => {
    //  1. 중간 저장을 통해서 접속 후 다시 되돌아간 경우
    if (auth.mstSeq) {
      setGetCase(biddingInfo.caseYear)
      setGetAuction(biddingInfo.caseDetail)
      handleSearch(biddingInfo.caseYear, biddingInfo.caseDetail)
    } else if (
      biddingInfo.searchResults.length > 0 &&
      biddingInfo.searchResultState === 2
    ) {
      // 2. 중간 저장이 아닌 처음부터 시작하여 되돌아간 경우
      setGetCase(biddingInfo.caseYear)
      setGetAuction(biddingInfo.caseDetail)
      setGetData(biddingInfo.searchResults as SearchResultType[])
      setSearchResult(2)
    } else if (
      biddingInfo.searchResultState === 1 &&
      biddingInfo.searchResults.length === 0
    ) {
      // 3. 검색 결과가 없는 경우
      setGetCase(biddingInfo.selectedCase)
    } else {
      // 4. 검색 결과가 있는 경우
      setGetCase(biddingInfo.caseYear)
      setGetAuction(biddingInfo.caseDetail)
      setSearchResult(1)
    }
  }, [])
  console.log(stateNum)
  const renderContent = () => {
    if (loading) return <Spinner />
    switch (searchResult) {
      case 1:
        return (
          <>
            <div className="flex flex-row md:w-[498px] w-[90%] h-[200px] md:mt-[200px] mt-[130px] justify-center items-center absolute overflow-auto">
              <div className="flex flex-row gap-[10px] items-center">
                <label htmlFor="yearSelect" className="sr-only">
                  Select Year
                </label>
                <select
                  id="yearSelect"
                  aria-placeholder="YYYY"
                  className="border-gray border md:w-[136px] w-[90px] md:h-[46px] h-[30px] rounded-lg text-sutTitle outline-myBlue md:text-[20px] text-[16px] leading-[150%] tracking-[-1%] text-right pr-1"
                  onChange={(e) => {
                    setGetCase(e.target.value)
                  }}
                  value={getCase}
                >
                  {Array.from({
                    length:
                      parseInt(nowDate.substring(4, 6)) < 11
                        ? parseInt(nowDate.substring(0, 4)) - 1994 + 1
                        : parseInt(nowDate.substring(0, 4)) - 1994 + 2,
                  }).map((_, index) => (
                    <option
                      key={index}
                      value={
                        parseInt(nowDate.substring(4, 6)) < 11
                          ? parseInt(nowDate.substring(0, 4)) - index
                          : parseInt(nowDate.substring(0, 4)) + 1 - index
                      }
                    >
                      {parseInt(nowDate.substring(4, 6)) < 11
                        ? parseInt(nowDate.substring(0, 4)) - index
                        : parseInt(nowDate.substring(0, 4)) + 1 - index}
                    </option>
                  ))}
                </select>
                <span className="font-['suit'] font-semibold md:text-[22.5px] text-[16px] leading-[135%] tracking-[-1%]">
                  타경
                </span>
                <label htmlFor="auctionInput" className="sr-only">
                  Auction Number
                </label>
                <input
                  id="auctionInput"
                  type="text"
                  className="border-gray border md:w-[172px] w-[120px] md:h-[46px] h-[30px] rounded-lg outline-myBlue font-['suit'] md:text-[20px] text-[16px] leading-[150%] tracking-[-1%] p-[10px] text-right text-sutTitle"
                  value={getAuction || ''}
                  onChange={(e) => setGetAuction(e.target.value)}
                  placeholder="사건번호 (ex.10522)"
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(getCase, getAuction || '')
                    }
                  }}
                  inputMode="numeric"
                />
              </div>
              <div
                className="md:w-[63.5px] md:h-[46px] w-[40px] h-[30px] bg-myBlue flex justify-center items-center cursor-pointer rounded-lg ml-[10px]"
                onClick={() => {
                  handleSearch(getCase, getAuction || '')
                }}
              >
                <span className="text-white font-bold font-['suit'] md:text-[20px] text-[16px] leading-[135%] tracking-[-2%]">
                  검색
                </span>
              </div>
            </div>
          </>
        )
      case 2:
        if ((getData?.length as number) > 0) {
          return (
            <div className="flex flex-col justify-start items-center md:w-[550px] w-[90%] md:h-[500px] h-[400px] overflow-y-auto gap-[10px] mt-[30px]">
              {getData?.map((data: any, index: number) => (
                <div
                  className="flex flex-col md:w-[500px] w-[90%] bg-white md:h-[110px] h-[170px] items-center rounded-lg md:p-[15px] p-[10px] cursor-pointer relative"
                  key={index}
                >
                  <div
                    className={`w-[100%] h-[100%] flex flex-col`}
                    onClick={() => {
                      handleSearchResult(data.infoId, data.caseNo, data.mulSeq)
                    }}
                  >
                    <div className="flex flex-row w-[100%] gap-[0px]">
                      <span className="md:text-[18px] text-[15px] font-['suit'] font-bold text-myOrange text-left leading-[135%] tracking-[-1%]">
                        {data.reqCourtName + '계'}
                      </span>
                      <span
                        className="md:text-[18px] text-[15px] font-['suit'] font-bold text-left leading-[135%] tracking-[-1%]"
                        style={{
                          color: '#181826',
                        }}
                      >
                        &nbsp;
                        {data.caseNoString +
                          '[' +
                          (data.mulNo ? data.mulNo : '1') +
                          ']' +
                          (data.subCaseNoString
                            ? '[' + data.subCaseNoString + ']'
                            : '')}
                      </span>
                      <span
                        className="hidden md:flex md:text-[18px] text-[15px] font-['suit'] font-bold text-left leading-[135%] tracking-[-1%]"
                        style={{
                          color: '#181826',
                        }}
                      >
                        {data.usage}
                      </span>
                    </div>
                    <span
                      className="md:hidden flex md:text-[18px] text-[15px] font-['suit'] font-bold text-left leading-[135%] tracking-[-1%]"
                      style={{
                        color: '#181826',
                      }}
                    >
                      {data.usage}
                    </span>
                    <div className="flex justify-between w-[100%] mt-[10pt]">
                      <div className="flex flex-col md:w-[50%] w-[100%] h-[100%] justify-start items-start">
                        <div className="flex flex-row h-[22px]">
                          <div className="flex justify-center items-center">
                            <span
                              className="text-[15px] leading-[140%] tracking-[-1%] font-['suit'] font-normal text-black text-center"
                              style={{
                                color: '#181826',
                              }}
                            >
                              감정가
                            </span>
                          </div>
                          <div className="flex justify-center items-center">
                            <span
                              className="text-[15px] font-['suit'] text-black ml-[10px] leading-[140%] tracking-[-1%] font-normal"
                              style={{
                                color: '#181826',
                              }}
                            >
                              {data.appraisalAmount.toLocaleString('ko-KR')}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-row h-[22px]">
                          <div className="flex justify-center items-center">
                            <span
                              className="text-[15px] leading-[140%] tracking-[-1%] font-['suit'] font-normal text-black text-center"
                              style={{
                                color: '#181826',
                              }}
                            >
                              최저가
                            </span>
                          </div>
                          <div className="flex flex-row justify-center items-center">
                            <span className="text-[15px] font-['suit'] leading-[140%] tracking-[-1%] font-normal text-myBlue ml-[10px]">
                              {'(' + data.rate + ')'}
                            </span>
                            <span
                              className="text-[15px] font-['suit'] text-black ml-[10px] leading-[140%] tracking-[-1%] font-normal"
                              style={{
                                color: '#181826',
                              }}
                            >
                              {data.minimumAmount.toLocaleString('ko-KR')}
                            </span>
                          </div>
                        </div>
                        {/* 모바일 */}
                        <div className="md:hidden flex w-[100px] h-[40px] bg-searchBg justify-center items-center rounded-md md:mt-[0px] mt-[10px]">
                          <span className="text-center font-['suit'] text-[13px] font-semibold leading-[135%]">
                            {data.biddingDateString + ' ' + '입찰'}
                          </span>
                        </div>
                      </div>
                      {/* PC */}
                      <div className="hidden md:flex md:w-[100px] h-[40px] bg-searchBg justify-center items-center rounded-md">
                        <span className="text-center font-['suit'] text-[14px] font-semibold leading-[135%]">
                          {data.biddingDateString + ' ' + '입찰'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        }
        break
      default:
        break
    }
  }

  return (
    <div className="flex flex-col w-full h-full bg-mybg items-center text-center md:py-[0px] py-[15px] relative">
      <div className="flex flex-col pt-[50px] md:gap-[14px] gap-[6px]">
        <span
          className="md:text-[32.5px] text-[20px] leading-[135%] tracking-[-1%] font-bold font-['suit'] not-italic"
          style={{
            color: '#181826',
          }}
        >
          {searchResult === 1
            ? '입찰 예정인 경매물건을 검색해주세요'
            : searchResult === 2
              ? '입찰표를 작성할 물건을 선택해주세요'
              : '검색 결과가 없습니다'}
        </span>
        <div className="flex flex-row justify-center items-center">
          <span className="md:text-[18px] text-[16px] leading-[135%] tracking-[-1%] font-normal font-['suit'] not-italic text-sutTitle text-center">
            {searchResult === 1
              ? '입찰표 하나 당 한 개의 물건만 검색할 수 있습니다'
              : searchResult === 2
                ? ''
                : '이전으로 버튼을 눌러 재검색해주세요'}
          </span>
        </div>
      </div>
      {renderContent()}
      <Button
        handleNextStep={() => {
          if (getData?.length === 1) {
            if (searchResult === 2) {
              handleSearchResult(
                getData[0].infoId,
                getData[0].caseNo,
                getData[0].mulSeq,
              )
            } else {
              handleNextButton(searchResult, '', '', '')
            }
          } else {
            handleNextButton(searchResult, '', '', '')
          }
        }}
        handlePrevStep={handlePrevButton}
        isDisabled={!getAuction}
      />
    </div>
  )
}
