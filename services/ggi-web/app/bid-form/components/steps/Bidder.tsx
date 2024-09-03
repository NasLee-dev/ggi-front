import { BiddingInfoType } from 'app/bid-form/models/Bidder'
import { biddingInfoState, stepState } from '@/store/atom/bid-form'
import { useDisclosure } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import Spinner from '../icons/Spinner'
import usePutBidders from './hooks/usePutBidders'
import usePostBidders from './hooks/usePostBidders'
import BidderForm from '../formComponents/BidderForm'

export default function Bidder() {
  if (typeof window === 'undefined') return null
  window.document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  })
  const [stateNum, setStateNum] = useRecoilState(stepState) //  입찰표 작성 단계 set함수
  const [stepNum, setStepNum] = useState<number>(0) //  입찰자 정보 단계
  const [biddingForm, setBiddingForm] = useRecoilState(biddingInfoState) //  입찰표 작성 정보
  const [loading, setLoading] = useState<boolean>(false) //  로딩 상태
  const { isOpen, onClose, onOpen } = useDisclosure() //  주소검색 모달 상태
  const [errControl, setErrControl] = useState(false)
  const putBidderInfo = usePutBidders({
    mstSeq: biddingForm.mstSeq,
    bidderType: biddingForm.bidders[stepNum]?.bidderType,
    peopleSeq: stepNum,
    bidders: biddingForm.bidders,
  })
  const postBidderInfo = usePostBidders({
    mstSeq: biddingForm.mstSeq,
    bidderType: biddingForm.bidders[stepNum]?.bidderType,
    peopleSeq: stepNum,
    bidders: biddingForm.bidders,
  })
  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   setFocus,
  //   setError,
  //   setValue,
  //   formState: { errors },
  // } = useForm<BiddingInfoType>({
  //   defaultValues: {
  //     bidderName: [''],
  //     bidderPhone1: [''],
  //     bidderPhone2: [''],
  //     bidderPhone3: [''],
  //     bidderIdNum1: [''],
  //     bidderIdNum2: [''],
  //     bidderAddr: [''],
  //     bidderAddrDetail: [''],
  //     bidderCorpNum1: [''],
  //     bidderCorpNum2: [''],
  //     bidderCorpNum3: [''],
  //     bidderCorpRegiNum1: [''],
  //     bidderCorpRegiNum2: [''],
  //     bidderJob: [''],
  //   },
  //   mode: 'onChange',
  // })

  //  수정 사항 반영
  const handleUpdate = () => {
    putBidderInfo.mutate({
      mstSeq: biddingForm.mstSeq,
      bidderType: biddingForm.bidders[stepNum]?.bidderType,
      peopleSeq: stepNum,
      bidders: biddingForm.bidders,
    })
  }

  // 입찰자 정보 저장
  const handleBidderFormSave = () => {
    postBidderInfo.mutate({
      mstSeq: biddingForm.mstSeq,
      bidderType: biddingForm.bidders[stepNum]?.bidderType,
      peopleSeq: stepNum,
      bidders: biddingForm.bidders,
    })
  }

  //  다음 스텝 넘어가기
  const handleNextStepNew = (num: number) => {
    if (biddingForm.bidderCount === 1) {
      handleBidderFormSave()
      if (!errControl) {
        setStateNum(stateNum + 2)
      }
    } else if (biddingForm.bidderCount > 1) {
      if (
        stepNum + 1 === biddingForm.bidderCount &&
        biddingForm.agentYn !== 'Y'
      ) {
        handleBidderFormSave()
        if (!errControl) {
          setStateNum(stateNum + 1)
        }
      } else if (
        stepNum + 1 === biddingForm.bidderCount &&
        biddingForm.agentYn === 'Y'
      ) {
        handleBidderFormSave()
        if (!errControl) {
          setStateNum(19)
        }
      } else if (biddingForm.bidders[stepNum].name === '') {
        handleBidderFormSave()
        if (!errControl) {
          setStepNum(num + 1)
        }
      } else {
        if (
          biddingForm?.bidders?.length > 0 &&
          biddingForm?.bidders[stepNum]?.peopleSeq === stepNum
        ) {
          handleUpdate()
          if (!errControl) {
            setStepNum(num + 1)
          }
        } else {
          handleBidderFormSave()
          if (!errControl) {
            setStepNum(num + 1)
          }
        }
      }
    }
  }

  const onSubmit: SubmitHandler<any> = async (stepNum: number) => {
    if (isOpen === false) {
      try {
        await handleNextStepNew(stepNum)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div
      className={`flex w-[100%] h-[100vh] bg-mybg justify-center relative overflow-y-auto`}
    >
      {loading && <Spinner />}
      <div className="flex flex-col gap-4 w-[100%] h-[100%] bg-mybg items-center text-center relative">
        <div className="flex flex-col justify-center items-center md:w-[550px] w-[100%]">
          <div className="flex flex-col flex-wrap justify-center items-center pt-[50px] md:gap-[14px] gap-[5px]">
            <span className="md:text-[32.5px] text-[20px] font-bold font-['suit'] not-italic leading-[135%] tracking-[-1%]">
              {stepNum === 1 ? '입찰자(본인)' : '본인 외 '} 정보를 입력해주세요
            </span>
            {biddingForm.bidderCount > 1 && (
              <span className="md:text-[20px] text-[15px] font-light font-['suit'] not-italic leading-[140%] tracking-[-1%] text-sutTitle">
                {`(${stepNum + 1} / ${biddingForm.bidderCount})`}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-row md:w-[550px] w-[90%] justify-center items-center gap-[25px]">
          <div className="flex flex-row gap-[5px]">
            <input
              name="bidderType"
              checked={biddingForm.bidders[stepNum]?.bidderType === 'I'}
              className="cursor-pointer w-[20px] h-[20px] mt-1 accent-myBlue"
              type="radio"
              onChange={() => {
                setBiddingForm((prev) => ({
                  ...prev,
                  bidders: prev.bidders.map((bidder, idx) => {
                    if (idx === stepNum) {
                      return { ...bidder, bidderType: 'I' }
                    }
                    return bidder
                  }),
                }))
              }}
            />
            <label>
              <span className="md:text-[20px] text-[16px] font-normal font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] ml-1">
                개인
              </span>
            </label>
          </div>
          <div className="flex flex-row gap-[5px]">
            <input
              checked={biddingForm.bidders[stepNum]?.bidderType === 'C'}
              name="bidderType"
              className="cursor-pointer w-[20px] h-[20px] mt-1 accent-myBlue"
              type="radio"
              onChange={() => {
                setBiddingForm((prev) => ({
                  ...prev,
                  bidders: prev.bidders.map((bidder, idx) => {
                    if (idx === stepNum) {
                      return { ...bidder, bidderType: 'C' }
                    }
                    return bidder
                  }),
                }))
              }}
            />
            <label>
              <span className="md:text-[20px] text-[16px] font-normal font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] ml-1">
                법인
              </span>
            </label>
          </div>
        </div>
        {/* 입력정보 */}
        <BidderForm
          stepNum={stepNum}
          setStepNum={setStepNum}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  )
}
