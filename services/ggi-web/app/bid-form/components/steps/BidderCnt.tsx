import { biddingInfoState, stepState } from '@/store/atom/bid-form'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Spinner from '../icons/Spinner'
import Button from '../shared/Button'
import usePutBidderCnt from './hooks/usePutBidderCnt'

export default function BidderCnt() {
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [biddingForm, setBiddingForm] = useRecoilState(biddingInfoState)
  const [errorMsg, setErrorMsg] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [canGo, setCanGo] = useState<boolean>(false)
  const biddersTemplate = {
    bidderType: 'I',
    name: '',
    phoneNo: '',
    phoneNo1: '',
    phoneNo2: '',
    phoneNo3: '',
    idNum1: '',
    idNum2: '',
    address: '',
    addressDetail: '',
    job: '',
    companyNo: '',
    companyNo1: '',
    companyNo2: '',
    companyNo3: '',
    corporationNo: '',
    corporationNo1: '',
    corporationNo2: '',
    share: '',
    mandateYn: '',
  }
  const { putBidderCount, isPending } = usePutBidderCnt(
    biddingForm.mstSeq.toString(),
    biddingForm.bidderCount,
  )

  const initBidders = useCallback(() => {
    setBiddingForm((prev) => {
      const temp = Array.from({ length: prev.bidderCount }, (_, index) => ({
        peopleSeq: index + 1,
        ...biddersTemplate,
      }))
      return {
        ...prev,
        bidders: temp,
      }
    })
  }, [biddingForm.bidderCount])

  //  1. 입찰자 수가 0명이면 다음 단계로 넘어가지 않는다.
  //  2. 입찰자 수가 0명이 아니고, 입찰자 수가 입찰자 정보 배열의 길이보다 크면 입찰자 정보 배열을 업데이트한다.
  //  3. 입찰자 수가 0명이 아니고, 입찰자 수가 입찰자 정보 배열의 길이보다 작으면 입찰자 정보 배열을 업데이트한다.
  //  4. 입찰자 수가 0명이 아니고, 입찰자 수가 입찰자 정보 배열의 길이와 같으면 다음 단계로 넘어간다.

  const updateBidCorpYn = useCallback(() => {
    handleBiddingCntNextBtn()
    if (biddingForm.bidders.length > biddingForm.bidderCount) {
      //  입찰자 수가 입찰자 정보 배열의 길이보다 크면 입찰자 정보 배열을 업데이트한다.
      setBiddingForm((prev) => {
        const temp = prev.bidders.slice(0, prev.bidderCount)
        return {
          ...prev,
          bidders: temp,
        }
      })
    } else if (biddingForm.bidders.length < biddingForm.bidderCount) {
      //  입찰자 수가 입찰자 정보 배열의 길이보다 작으면 입찰자 정보 배열을 업데이트한다.
      setBiddingForm((prev) => {
        const temp = Array.from(
          { length: prev.bidderCount - prev.bidders.length },
          (_, index) => ({
            peopleSeq: index + 1,
            ...biddersTemplate,
          }),
        )
        return {
          ...prev,
          bidders: prev.bidders.concat(temp),
        }
      })
    } else {
      //  입찰자 수가 입찰자 정보 배열의 길이와 같으면 다음 단계로 넘어간다.
      setBiddingForm((prev) => {
        const temp = prev.bidders.slice(0, prev.bidderCount)
        return {
          ...prev,
          bidders: temp,
        }
      })
    }
  }, [biddingForm.bidderCount])

  const validateInputValue = (value: string | number) =>
    value !== '' && !isNaN(Number(value)) && Number(value) > 0

  const handleBiddingCnt = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value === '') {
      setErrorMsg(false)
      setCanGo(false)
      return
    }
    if (validateInputValue(value)) {
      setBiddingForm((prev) => ({
        ...prev,
        bidderCount: Number(value),
      }))
      putBidderCount({
        mstSeq: biddingForm.mstSeq.toString(),
        bidderCount: Number(value),
      })
      setCanGo(true)
    } else {
      setErrorMsg(true)
    }
  }

  const handleBiddingCntNextBtn = useCallback(() => {
    try {
      putBidderCount({
        mstSeq: biddingForm.mstSeq.toString(),
        bidderCount: biddingForm.bidderCount,
      })
    } catch (error) {
      console.error(error)
    }
  }, [biddingForm.bidderCount])

  const handleErrorOk = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value === '') {
      setCanGo(false)
      setErrorMsg(true)
      setBiddingForm((prev) => ({
        ...prev,
        bidderCount: 0,
      }))
      return
    }
    if (validateInputValue(value)) {
      setIsLoading(true)
      setErrorMsg(false)
      handleBiddingCnt(e)
      const nextStep =
        biddingForm.bidders.length > 0 && biddingForm.bidders[0].name !== ''
          ? 16
          : stateNum + 1
      setTimeout(() => {
        setStateNum(nextStep)
        setIsLoading(false)
      }, 2000)
    } else {
      setErrorMsg(true)
    }
  }

  const handleNextStep = () => {
    if (biddingForm.bidderCount === 0) {
      alert('입찰자는 1명 이상이어야 합니다')
      return
    }
    try {
      if (
        biddingForm.bidders.length === 1 &&
        biddingForm.bidders[0].name === '' &&
        biddingForm.bidderCount === 0
      ) {
        initBidders()
      } else {
        updateBidCorpYn()
        if (
          biddingForm.bidderCount >= 1 &&
          biddingForm.bidders[0].name !== ''
        ) {
          setStateNum(16)
        } else {
          setStateNum(stateNum + 1)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handlePrevStep = () => {
    setStateNum(biddingForm.bidder === 'agent' ? 17 : stateNum - 2)
  }

  const handleCorpYn = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (!validateInputValue(value)) return
    if (biddingForm.bidders.find((bidder) => bidder.bidderType === '')) {
      updateBidCorpYn()
    }
  }

  useEffect(() => {
    if (biddingForm.bidderCount > 0 && biddingForm.bidders[0].name === '') {
      initBidders()
    } else if (
      biddingForm.bidderCount > 0 &&
      biddingForm.bidders[0].name !== ''
    ) {
      updateBidCorpYn()
    }
  }, [biddingForm.bidderCount])
  return (
    <>
      <div id="box" className="flex w-[100%] bg-mybg justify-center relative">
        <div className="flex flex-col w-[100%] h-[100%] items-center text-center md:py-[0px] py-[25px]">
          <div className="flex flex-col pt-[50px] md:gap-[14px] gap-[5px]">
            <span className="md:text-[32.5px] text-[20px] font-bold leading-[135%] tracking-[-1%] font-['suit'] not-italic">
              총 입찰자는 몇 명인가요?
            </span>
            <div className="flex flex-col justify-center items-center gap-[0px]">
              <span className="md:text-[18px] text-[16px] text-sutTitle font-medium font-['suit'] leading-[135%] tracking-[-1%] not-italic ">
                입찰에 참여하는 사람이 여러 명인 경우
              </span>
              <span className="md:text-[18px] text-[16px] text-sutTitle font-medium font-['suit'] leading-[135%] tracking-[-1%] not-italic ">
                총 인원 수를 입력합니다(본인 포함)
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-10 md:w-[550px] w-[90%] h-[257px] justify-center items-center rounded-lg border-slate-500">
            {isLoading && <Spinner />}
            <div className="flex flex-col h-full justify-center items-center relative">
              <div className="flex flex-row justify-center items-center top-[50%]">
                <span className="md:text-[22.5px] text-[18px] font-semibold font-['suit'] leading-[135%] tracking-[-1%]">
                  총 입찰자 수는
                </span>
                <input
                  id="bidderNum"
                  aria-label="bidderNum"
                  inputMode="numeric"
                  className="w-[120px] border border-black h-[40px] text-center focus:outline-none font-semibold leading-[150%] tracking-[-1%] md:text-[20px] text-[18px] rounded-lg ml-5 mr-5 text-sutTitle"
                  type="text"
                  placeholder="숫자만 입력"
                  value={
                    biddingForm.bidderCount > 0 ? biddingForm.bidderCount : ''
                  }
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleCorpYn(e)
                    handleErrorOk(e)
                  }}
                />
                <span className="md:text-[22.5px] text-[18px] font-semibold font-['suit'] leading-[135%] tracking-[-1%]">
                  명 입니다
                </span>
              </div>
              {errorMsg && (
                <div className="absolute bottom-[60px]">
                  <span className="md:text-[0.9rem] text-[0.8rem] font-['suit'] font-bold text-red-500">
                    입찰자는 1명 이상이어야 합니다
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <Button
          nextText="다음으로"
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
          isDisabled={isLoading}
        />
      </div>
    </>
  )
}
