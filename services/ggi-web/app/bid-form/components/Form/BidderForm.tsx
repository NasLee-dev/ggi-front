import { biddingInfoState, stepState } from '@/store/atom/bid-form'
import { BiddingInfoType } from 'app/bid-form/models/Bidder'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetError,
  UseFormSetFocus,
  UseFormSetValue,
} from 'react-hook-form'
import { LiaEyeSlashSolid, LiaEyeSolid } from 'react-icons/lia'
import { useRecoilState } from 'recoil'
import SearchAddress from './address/SearchAddress'

interface BidderFormProps {
  stepNum: number
  setStepNum: Dispatch<SetStateAction<number>>
  setError: UseFormSetError<BiddingInfoType>
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  setValue: UseFormSetValue<BiddingInfoType>
  onSubmit: SubmitHandler<any>
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  errors: FieldErrors<BiddingInfoType>
  setFocus: UseFormSetFocus<BiddingInfoType>
  register: UseFormRegister<BiddingInfoType>
  handleSubmit: UseFormHandleSubmit<BiddingInfoType>
}

export default function BidderForm({
  stepNum,
  setStepNum,
  setError,
  isOpen,
  onOpen,
  onClose,
  setValue,
  onSubmit,
  handleInputChange,
  errors,
  setFocus,
  register,
  handleSubmit,
}: BidderFormProps) {
  const [biddingForm, setBiddingForm] = useRecoilState(biddingInfoState)
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [passwordActive, setPasswordActive] = useState(false)

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
  return (
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
              setBiddingForm((prev) => ({
                ...prev,
                bidders: prev.bidders.map((bidder, idx) => {
                  if (idx === stepNum) {
                    return { ...bidder, name: e.target.value }
                  }
                  return bidder
                }),
              }))
              if (biddingForm.bidders[stepNum].name.length > 10) {
                setBiddingForm((prev) => ({
                  ...prev,
                  bidders: prev.bidders.map((bidder, idx) => {
                    if (idx === stepNum) {
                      return {
                        ...bidder,
                        name: e.target.value.slice(0, 10),
                      }
                    }
                    return bidder
                  }),
                }))
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
                setBiddingForm((prev) => ({
                  ...prev,
                  bidders: prev.bidders.map((bidder, idx) => {
                    if (idx === stepNum) {
                      return {
                        ...bidder,
                        phoneNo:
                          e.target.value + bidder.phoneNo2 + bidder.phoneNo3,
                        phoneNo1: e.target.value,
                      }
                    }
                    return bidder
                  }),
                }))
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
                setBiddingForm((prev) => ({
                  ...prev,
                  bidders: prev.bidders.map((bidder, idx) => {
                    if (idx === stepNum) {
                      return {
                        ...bidder,
                        phoneNo:
                          bidder.phoneNo1 + e.target.value + bidder.phoneNo3,
                        phoneNo2: e.target.value,
                      }
                    }
                    return bidder
                  }),
                }))
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
                setBiddingForm((prev) => ({
                  ...prev,
                  bidders: prev.bidders.map((bidder, idx) => {
                    if (idx === stepNum) {
                      return {
                        ...bidder,
                        phoneNo:
                          bidder.phoneNo1 + bidder.phoneNo2 + e.target.value,
                        phoneNo3: e.target.value,
                      }
                    }
                    return bidder
                  }),
                }))
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
                    setBiddingForm((prev) => ({
                      ...prev,
                      bidders: prev.bidders.map((bidder, idx) => {
                        if (idx === stepNum) {
                          return { ...bidder, idNum1: e.target.value }
                        }
                        return bidder
                      }),
                    }))
                    handleIdNumFocusMove(e.target)
                    handleInputChange(e)
                    if (biddingForm.bidders[stepNum].idNum1.length > 6) {
                      setBiddingForm((prev) => ({
                        ...prev,
                        bidders: prev.bidders.map((bidder, idx) => {
                          if (idx === stepNum) {
                            return {
                              ...bidder,
                              idNum1: e.target.value.slice(0, 6),
                            }
                          }
                          return bidder
                        }),
                      }))
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
                    setBiddingForm((prev) => ({
                      ...prev,
                      bidders: prev.bidders.map((bidder, idx) => {
                        if (idx === stepNum) {
                          return { ...bidder, idNum2: e.target.value }
                        }
                        return bidder
                      }),
                    }))
                    handleInputChange(e)
                    if (biddingForm.bidders[stepNum]?.idNum2.length > 7) {
                      setBiddingForm((prev) => ({
                        ...prev,
                        bidders: prev.bidders.map((bidder, idx) => {
                          if (idx === stepNum) {
                            return {
                              ...bidder,
                              idNum2: e.target.value.slice(0, 7),
                            }
                          }
                          return bidder
                        }),
                      }))
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
                    <LiaEyeSlashSolid className="cursor-pointer" size={'35%'} />
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
                    setBiddingForm((prev) => ({
                      ...prev,
                      bidders: prev.bidders.map((bidder, idx) => {
                        if (idx === stepNum) {
                          return {
                            ...bidder,
                            companyNo:
                              e.target.value +
                              bidder.companyNo2 +
                              bidder.companyNo3,
                            companyNo1: e.target.value,
                          }
                        }
                        return bidder
                      }),
                    }))
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
                    setBiddingForm((prev) => ({
                      ...prev,
                      bidders: prev.bidders.map((bidder, idx) => {
                        if (idx === stepNum) {
                          return {
                            ...bidder,
                            companyNo:
                              bidder.companyNo1 +
                              e.target.value +
                              bidder.companyNo3,
                            companyNo2: e.target.value,
                          }
                        }
                        return bidder
                      }),
                    }))
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
                    setBiddingForm((prev) => ({
                      ...prev,
                      bidders: prev.bidders.map((bidder, idx) => {
                        if (idx === stepNum) {
                          return {
                            ...bidder,
                            companyNo:
                              bidder.companyNo1 +
                              bidder.companyNo2 +
                              e.target.value,
                            companyNo3: e.target.value,
                          }
                        }
                        return bidder
                      }),
                    }))
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
                    value={biddingForm.bidders[stepNum]?.corporationNo1 ?? ''}
                    onChange={(e) => {
                      setBiddingForm((prev) => ({
                        ...prev,
                        bidders: prev.bidders.map((bidder, idx) => {
                          if (idx === stepNum) {
                            return {
                              ...bidder,
                              corporationNo:
                                e.target.value + bidder.corporationNo2,
                              corporationNo1: e.target.value,
                            }
                          }
                          return bidder
                        }),
                      }))
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
                    value={biddingForm.bidders[stepNum]?.corporationNo2 ?? ''}
                    onChange={(e) => {
                      setBiddingForm((prev) => ({
                        ...prev,
                        bidders: prev.bidders.map((bidder, idx) => {
                          if (idx === stepNum) {
                            return {
                              ...bidder,
                              corporationNo:
                                bidder.corporationNo1 + e.target.value,
                              corporationNo2: e.target.value,
                            }
                          }
                          return bidder
                        }),
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
                    setBiddingForm((prev) => ({
                      ...prev,
                      bidders: prev.bidders.map((bidder, idx) => {
                        if (idx === stepNum) {
                          return { ...bidder, job: e.target.value }
                        }
                        return bidder
                      }),
                    }))
                    if (biddingForm.bidders[stepNum].job.length > 10) {
                      setBiddingForm((prev) => ({
                        ...prev,
                        bidders: prev.bidders.map((bidder, idx) => {
                          if (idx === stepNum) {
                            return {
                              ...bidder,
                              job: e.target.value.slice(0, 10),
                            }
                          }
                          return bidder
                        }),
                      }))
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
  )
}
