import { Modal, useMediaQuery } from '@chakra-ui/react'
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { useRecoilState } from 'recoil'
import { IoClose } from 'react-icons/io5'
import { BiddingInfoType } from '@/models/bid-form/Bidder'
import { biddingInfoState } from '@/store/atom/bid-form'
import useGetAddress from '../hooks/useGetAddress'
import Dimmed from 'app/map/components/shared/Dimmed'
import Flex from 'app/map/components/shared/Flex'
import Pagination from './Pagination'

interface PopupContentProps {
  isOpen: any
  setIsOpen?: Dispatch<SetStateAction<boolean>>
  biddingInfo?: BiddingInfoType
  setBiddingInfo?: Dispatch<SetStateAction<BiddingInfoType>>
  stepNum?: number
  agentInfo?: any
  setAgentInfo?: any
  onClose: any
  setError?: any
  agentSetError?: any
  register?: any
  setValue?: any
  agentSetValue?: any
}

export default function ModalAddr({
  isOpen,
  onClose,
  biddingInfo,
  setBiddingInfo,
  stepNum,
  agentInfo,
  setAgentInfo,
  setValue,
  agentSetValue,
}: PopupContentProps) {
  const [searchAddr, setSearchAddr] = useState<string>('')
  const [emptyView, setEmptyView] = useState<boolean>(false) // 검색결과 없을 때 뷰
  const [addrList, setAddrList] = useState<any>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hstry, setHstry] = useState<boolean>(false) // 변동된 주소정보 포함 여부 [true: 포함, false: 미포함
  const [firstSort, setFirstSort] = useState('none') // 정렬기준 [none: 기본, road: 도로명 포함, location: 지번 포함]
  const [detailOpen, setDetailOpen] = useState<string>('') // 상세보기 여부
  const countPerPage = 5

  const [detailAddr, setDetailAddr] = useState<boolean>(false) // 상세주소 [상세주소] 입력창 오픈
  const [biddingForm, setBiddingForm] = useRecoilState(biddingInfoState)
  const handleInput = (e: HTMLInputElement) => {
    setSearchAddr(e.value)
  }
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')
  const getAddress = useGetAddress({
    page: currentPage,
    countPerPage: countPerPage,
    keyword: searchAddr,
    hstry: hstry,
    firstSort: firstSort,
  })

  const handleSearch = async () => {
    if (searchAddr.length < 1) {
      alert('검색어를 입력해주세요.')
      return
    }
    const result = await getAddress.mutateAsync()
    if (result) {
      setAddrList(result?.juso)
      setTotalCount(result?.common.totalCount)
    } else {
      setAddrList([])
      setEmptyView(true)
    }
    setEmptyView(false)
  }

  const pageUpClick = () => {
    if (currentPage === Math.ceil(totalCount / 5)) {
      return
    } else {
      setCurrentPage(currentPage + 1)
    }
  }

  useEffect(() => {
    if (searchAddr.length > 0) {
      handleSearch()
    }
  }, [currentPage, hstry, firstSort])

  useEffect(() => {
    if (isOpen === false) {
      setSearchAddr('')
      setAddrList([])
      setTotalCount(0)
      setCurrentPage(1)
    }
  }, [isOpen])

  const handleRadioChange = (e: string) => {
    setFirstSort(e)
  }

  const handleDetailAddr = (e: ChangeEvent<HTMLInputElement>) => {
    if (stepNum) {
      setBiddingInfo &&
        setBiddingInfo((prev: any) => {
          const temp = prev.bidderAddrDetail
          temp[stepNum - 1] = e.target.value
          return {
            ...prev,
            bidderAddrDetail: temp,
          }
        })
      setBiddingForm((prev) => {
        let temp = prev.bidders[stepNum - 1].addressDetail
        temp = e.target.value
        return {
          ...prev,
          bidders: [
            ...prev.bidders.slice(0, stepNum - 1),
            {
              ...prev.bidders[stepNum - 1],
              addressDetail: temp,
            },
            ...prev.bidders.slice(stepNum),
          ],
        }
      })
    } else if (agentInfo && setAgentInfo && setBiddingForm) {
      setAgentInfo((prev) => {
        let temp = prev.agentAddrDetail
        temp = e.target.value
        return {
          ...prev,
          agentAddrDetail: temp,
        }
      })
      setBiddingForm((prev) => {
        let temp = prev.agent.addressDetail
        temp = e.target.value
        return {
          ...prev,
          agent: {
            ...prev.agent,
            addressDetail: temp,
          },
        }
      })
    }
  }

  const handleEnter = (e: any) => {
    if (window !== undefined) {
      if (e.key === 'Enter' && searchAddr.length > 0) {
        handleSearch()
      } else if (e.key === 'Enter' && searchAddr === '') {
        alert('검색어를 입력해주세요.')
      }
    }
  }

  const handleGetAddr = () => {
    if ((biddingForm || biddingInfo) && setValue && stepNum) {
      setValue('bidderAddr', [biddingForm?.bidders[stepNum - 1].address ?? ''])
      setValue('bidderAddrDetail', [
        biddingForm.bidders[stepNum - 1].addressDetail ?? '',
      ])
      setDetailAddr(false)
    } else if (agentInfo && agentSetValue) {
      agentSetValue('agentAddr', agentInfo?.agentAddr)
      agentSetValue('agentAddrDetail', agentInfo?.agentAddrDetail)
      setDetailAddr(false)
    }
  }

  const handleCombineAddr = () => {
    if (stepNum && setBiddingForm) {
      const updatedAddr =
        biddingForm.bidders[stepNum - 1].address +
        ' ' +
        (biddingForm.bidders[stepNum - 1].addressDetail !== undefined
          ? biddingForm.bidders[stepNum - 1].addressDetail
          : '')
      setBiddingForm((prev: any) => {
        const temp = prev.bidAddr
        temp[stepNum - 1] = updatedAddr
        return {
          ...prev,
          bidAddr: temp,
        }
      })
    } else if (agentInfo && setAgentInfo) {
      const updatedAddr =
        agentInfo?.agentAddr + (' ' + agentInfo?.agentAddrDetail) ?? ''
      setBiddingForm((prev: any) => {
        let temp = prev.agentAddr
        temp = updatedAddr
        return {
          ...prev,
          agentAddr: temp,
        }
      })
    }
  }

  const handleEnterDetail = (e: any) => {
    if (window !== undefined) {
      if (e.key === 'Enter' && searchAddr.length > 0) {
        handleGetAddr()
        handleCombineAddr()
        onClose()
        setBiddingForm((prev: any) => ({
          ...prev,
          isModalOpen: false,
        }))
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Dimmed>
        <div className="fixed inset-0 z-10 w-[100%] h-[100%] overflow-auto justify-center items-center">
          <div className="flex w-[100%] h-[100%] justify-center p-4 text-center items-center sm:p-0">
            <Flex
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
              }}
            >
              <Flex
                style={{
                  width: isLargerThan768 ? '30%' : '100%',
                  height: '100%',
                }}
              >
                <div
                  className="bg-white px-2 pb-2 pt-5 sm:p-6 sm:pb-4 md:w-[600px] w-[100%] justify-center items-center md:h-[80vh] h-[100vh] overflow-auto scrollbar-hide rounded-md absolute top-[0px] sm:left-[50%] left-[50%]"
                  style={{
                    zIndex: 11,
                    transform: 'translate(-50%, 0)',
                  }}
                >
                  <div className="flex justify-center flex-col">
                    <div className="flex flex-row justify-between">
                      <div className="">
                        <span className="text-[13px] font-NanumGothic not-italic font-extrabold text-left">
                          주소정보연계 | 도로명주소 안내시스템
                        </span>
                      </div>
                      <div
                        className="flex cursor-pointer"
                        onClick={() => {
                          onClose()
                          setDetailAddr(false)
                          setBiddingForm((prev: any) => ({
                            ...prev,
                            isModalOpen: false,
                          }))
                        }}
                      >
                        <IoClose className="flex" size={20} />
                      </div>
                    </div>
                    <div className="mt-3 text-center justify-center items-center w-[100%]">
                      <div className="flex flex-row w-full">
                        <input
                          type="text"
                          className="
                            border 
                            border-gray-300 
                            rounded-md 
                            text-[12px] 
                            font-NanumGothic 
                            not-italic 
                            font-extrabold 
                            text-left 
                            h-[30px] 
                            px-2 
                            w-[80%] 
                            focus:outline-2 
                            focus:outline-myBlue"
                          onChange={(e) => handleInput(e.target)}
                          onKeyUp={(e) => handleEnter(e)}
                        />
                        <button
                          className="
                            ml-2
                            text-center
                            cursor-pointer
                            border 
                            border-blue-300
                            hover:bg-blue-300
                            rounded-md 
                            text-[12px] 
                            font-NanumGothic 
                            not-italic 
                            font-extrabold 
                            h-[30px] 
                            px-2 
                            w-[20%]
                            bg-blue-500
                            text-white
                          "
                          onClick={() => {
                            handleSearch()
                            setDetailAddr(false)
                          }}
                        >
                          검색
                        </button>
                      </div>
                      <div className="flex flex-row gap-1 py-1 w-[100%]">
                        <input
                          type="checkbox"
                          checked={hstry}
                          onChange={() => setHstry(!hstry)}
                        />
                        <div className="flex justify-between w-[100%]">
                          <div className="flex justify-start">
                            <span className="sm:text-[12px] text-[12px]">
                              주소 변동 포함
                            </span>
                          </div>
                          <div className="flex justify-end">
                            <span className="sm:text-[12px] text-[9px] text-blue-400 mt-[2px] sm:block hidden">
                              예) 도로명(반포대로 58), 건물명(독립기념관),
                              지번(삼성동 25)
                            </span>
                          </div>
                        </div>
                      </div>
                      {addrList?.length > 0 && !emptyView && !detailAddr && (
                        <>
                          <div className="flex flex-row w-full justify-between py-1">
                            <div className="flex flex-row">
                              <span className="text-xs font-normal font-NanumGothic">
                                검색 결과
                              </span>
                              <span className="text-xs font-bold text-blue-500 ml-1">
                                {`(${totalCount}건)`}
                              </span>
                            </div>
                            <div className="flex flex-row gap-2">
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  defaultChecked
                                  id="none"
                                  value="none"
                                  name="orderBy"
                                  onChange={(e) =>
                                    handleRadioChange(e.target.value)
                                  }
                                />
                                <label className="ml-1 text-xs">정확도순</label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  id="road"
                                  value="road"
                                  name="orderBy"
                                  checked={firstSort === 'road'}
                                  onChange={(e) =>
                                    handleRadioChange(e.target.value)
                                  }
                                />
                                <label className="ml-1 text-xs">
                                  도로명 포함
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  id="location"
                                  value="location"
                                  name="orderBy"
                                  checked={firstSort === 'location'}
                                  onChange={(e) =>
                                    handleRadioChange(e.target.value)
                                  }
                                />
                                <label className="ml-1 text-xs">
                                  지번 포함
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className=" border-solid border-t-2 border-b-2 border-black">
                            <div className="flex flex-row justify-between mt-1 mb-1 ml-2">
                              <span className="text-xs font-bold font-NanumGothic">
                                No
                              </span>
                              <span className="text-xs font-bold font-NanumGothic">
                                도로명주소
                              </span>
                              <span className="text-xs font-bold font-NanumGothic mr-2">
                                우편번호
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                      {!detailAddr && (
                        <div
                          className={`flex w-full text-left ${
                            addrList?.length === 0
                              ? ''
                              : 'border border-spacing-1'
                          } rounded-md overflow-auto md:overflow-hidden`}
                        >
                          {addrList?.length > 0 && !emptyView ? (
                            <>
                              <div className="w-[100%] overflow-auto md:overflow-hidden">
                                {addrList.map((addr: any, index: number) => (
                                  <div
                                    key={index}
                                    className={`flex flex-row justify-between md:overflow-hidden overflow-auto w-full items-center h-[120px] md:max-h-[150px] md:min-h-[100px] border-solid border-b-[1px] border-r-[1px] border-l-[1px] border-gray-100 ${
                                      index % 2 === 0
                                        ? 'bg-gray-50 hover:bg-gray-100'
                                        : 'bg-white hover:bg-gray-100'
                                    }`}
                                  >
                                    <div className="relative px-2 w-full flex flex-row justify-between items-center">
                                      <span className="text-left text-[12px] font-NanumGothic not-italic font-normal ml-1">
                                        {currentPage === 1
                                          ? index + 1
                                          : (currentPage - 1) * 5 + index + 1}
                                      </span>
                                      <div className="flex flex-col flex-wrap w-[60%] absolute left-8 cursor-pointer">
                                        <span
                                          className="text-left text-[12px] font-NanumGothic not-italic font-extrabold"
                                          onClick={() => {
                                            stepNum &&
                                              setBiddingForm((prev: any) => {
                                                const temp = prev.bidAddr
                                                temp[stepNum - 1] =
                                                  addr.roadAddr
                                                return {
                                                  ...prev,
                                                  bidAddr: temp,
                                                }
                                              })
                                            stepNum &&
                                              setBiddingInfo &&
                                              setBiddingForm((prev: any) => {
                                                const temp = prev.bidAddr
                                                temp[stepNum - 1] =
                                                  addr.roadAddr
                                                return {
                                                  ...prev,
                                                  bidAddr: temp,
                                                }
                                              })
                                            setAgentInfo &&
                                              setAgentInfo((prev) => {
                                                let temp = prev.agentAddr
                                                temp = addr.roadAddr
                                                return {
                                                  ...prev,
                                                  agentAddr: temp,
                                                }
                                              })
                                            setAgentInfo &&
                                              setBiddingForm((prev) => {
                                                let temp = prev.agent.address
                                                temp = addr.roadAddr
                                                return {
                                                  ...prev,
                                                  agent: {
                                                    ...prev.agent,
                                                    address: temp,
                                                  },
                                                }
                                              })
                                            setAddrList([])
                                            setEmptyView(false)
                                            setDetailAddr(true)
                                          }}
                                        >
                                          {addr.roadAddr}
                                        </span>
                                        <span className="text-left text-[11px] font-NanumGothic not-italic font-normal mt-2">
                                          {'[지번] ' + addr.jibunAddr}
                                        </span>
                                        {detailOpen === index.toString() && (
                                          <>
                                            <div className="flex flex-row gap-1 mt-2">
                                              <span className="text-[10px] text-myBlue">
                                                [관할주민센터]
                                              </span>
                                              <span className="text-[10px]">
                                                {addr.hemdNm}
                                              </span>
                                            </div>
                                            <span className="text-xs font-NanumGothic font-bold text-myBlue mt-1">
                                              ※ 관할주민센터는 참고정보이며,
                                              실제와 다를 수 있습니다.
                                            </span>
                                          </>
                                        )}
                                      </div>
                                      <div className="flex flex-row gap-2 w-[40%] justify-end items-center">
                                        {detailOpen === index.toString() ? (
                                          <div
                                            className="flex text-center items-center justify-center rounded-[5px] mr-1 bg-gray-400 w-[50px] h-[25px] cursor-pointer"
                                            onClick={() => setDetailOpen('')}
                                          >
                                            <span className="text-[10px] text-white">
                                              닫기
                                            </span>
                                          </div>
                                        ) : (
                                          <div
                                            className="flex bg-myBlue text-center items-center justify-center w-[50px] h-[25px] cursor-pointer rounded-[5px] mr-1 hover:bg-blue-300"
                                            onClick={() =>
                                              setDetailOpen(index.toString())
                                            }
                                          >
                                            <span className="text-[10px] text-white text-center">
                                              상세보기
                                            </span>
                                          </div>
                                        )}
                                        <span className="text-cneter text-[12px] font-NanumGothic not-italic font-normal mr-1">
                                          {addr.zipNo}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </>
                          ) : addrList?.length === 0 && !emptyView ? (
                            <div className="text-center items-center justify-center mx-auto w-[100%] h-[150px] absolute top-[300px] left-0">
                              <span className="text-[12px] font-NanumGothic not-italic font-extrabold text-left">
                                검색어를 입력해주세요.
                              </span>
                            </div>
                          ) : (
                            <div className="text-center items-center justify-center mx-auto w-[100%] h-[150px] absolute top-[300px] left-0">
                              <span className="text-[12px] font-NanumGothic not-italic font-extrabold text-left">
                                검색결과가 없습니다.
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                      {detailAddr && (
                        <div className="flex flex-col w-[100%] h-[350px] p-1 relative">
                          <div className="flex justify-start">
                            <span className="text-[12px] font-bold ">
                              상세주소 입력
                            </span>
                          </div>
                          <div>
                            <div className="border-solid border-[1px] border-t border-gray-300 mt-6 md:w-[100%] w-[100%] h-[150px] flex flex-col justify-center">
                              <div className="w-[100%] flex flex-row h-[30%]">
                                <div className="flex justify-center items-center w-[30%] h-[100%] bg-gray-100">
                                  <span className="text-sm font-bold font-NanumGothic">
                                    도로명주소
                                  </span>
                                </div>
                                <div className="w-[70%] h-[100%] flex justify-center items-center border-gray-100 border-r-[1px]">
                                  <span className="text-[12px] font-normal font-NanumGothic">
                                    {stepNum &&
                                      biddingForm.bidders[stepNum - 1].address}
                                    {agentInfo && agentInfo?.agentAddr}
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-row w-[100%] h-[70%] border-solid border-t-[1px] border-gray-200">
                                <div className="flex justify-center items-center w-[30%] h-[100%] bg-gray-100">
                                  <span className="text-sm font-bold font-NanumGothic">
                                    상세주소
                                  </span>
                                </div>
                                <div className="flex w-[70%] h-[100%] justify-center items-center border-gray-100 border-r-[1px]">
                                  <input
                                    type="text"
                                    className="flex w-[90%] h-[30%] border border-gray-200"
                                    value={
                                      (stepNum &&
                                        biddingForm.bidders[stepNum - 1]
                                          .addressDetail) ||
                                      (agentInfo &&
                                        agentInfo?.agentAddrDetail) ||
                                      ''
                                    }
                                    onChange={(e) => handleDetailAddr(e)}
                                    onKeyDown={(e) => handleEnterDetail(e)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-center items-center w-[100%] absolute top-[300px]">
                            <div
                              className="flex justify-center items-center w-[100px] h-[40px] bg-blue-500 rounded-md cursor-pointer hover:bg-blue-300"
                              onClick={() => {
                                handleGetAddr()
                                handleCombineAddr()
                                onClose()
                                setBiddingForm((prev: any) => ({
                                  ...prev,
                                  isModalOpen: false,
                                }))
                              }}
                            >
                              <span className="text-sm text-white rounded-md">
                                주소입력
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      {addrList?.length > 0 && !emptyView && !detailAddr && (
                        <Pagination
                          totalCount={totalCount}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          pageUpClick={pageUpClick}
                          pageDownClick={() => setCurrentPage(currentPage - 1)}
                          countPerPage={countPerPage}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Flex>
            </Flex>
          </div>
        </div>
      </Dimmed>
    </Modal>
  )
}
