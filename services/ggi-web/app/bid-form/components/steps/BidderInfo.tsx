import { biddingInfoState, stepState } from '@/store/atom/bid-form'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import useDeleteAgent from './hooks/useDeleteAgent'
import Spinner from '../icons/Spinner'
import Button from '../shared/Button'
import { useInfoApi } from './hooks/useInfoApi'
import useGetAgent from './hooks/useGetAgent'
import useGetBidders from './hooks/useGetBidders'

export default function BidderInfo() {
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [isSelected, setIsSelected] = useState<boolean>(true)
  const [biddingForm, setBiddingForm] = useRecoilState(biddingInfoState)
  const [loading, setLoading] = useState<boolean>(false)
  const handleDeleteAgent = useDeleteAgent(biddingForm.mstSeq.toString())
  const { getCase } = useInfoApi()
  const { data: agent } = useGetAgent({ mstSeq: biddingForm.mstSeq.toString() })
  const { data: bidders } = useGetBidders(biddingForm.mstSeq.toString())

  const handleNextStep = useCallback(() => {
    setLoading(true)
    const isBidders = bidders.length > 0
    const isAgent = agent !== null
    //  입찰자 정보가 있으나 저장은 하지 않은 경우 => 다음 단계로 이동
    if (!isBidders && biddingForm.bidder === 'self') {
      setStateNum(stateNum + 2)
    } else if (isBidders && biddingForm.bidder === 'self') {
      //  입찰자 정보가 있고 저장된 경우 => 입찰자 수정 단계로 이동
      setStateNum(16)
    } else if (biddingForm.bidder === 'agent' && isAgent) {
      //  대리인 정보가 있고 저장된 경우 => 대리인 수정 단계로 이동
      setStateNum(17)
    } else if (biddingForm.bidder === 'agent' && !isAgent) {
      //  대리인 정보가 없는 경우 => 대리인 정보 입력 단계로 이동
      setStateNum(stateNum + 1)
    } else if (biddingForm.bidder === '') {
      setLoading(false)
      setIsSelected(false)
    }
  }, [bidders, agent, biddingForm, stateNum])

  const handlePrevStep = () => {
    if (biddingForm.biddingInfos.length > 1) {
      setStateNum(stateNum - 1)
    } else {
      setStateNum(stateNum - 2)
    }
  }

  const handleGetInfo = async () => {
    if (biddingForm.mstSeq) {
      const response = await getCase.mutateAsync({
        infoId: biddingForm.infoId,
        caseNo: biddingForm.caseNo,
        mulSeq: biddingForm.mulSeq,
      })
      if (response) {
        setBiddingForm((prev) => ({
          ...prev,
          ...response,
        }))
      }
    }
  }

  useEffect(() => {
    handleGetInfo()
  }, [])

  return (
    <>
      <div className="flex w-[100%] bg-mybg justify-center relative">
        <div className="flex flex-col w-[100%] h-[100%] bg-mybg items-center text-center md:py-[0px] py-[25px]">
          {loading && <Spinner />}
          <div className="flex flex-col pt-[50px] md:gap-[14px] gap-[5px]">
            <span className="md:text-[32.5px] text-[20px] leading-[135%] tracking-[-1%] font-bold font-['suit'] not-italic">
              입찰하는 본인이 맞으신가요?
            </span>
            <span className="md:text-[18px] text-[16px] leading-[135%] tracking-[-1%] font-normal font-['suit'] not-italic text-sutTitle">
              본인이 아닌 경우 대리인을 선택해주세요
            </span>
          </div>
          <div className="flex flex-row md:w-[450px] w-[90%] h-[212.5px] mt-[100px] md:gap-[22.5px] gap-[10px]">
            <div
              className={`flex flex-row md:w-[212.5px] w-[180px] h-[100%] rounded-xl ${
                isSelected ? '' : 'border-solid border-red-500 border-[2px]'
              } justify-center items-center cursor-pointer ${
                biddingForm.bidder === 'self' ? 'bg-mySelect' : 'bg-white'
              } relative`}
              onClick={() => {
                if (biddingForm.agentYn === 'Y') {
                  handleDeleteAgent.mutateAsync()
                }
                setLoading(true)
                setBiddingForm((prev) => {
                  return {
                    ...prev,
                    bidder: 'self',
                  }
                })
                setTimeout(() => {
                  setStateNum(stateNum + 2)
                  setIsSelected(false)
                }, 1000)
              }}
            >
              <div
                className={`flex flex-col w-[100%] justify-center items-center rounded-xl h-[100%] border-solid border-[1px] border-gray-300`}
              >
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M50 45.8333C59.2048 45.8333 66.6667 38.3714 66.6667 29.1667C66.6667 19.9619 59.2048 12.5 50 12.5C40.7953 12.5 33.3334 19.9619 33.3334 29.1667C33.3334 38.3714 40.7953 45.8333 50 45.8333Z"
                    stroke="#8E8EA9"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.6666 87.5V70.8333C16.6666 66.2308 20.3976 62.5 25 62.5H75C79.6025 62.5 83.3333 66.2308 83.3333 70.8333V87.5"
                    stroke="#8E8EA9"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex flex-col gap-[15px] justify-center items-center">
                  <span
                    className={`flex md:text-[22.5px] text-[16px] text-black not-italic font-semibold font-['suit'] leading-[135%] tracking-[-1%]`}
                  >
                    본인(입찰자)
                  </span>
                  <span
                    className={`flex md:text-[17px] text-[13px] text-sutTitle not-italic font-normal font-['suit'] leading-[130%] tracking-[-1%]`}
                  >
                    개인 또는 법인
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`flex flex-row md:w-[212.5px] w-[180px] h-[100%] rounded-xl ${
                isSelected ? '' : 'border-solid border-red-500 border-[2px]'
              } justify-center items-center cursor-pointer ${
                biddingForm.bidder === 'agent' ? 'bg-mySelect' : 'bg-white'
              } relative`}
              onClick={() => {
                setLoading(true)
                setBiddingForm((prev) => ({
                  ...prev,
                  bidder: 'agent',
                  agentYn: 'Y',
                }))
                setTimeout(() => {
                  setStateNum(stateNum + 1)
                  setIsSelected(false)
                }, 1000)
              }}
            >
              <div
                className={`flex flex-col w-[100%] justify-center items-center rounded-xl h-[100%] relative border-solid border-[1px] border-gray-300`}
              >
                <div className="flex flex-row w-[100%] justify-center items-center ml-2 md:mt-[0px] mt-[20px]">
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M50 45.8333C59.2048 45.8333 66.6667 38.3714 66.6667 29.1667C66.6667 19.9619 59.2048 12.5 50 12.5C40.7953 12.5 33.3334 19.9619 33.3334 29.1667C33.3334 38.3714 40.7953 45.8333 50 45.8333Z"
                      stroke="#8E8EA9"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.6666 87.5V70.8333C16.6666 66.2308 20.3976 62.5 25 62.5H75C79.6025 62.5 83.3333 66.2308 83.3333 70.8333V87.5"
                      stroke="#8E8EA9"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 9.75H17.5"
                      stroke="#8E8EA9"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9.75 17.5L9.75 2"
                      stroke="#8E8EA9"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col justify-center items-center md:mt-[0px] mt-[5px]">
                  <span
                    className={`flex md:text-[22.5px] text-[16px] text-black not-italic font-semibold font-['suit'] leading-[135%] tracking-[-1%]`}
                  >
                    대리인
                  </span>
                  <div className="flex flex-col justify-center items-center">
                    <span
                      className={`flex md:text-[17px] text-[13px] text-sutTitle not-italic font-normal font-['suit'] leading-[130%] tracking-[-1%]`}
                    >
                      개인의 대리인 또는
                    </span>
                    <span
                      className={`md:flex hidden md:text-[17px] text-[13px] text-sutTitle not-italic font-normal font-['suit'] leading-[130%] tracking-[-1%]`}
                    >
                      법인대리인, 공동입찰대리인
                    </span>
                    <span
                      className={`flex md:hidden md:text-[17px] text-[13px] text-sutTitle not-italic font-normal font-['suit'] leading-[130%] tracking-[-1%]`}
                    >
                      법인대리인,
                      <br />
                      공동입찰대리인
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${isSelected ? 'hidden' : 'flex'} mt-[50px]`}>
            <span className="text-[1rem] font-bold text-myRed font-['suit']">
              본인 / 대리인 버튼을 선택해주세요.
            </span>
          </div>
        </div>
        <Button
          nextText="다음으로"
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
        />
      </div>
    </>
  )
}
