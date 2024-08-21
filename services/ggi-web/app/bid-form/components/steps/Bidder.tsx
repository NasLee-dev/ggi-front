import { BidderListProps, BiddingInfoType } from 'app/bid-form/models/Bidder'
import { biddingInfoState, stepState } from '@/store/atom/bid-form'
import { useDisclosure } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LiaEyeSlashSolid, LiaEyeSolid } from 'react-icons/lia'
import { useRecoilState } from 'recoil'
import Spinner from '../icons/Spinner'
import useGetBidders from './hooks/useGetBidders'
import usePutBidders from './hooks/usePutBidders'
import usePostBidders from './hooks/usePostBidders'
import SearchAddress from '../form/address/SearchAddress'

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
  const [bidderList, setBidderList] = useState<BidderListProps>() //  입찰자 정보 리스트
  const [loading, setLoading] = useState<boolean>(false) //  로딩 상태
  const { isOpen, onClose, onOpen } = useDisclosure() //  주소검색 모달 상태
  const [passwordActive, setPasswordActive] = useState(false)
  const [errControl, setErrControl] = useState(false)
  const { data: bidders } = useGetBidders(biddingForm.mstSeq.toString())
  console.log(bidders)
  const putBidderInfo = usePutBidders({
    mstSeq: biddingForm.mstSeq,
    bidCorpYn: biddingForm.bidders[stepNum]?.bidCorpYn,
    peopleSeq: stepNum,
    bidders: biddingForm.bidders,
  })
  const postBidderInfo = usePostBidders({
    mstSeq: biddingForm.mstSeq,
    bidCorpYn: biddingForm.bidders[stepNum]?.bidCorpYn,
    peopleSeq: stepNum,
    bidders: biddingForm.bidders,
  })
  const {
    register,
    handleSubmit,
    setFocus,
    reset,
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

  const handlePhoneFocusMove = (target: HTMLInputElement) => {
    if (target.value.length === 3 && target.id === 'bidderPhone1') {
      setFocus('bidderPhone2')
    } else if (target.value.length === 4 && target.id === 'bidderPhone2') {
      setFocus('bidderPhone3')
    }
  }

  const handleCorpNumFocusMove = (target: HTMLInputElement) => {
    if (target.value.length === 3 && target.id === 'bidderCorpNum1') {
      setFocus('bidderCorpNum2')
    } else if (target.value.length === 2 && target.id === 'bidderCorpNum2') {
      setFocus('bidderCorpNum3')
    }
  }

  const handleCorpRegiNumFocusMove = (target: HTMLInputElement) => {
    if (target.value.length === 6 && target.id === 'bidderCorpRegiNum1') {
      setFocus('bidderCorpRegiNum2')
    }
  }

  const handleIdNumFocusMove = (target: HTMLInputElement) => {
    if (target.value.length === 6 && target.id === 'bidderIdNum1') {
      setFocus('bidderIdNum2')
    }
  }

  //  수정 사항 반영
  const handleUpdate = () => {
    putBidderInfo.mutate({
      mstSeq: biddingForm.mstSeq,
      bidCorpYn: biddingForm.bidders[stepNum]?.bidCorpYn,
      peopleSeq: stepNum,
      bidders: biddingForm.bidders,
    })
  }

  // 입찰자 정보 저장
  const handleBidderFormSave = () => {
    handleUpdateIdNum(stepNum)
    postBidderInfo.mutate({
      mstSeq: biddingForm.mstSeq,
      bidCorpYn: biddingForm.bidders[stepNum]?.bidCorpYn,
      peopleSeq: stepNum,
      bidders: biddingForm.bidders,
    })
  }

  //  다음 스텝 넘어가기
  const handleNextStepNew = async (num: number) => {
    if (biddingForm.bidderCount === 1) {
      await handleBidderFormSave()
      if (!errControl) {
        setStateNum(stateNum + 2)
      }
    } else if (biddingForm.bidderCount > 1) {
      if (stepNum === biddingForm.bidderCount && biddingForm.agentYn !== 'Y') {
        await handleBidderFormSave()
        if (!errControl) {
          setStateNum(stateNum + 1)
        }
      } else if (
        stepNum === biddingForm.bidderCount &&
        biddingForm.agentYn === 'Y'
      ) {
        await handleBidderFormSave()
        if (!errControl) {
          setStateNum(19)
        }
      } else if (biddingForm.bidders[stepNum].name === '') {
        await handleBidderFormSave()
        if (!errControl) {
          setStepNum(num + 1)
        }
      } else {
        if (
          bidderList &&
          bidderList?.bidders?.length > 0 &&
          bidderList?.bidders[stepNum - 1]?.peopleSeq === stepNum
        ) {
          await handleUpdate()
          if (!errControl) {
            setStepNum(num + 1)
          }
          reset()
        } else {
          await handleBidderFormSave()
          if (!errControl) {
            setStepNum(num + 1)
          }
          reset()
        }
      }
    }
  }

  const handleUpdateIdNum = (index: number) => {
    setBiddingForm((prev: any) => {
      const newBidIdNum = [...prev.bidIdNum]
      const newBidderType = [...prev?.bidCorpYn]
      if (newBidderType[index] === 'I') {
        const isIdNum = newBidIdNum[index]?.length === 13
        if (!isIdNum) {
          newBidIdNum.splice(index, 1, '')
        }
      } else if (
        newBidderType[index] === 'C' &&
        newBidIdNum[index]?.length !== ''
      ) {
        newBidIdNum.splice(index, 1, '')
      }
      return { ...prev, bidIdNum: newBidIdNum }
    })
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
      // Add more valid options here
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
              checked={biddingForm.bidders[stepNum]?.bidCorpYn === 'I'}
              className="cursor-pointer w-[20px] h-[20px] mt-1 accent-myBlue"
              type="radio"
              onChange={() => {
                setBiddingForm((prev) => ({
                  ...prev,
                  bidders: prev.bidders.map((bidder, idx) => {
                    if (idx === stepNum) {
                      return { ...bidder, bidCorpYn: 'I' }
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
              checked={biddingForm.bidders[stepNum]?.bidCorpYn === 'C'}
              name="bidderType"
              className="cursor-pointer w-[20px] h-[20px] mt-1 accent-myBlue"
              type="radio"
              onChange={() => {
                setBiddingForm((prev) => ({
                  ...prev,
                  bidders: prev.bidders.map((bidder, idx) => {
                    if (idx === stepNum) {
                      return { ...bidder, bidCorpYn: 'C' }
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
        <form
          onSubmit={handleSubmit(async () => {
            await onSubmit(stepNum)
          })}
          className="flex flex-col md:w-[550px] w-[80%] h-[60%] justify-center items-center overflow-y-auto overflow-x-hidden relative"
        >
          <div className="flex flex-col w-[100%] gap-2 absolute top-0">
            <div className="flex flex-col w-[100%] gap-1">
              <div className="flex justify-between w-[100%]">
                {errors.bidderName?.type == 'required' ? (
                  <div className="flex w-[100%] justify-start">
                    <label
                      htmlFor="bidderName"
                      className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500"
                    >
                      {errors.bidderName?.message}
                    </label>
                  </div>
                ) : errors.bidderName?.type == 'minLength' &&
                  biddingForm.bidders[stepNum].name.length < 2 ? (
                  <div className="flex w-[100%] justify-start">
                    <label
                      htmlFor="bidderName"
                      className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500"
                    >
                      {errors.bidderName?.message}
                    </label>
                  </div>
                ) : errors.bidderName?.type == 'maxLength' &&
                  biddingForm.bidders[stepNum].name.length > 10 ? (
                  <div className="flex w-[100%] justify-start">
                    <label
                      htmlFor="bidderName"
                      className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500"
                    >
                      {errors.bidderName?.message}
                    </label>
                  </div>
                ) : (
                  <div className="flex flex-row">
                    {biddingForm.bidders[stepNum]?.bidCorpYn === 'I' ? (
                      <span className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%]">
                        성명
                      </span>
                    ) : (
                      <span className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%]">
                        법인명
                      </span>
                    )}
                    <span className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500">
                      *
                    </span>
                  </div>
                )}
              </div>
              <input
                {...register('bidderName', {
                  required: '이름을 입력해주세요',
                  minLength: {
                    value: 2,
                    message: '2글자 이상 입력해주세요',
                  },
                  maxLength: {
                    value: 10,
                    message: '10글자 이하로 입력해주세요',
                  },
                })}
                value={biddingForm.bidders[stepNum]?.name ?? ''}
                maxLength={10}
                id="bidderName"
                type="text"
                className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left h-[40px] px-2 leading-[135%] tracking-[-2%]"
                placeholder={`${
                  biddingForm.bidders[stepNum]?.bidCorpYn === 'I'
                    ? '성명'
                    : '법인명'
                }을 입력해주세요`}
                onChange={(e) => {
                  setBiddingForm((prev: any) => {
                    const temp = prev.bidName
                    temp[stepNum - 1] = e.target.value
                    return { ...prev, bidName: temp }
                  })
                  if (biddingForm.bidders[stepNum].name.length > 10) {
                    setBiddingForm((prev: any) => {
                      const temp = prev.bidName
                      temp[stepNum - 1] = e.target.value.slice(0, 10)
                      return { ...prev, bidName: temp }
                    })
                  }
                  handleInputChange(e)
                }}
              />
            </div>
            <div className="flex flex-col w-[100%] gap-1">
              <div className="flex justify-between w-[100%]">
                {(errors.bidderPhone1?.type === 'required' ||
                  errors.bidderPhone2?.type === 'required' ||
                  errors.bidderPhone3?.type === 'required') &&
                biddingForm.bidders[stepNum]?.phoneNo1 +
                  biddingForm.bidders[stepNum]?.phoneNo2 +
                  biddingForm.bidders[stepNum]?.phoneNo3 ===
                  '' ? (
                  <div className="flex w-[100%] justify-start">
                    <span className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500">
                      전화번호를 입력해주세요
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-row justify-start w-[100%]">
                    <label
                      htmlFor="bidderPhone"
                      className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left"
                    >
                      전화번호
                    </label>
                    <span className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left text-red-500">
                      *
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-row gap-[0.5%]">
                <input
                  {...register('bidderPhone1', { required: true })}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value
                      .replace(/[^0-9.]/g, '')
                      .replace(/(\..*)\./g, '$1')
                  }}
                  type="text"
                  id="bidderPhone1"
                  inputMode="numeric"
                  maxLength={3}
                  placeholder="010"
                  className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold font-['suit'] leading-[135%] tracking-[-2%] not-italic h-[40px] px-2 w-[33%] text-center"
                  value={biddingForm.bidders[stepNum]?.phoneNo1 ?? ''}
                  onChange={(e) => {
                    handlePhoneFocusMove(e.target)
                    handleInputChange(e)
                  }}
                />
                <input
                  {...register('bidderPhone2', {
                    required: true,
                    maxLength: 4,
                  })}
                  type="text"
                  id="bidderPhone2"
                  inputMode="numeric"
                  maxLength={4}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value
                      .replace(/[^0-9.]/g, '')
                      .replace(/(\..*)\./g, '$1')
                  }}
                  placeholder="1234"
                  className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic h-[40px] px-2 w-[33%] text-center"
                  value={biddingForm.bidders[stepNum]?.phoneNo2 ?? ''}
                  onChange={(e) => {
                    handlePhoneFocusMove(e.target)
                    handleInputChange(e)
                  }}
                />
                <input
                  {...register('bidderPhone3', {
                    required: true,
                    maxLength: 4,
                  })}
                  type="text"
                  id="bidderPhone3"
                  inputMode="numeric"
                  maxLength={4}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value
                      .replace(/[^0-9.]/g, '')
                      .replace(/(\..*)\./g, '$1')
                  }}
                  placeholder="5678"
                  className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic h-[40px] px-2 w-[33%] text-center"
                  value={biddingForm.bidders[stepNum]?.phoneNo3 ?? ''}
                  onChange={(e) => {
                    handlePhoneFocusMove(e.target)
                    handleInputChange(e)
                  }}
                />
              </div>
            </div>
            {biddingForm.bidders[stepNum]?.bidCorpYn === 'I' ? (
              <>
                <div className="flex flex-col w-[100%] gap-1">
                  <div className="flex justify-between w-[100%]">
                    {errors.bidderIdNum1?.type === 'required' &&
                    errors.bidderIdNum2?.type === 'required' &&
                    biddingForm.bidders[stepNum]?.idNum1 +
                      biddingForm.bidders[stepNum]?.idNum2 ===
                      '' ? (
                      <div className="flex w-[100%] justify-start h-[15px] mb-[5px]">
                        <span className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left text-red-500">
                          주민등록번호를 입력해주세요
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-row justify-between w-[100%]">
                        <div className="flex flex-row justify-start">
                          <label
                            htmlFor="bidIdNum"
                            className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left"
                          >
                            주민등록번호
                          </label>
                        </div>
                        <div>
                          <span className="hidden md:flex md:text-[15px] text-[0.8rem] font-light leading-[135%] tracking-[-3%] font-['suit'] not-italic text-left text-red-500">
                            주민등록번호는 별도로 저장되지 않습니다
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row gap-[5%] relative">
                    <input
                      {...register('bidderIdNum1', {
                        maxLength: 6,
                      })}
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value
                          .replace(/[^0-9.]/g, '')
                          .replace(/(\..*)\./g, '$1')
                      }}
                      type="text"
                      id="bidderIdNum1"
                      inputMode="numeric"
                      autoComplete="off"
                      maxLength={6}
                      className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic h-[40px] px-2 w-[45%] text-center"
                      value={biddingForm.bidders[stepNum]?.idNum1 ?? ''}
                      onChange={(e) => {
                        setBiddingForm((prev: any) => {
                          const temp = prev.bidIdNum1
                          temp[stepNum - 1] = e.target.value
                          return { ...prev, bidIdNum1: temp }
                        })
                        setBiddingForm((prev: any) => {
                          const temp = prev.bidIdNum
                          temp[stepNum - 1] =
                            e.target.value + biddingForm.bidders[stepNum].idNum2
                          return { ...prev, bidIdNum: temp }
                        })
                        handleIdNumFocusMove(e.target)
                        handleInputChange(e)
                        if (biddingForm.bidders[stepNum].idNum1.length > 6) {
                          setBiddingForm((prev: any) => {
                            const temp = prev.bidIdNum1
                            temp[stepNum - 1] = e.target.value.slice(0, 6)
                            return { ...prev, bidIdNum1: temp }
                          })
                        }
                      }}
                    />
                    <span className="flex text-mygray font-['suit'] font-bold mt-1">
                      -
                    </span>
                    <input
                      {...register('bidderIdNum2', {
                        maxLength: 7,
                      })}
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value
                          .replace(/[^0-9.]/g, '')
                          .replace(/(\..*)\./g, '$1')
                      }}
                      id="bidderIdNum2"
                      inputMode="numeric"
                      autoComplete="off"
                      type={`${!passwordActive ? 'password' : 'text'}`}
                      maxLength={7}
                      className="flex justify-center items-center border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[150%] tracking-[-1%] font-['suit'] not-italic h-[40px] px-2 w-[45%] text-center"
                      value={biddingForm.bidders[stepNum]?.idNum2 ?? ''}
                      onChange={(e) => {
                        handleInputChange(e)
                        if (biddingForm.bidders[stepNum]?.idNum2.length > 7) {
                          setBiddingForm((prev: any) => {
                            const temp = prev.bidIdNum2
                            temp[stepNum - 1] = e.target.value.slice(0, 7)
                            return { ...prev, bidIdNum2: temp }
                          })
                        }
                      }}
                    />
                    <div
                      className="flex items-center absolute rigth-0 top-[10px] md:left-[95%] left-[93%] md:w-[10%] w-[15%] cursor-pointer"
                      onClick={() => setPasswordActive(!passwordActive)}
                      style={{
                        zIndex: 10,
                      }}
                    >
                      {passwordActive ? (
                        <LiaEyeSolid className="cursor-pointer" size={'35%'} />
                      ) : (
                        <LiaEyeSlashSolid
                          className="cursor-pointer"
                          size={'35%'}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col w-[100%] gap-1">
                  <div className="flex justify-between w-[100%]">
                    {(errors.bidderCorpNum1?.type === 'required' ||
                      errors.bidderCorpNum2?.type === 'required' ||
                      errors.bidderCorpNum3?.type === 'required') &&
                    biddingForm.bidders[stepNum]?.companyNo === '' ? (
                      <div className="flex w-[100%] justify-start mb-1">
                        <span className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left text-red-500">
                          사업자등록번호를 입력해주세요
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-row justify-start w-[100%]">
                        <label
                          htmlFor="bidCorpNum"
                          className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left"
                        >
                          사업자 등록번호
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row gap-[5%]">
                    <input
                      {...register('bidderCorpNum1', {
                        maxLength: 3,
                      })}
                      type="text"
                      id="bidderCorpNum1"
                      inputMode="numeric"
                      placeholder="123"
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value
                          .replace(/[^0-9.]/g, '')
                          .replace(/(\..*)\./g, '$1')
                      }}
                      maxLength={3}
                      className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic h-[40px] px-2 w-[30%] text-center"
                      value={biddingForm.bidders[stepNum]?.companyNo1 ?? ''}
                      onChange={(e) => {
                        handleCorpNumFocusMove(e.target)
                        handleInputChange(e)
                      }}
                    />
                    <span className="flex text-mygray font-['suit'] font-bold mt-1">
                      -
                    </span>
                    <input
                      {...register('bidderCorpNum2', {
                        maxLength: 2,
                      })}
                      type="text"
                      id="bidderCorpNum2"
                      inputMode="numeric"
                      placeholder="45"
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value
                          .replace(/[^0-9.]/g, '')
                          .replace(/(\..*)\./g, '$1')
                      }}
                      maxLength={2}
                      className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic h-[40px] px-2 w-[30%] text-center"
                      value={biddingForm.bidders[stepNum]?.companyNo2 ?? ''}
                      onChange={(e) => {
                        handleCorpNumFocusMove(e.target)
                        handleInputChange(e)
                      }}
                    />
                    <span className="flex text-mygray font-['suit'] font-bold mt-1">
                      -
                    </span>
                    <input
                      {...register('bidderCorpNum3', {
                        maxLength: 5,
                      })}
                      type="text"
                      id="bidderCorpNum3"
                      inputMode="numeric"
                      placeholder="67890"
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value
                          .replace(/[^0-9.]/g, '')
                          .replace(/(\..*)\./g, '$1')
                      }}
                      maxLength={5}
                      className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic h-[40px] px-2 w-[30%] text-center"
                      value={biddingForm.bidders[stepNum]?.companyNo3 ?? ''}
                      onChange={(e) => {
                        handleCorpNumFocusMove(e.target)
                        handleInputChange(e)
                      }}
                    />
                  </div>
                  <div className="flex flex-col w-[100%] gap-1 mt-1">
                    <div className="flex justify-between w-[100%]">
                      {(errors.bidderCorpRegiNum1?.type === 'required' ||
                        errors.bidderCorpRegiNum2?.type === 'required') &&
                      biddingForm.bidders[stepNum]?.corporationNo === '' ? (
                        <div className="flex w-[100%] justify-start mb-1">
                          <span className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left text-red-500">
                            법인 등록번호를 입력해주세요
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-row justify-start w-[100%]">
                          <label
                            htmlFor="bidCorpRegiNum"
                            className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left"
                          >
                            법인 등록번호
                          </label>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row gap-[5%]">
                      <input
                        {...register('bidderCorpRegiNum1', {
                          maxLength: 6,
                        })}
                        type="text"
                        id="bidderCorpRegiNum1"
                        inputMode="numeric"
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value
                            .replace(/[^0-9.]/g, '')
                            .replace(/(\..*)\./g, '$1')
                        }}
                        maxLength={6}
                        placeholder="123456"
                        className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic h-[40px] px-2 w-[50%] text-center"
                        value={
                          biddingForm.bidders[stepNum]?.corporationNo1 ?? ''
                        }
                        onChange={(e) => {
                          handleCorpRegiNumFocusMove(e.target)
                          handleInputChange(e)
                        }}
                      />
                      <span className="flex text-mygray font-['suit'] font-bold mt-1">
                        -
                      </span>
                      <input
                        {...register('bidderCorpRegiNum2', {
                          maxLength: 7,
                        })}
                        type="text"
                        id="bidderCorpRegiNum2"
                        inputMode="numeric"
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value
                            .replace(/[^0-9.]/g, '')
                            .replace(/(\..*)\./g, '$1')
                        }}
                        maxLength={7}
                        placeholder="1234567"
                        className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic h-[40px] px-2 w-[50%] text-center"
                        value={
                          biddingForm.bidders[stepNum]?.corporationNo2 ?? ''
                        }
                        onChange={(e) => {
                          setBiddingForm((prev) => ({
                            ...prev,
                            bidders: prev.bidders.map((bidder, idx) =>
                              idx === stepNum
                                ? {
                                    ...bidder,
                                    corporationNo2: e.target.value,
                                  }
                                : bidder,
                            ),
                          }))
                          handleInputChange(e)
                        }}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            <div
              className={`flex flex-col w-[100%] h-[100%] bg-mybg gap-1 relative`}
            >
              {biddingForm.agentYn === 'Y' &&
                biddingForm.bidders[stepNum]?.bidCorpYn !== 'C' && (
                  <div className="flex flex-col w-[100%] gap-1">
                    <div className="flex justify-between w-[100%]">
                      <div className="flex flex-row justify-start w-[100%]">
                        <label
                          htmlFor="bidderJob"
                          className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left"
                        >
                          직업
                        </label>
                      </div>
                    </div>
                    <input
                      value={biddingForm.bidders[stepNum].job ?? ''}
                      type="text"
                      maxLength={10}
                      className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left h-[40px] px-2"
                      placeholder="직업을 입력해주세요(예: 회사원, 농부)"
                      onChange={(e) => {
                        setBiddingForm((prev: any) => {
                          const temp = prev.bidJob
                          temp[stepNum - 1] = e.target.value
                          return { ...prev, bidJob: temp }
                        })
                        if (biddingForm.bidders[stepNum].job.length > 10) {
                          setBiddingForm((prev: any) => {
                            const temp = prev.bidJob
                            temp[stepNum - 1] = e.target.value.slice(0, 10)
                            return { ...prev, bidJob: temp }
                          })
                        }
                      }}
                    />
                  </div>
                )}
              <SearchAddress
                stepNum={stepNum}
                register={register}
                errors={errors}
                setError={setError}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                setValue={setValue}
              />
            </div>
          </div>
          <div
            className={`flex flex-row fixed gap-[10px] md:w-[550px] w-[90%] ${
              biddingForm.bidders[stepNum]?.bidCorpYn === 'I'
                ? 'md:bottom-[80px] bottom-[10px]'
                : 'md:bottom-[80px] bottom-[10px]'
            }`}
          >
            <button
              type="button"
              className="flex w-[35%] h-[50px] bg-prevBtn rounded-full justify-center items-center cursor-pointer"
              onClick={() => {
                {
                  stepNum === 0
                    ? setStateNum(stateNum - 1)
                    : setStepNum(stepNum - 1)
                }
              }}
            >
              <span className="text-sutTitle font-bold font-['suit'] md:text-[1.2rem] text-[1rem]">
                이전으로
              </span>
            </button>
            <button
              type="submit"
              className="flex w-[60%] md:w-[65%] h-[50px] bg-myBlue rounded-full justify-center items-center cursor-pointer"
            >
              <span className="text-white font-bold font-['suit'] md:text-[1.2rem] text-[1rem]">
                다음으로
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
