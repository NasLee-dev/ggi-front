import { BiddingInfoType } from 'app/bid-form/models/Bidder'
import { biddingInfoState, stepState } from '@/store/atom/bid-form'
import { useDisclosure } from '@chakra-ui/react'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import Spinner from '../icons/Spinner'
import usePutBidders from './hooks/usePutBidders'
import usePostBidders from './hooks/usePostBidders'
import useGetBidders from './hooks/useGetBidders'
import usePutManates from './hooks/usePutMandate'
import BidderForm from 'app/bid-form/components/form/BidderForm'

export default function BidderEdit() {
  if (typeof window === 'undefined') return null
  window.document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  })
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [stepNum, setStepNum] = useState<number>(0)
  const [biddingForm, setBiddingForm] = useRecoilState(biddingInfoState)
  const [loading, setLoading] = useState<boolean>(false)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [errControl, setErrControl] = useState(false)
  const { data: bidders } = useGetBidders(biddingForm.mstSeq.toString())
  const putMandates = usePutManates({
    mstSeq: biddingForm.mstSeq.toString(),
    bidderNum: biddingForm.bidderCount,
    mandates: biddingForm.bidders.map((bidder) => ({
      peopleSeq: bidder.peopleSeq,
      name: bidder.name,
      mandateYn: bidder.mandateYn,
    })),
  })
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
  console.log('du')
  const handleBidderForm = useCallback(() => {
    if (typeof bidders === 'undefined') return
    if (bidders?.length < biddingForm.bidderCount) {
      // bidderCount가 bidders.length보다 크면 bidderCount - bidders.length 만큼 빈 객체를 추가
      setBiddingForm((prev) => ({
        ...prev,
        bidders: [
          ...prev.bidders,
          ...Array.from({ length: prev.bidderCount - bidders.length }).map(
            (_, idx) => ({
              peopleSeq: bidders.length + idx,
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
              bidderType: 'I',
            }),
          ),
        ],
      }))
    } else if (bidders?.length > biddingForm.bidderCount) {
      // bidderCount가 bidders.length보다 작으면 bidderCount - bidders.length 만큼 빈 객체를 삭제
      setBiddingForm((prev) => ({
        ...prev,
        bidders: prev.bidders.slice(0, prev.bidderCount),
      }))
    } else if (bidders?.length === biddingForm.bidderCount) {
      // bidderCount와 bidders.length가 같으면 업데이트
      setBiddingForm((prev) => ({
        ...prev,
        bidders: prev.bidders.map((bidder, idx) => ({
          ...bidder,
          ...bidders[idx],
        })),
      }))
    }
  }, [bidders, biddingForm.bidderCount, setBiddingForm])

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setError,
    setValue,
    formState: { errors },
  } = useForm<BiddingInfoType>({
    defaultValues: {
      bidderName: [''],
      bidderPhone1: [''],
      bidderPhone2: [''],
      bidderPhone3: [''],
      bidderIdNum1: [''],
      bidderIdNum2: [''],
      bidderAddr: [''],
      bidderAddrDetail: [''],
      bidderCorpNum1: [''],
      bidderCorpNum2: [''],
      bidderCorpNum3: [''],
      bidderCorpRegiNum1: [''],
      bidderCorpRegiNum2: [''],
      bidderJob: [''],
    },
    mode: 'onChange',
  })

  //  수정 사항 반영
  const handleBidderFormUpdate = () => {
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

  const handleRegisterMandate = async () => {
    try {
      await putMandates.mutateAsync({
        mstSeq: biddingForm.mstSeq.toString(),
        bidderNum: biddingForm.bidderCount,
        mandates: biddingForm.bidders.map((bidder) => ({
          peopleSeq: bidder.peopleSeq,
          name: bidder.name,
          mandateYn: bidder.mandateYn,
        })),
      })
    } catch (error) {
      console.log(error)
    }
  }

  //  다음 단계로 이동
  const handleNextStep = async () => {
    try {
      if (biddingForm.bidderCount === 1) {
        if (biddingForm.bidderCount > (bidders?.length ?? 0)) {
          //  서버에 저장된 입찰자 수보다 많을 경우 => 아직 서버에 저장을 하지 못한 경우
          if (biddingForm.agentYn === 'Y') {
            if (bidders[stepNum].name === '') {
              await handleBidderFormUpdate()
              await handleRegisterMandate()
            } else {
              await handleBidderFormSave()
              await handleRegisterMandate()
            }
            setStateNum(9)
          } else {
            if (bidders[stepNum].name === '') {
              await handleBidderFormUpdate()
            } else {
              await handleBidderFormSave()
            }
            setStateNum(9)
          }
        } else if (biddingForm.bidderCount < (bidders?.length ?? 0)) {
          //  서버에 저장된 입찰자 수보다 적을 경우 => 서버에 저장된 입찰자 수를 줄여야 하는 경우
          if (biddingForm.agentYn === 'Y') {
            await handleBidderFormUpdate()
            await handleRegisterMandate()
            setStateNum(9)
          } else {
            await handleBidderFormUpdate()
            setStateNum(9)
          }
        } else if (biddingForm.bidderCount === (bidders?.length ?? 0)) {
          if (biddingForm.agentYn === 'Y') {
            await handleBidderFormUpdate()
            await handleRegisterMandate()
            setStateNum(9)
          } else {
            await handleBidderFormUpdate()
            setStateNum(9)
          }
        }
      } else if (biddingForm.bidderCount > 1) {
        if (biddingForm.bidderCount > (bidders?.length ?? 0)) {
          if (biddingForm.agentYn === 'Y') {
            if (stepNum + 1 === biddingForm.bidderCount) {
              await handleBidderFormSave()
              setStateNum(19)
            } else {
              if (stepNum + 1 > (bidders?.length ?? 0)) {
                await handleBidderFormSave()
                setStepNum(stepNum + 1)
                reset()
              } else {
                await handleBidderFormUpdate()
                setStepNum(stepNum + 1)
                reset()
              }
            }
          } else {
            if (stepNum + 1 === biddingForm.bidderCount) {
              await handleBidderFormSave()
              setStateNum(8)
            } else {
              if (stepNum + 1 > (bidders?.length ?? 0)) {
                await handleBidderFormSave()
                setStepNum(stepNum + 1)
                reset()
              } else {
                await handleBidderFormUpdate()
                setStepNum(stepNum + 1)
                reset()
              }
            }
          }
        } else if (biddingForm.bidderCount < (bidders?.length ?? 0)) {
          if (biddingForm.agentYn === 'Y') {
            if (stepNum + 1 === biddingForm.bidderCount) {
              await handleBidderFormUpdate()
              setStateNum(19)
            } else {
              if (stepNum + 1 > biddingForm.bidderCount) {
                await handleBidderFormUpdate()
                setStepNum(stepNum + 1)
                reset()
              } else {
                await handleBidderFormUpdate()
                setStepNum(stepNum + 1)
                reset()
              }
            }
          } else {
            if (stepNum + 1 === biddingForm.bidderCount) {
              await handleBidderFormUpdate()
              setStateNum(8)
            } else {
              if (stepNum + 1 > biddingForm.bidderCount) {
                await handleBidderFormUpdate()
                setStepNum(stepNum + 1)
                reset()
              } else {
                await handleBidderFormUpdate()
                setStepNum(stepNum + 1)
                reset()
              }
            }
          }
        } else if (biddingForm.bidderCount === (bidders?.length ?? 0)) {
          if (biddingForm.agentYn === 'Y') {
            if (stepNum + 1 === biddingForm.bidderCount) {
              await handleBidderFormUpdate()
              setStateNum(19)
            } else {
              if (stepNum > biddingForm.bidderCount) {
                await handleBidderFormUpdate()
                setStepNum(stepNum + 1)
                reset()
              } else {
                await handleBidderFormUpdate()
                setStepNum(stepNum + 1)
                reset()
              }
            }
          } else {
            if (stepNum + 1 === biddingForm.bidderCount) {
              await handleBidderFormUpdate()
              setStateNum(8)
            } else {
              if (stepNum > biddingForm.bidderCount) {
                await handleBidderFormUpdate()
                setStepNum(stepNum + 1)
                reset()
              } else {
                await handleBidderFormUpdate()
                setStepNum(stepNum + 1)
                reset()
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit: SubmitHandler<any> = async (stepNum: number) => {
    if (isOpen === false) {
      try {
        await handleNextStep()
      } catch (error) {
        console.log(error)
      }
    }
  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (
      name === 'bidderName' ||
      name === 'bidderPhone1' ||
      name === 'bidderPhone2' ||
      name === 'bidderPhone3' ||
      name === 'bidderIdNum1' ||
      name === 'bidderIdNum2' ||
      name === 'bidderAddr' ||
      name === 'bidderAddrDetail' ||
      name === 'bidderCorpNum1' ||
      name === 'bidderCorpNum2' ||
      name.startsWith('bidderJob.')
    ) {
      setValue(
        name as
          | 'bidderName'
          | 'bidderPhone1'
          | 'bidderPhone2'
          | 'bidderPhone3'
          | 'bidderIdNum1'
          | 'bidderIdNum2'
          | 'bidderAddr'
          | 'bidderAddrDetail'
          | 'bidderCorpNum1'
          | 'bidderCorpNum2'
          | `bidderJob.${number}`,
        value,
        { shouldValidate: true },
      )
    }
  }

  useEffect(() => {
    handleBidderForm()
  }, [bidders])

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
          setError={setError}
          isOpen={isOpen}
          onOpen={onOpen}
          setValue={setValue}
          onSubmit={onSubmit}
          handleInputChange={handleInputChange}
          errors={errors}
          setFocus={setFocus}
          onClose={onClose}
          register={register}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}
