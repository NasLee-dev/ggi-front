import { biddingInfoState, stepState } from '@/store/atom/bid-form'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Button from '../shared/Button'
import Spinner from '../icons/Spinner'
import usePutShares from './hooks/usePutShares'

export default function ShareInfo() {
  const [biddingForm, setBiddingForm] = useRecoilState(biddingInfoState)
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [isDataIn, setIsDataIn] = useState([])
  const [goNext, setGoNext] = useState<boolean>(false)
  const [loadding, setLoadding] = useState<boolean>(false)
  const [shareList, setShareList] = useState({
    shareList: Array(biddingForm.bidderCount).fill({
      peopleSeq: 0,
      name: '',
      share: '',
    }),
  })

  const putShares = usePutShares(
    biddingForm.mstSeq.toString(),
    biddingForm.bidderCount,
    shareList.shareList,
  )

  const handleShareList = () => {
    const numerator = (
      document && (document.getElementById('numerator') as HTMLInputElement)
    )?.value
    const denominator = (
      document && (document.getElementById('denominator') as HTMLInputElement)
    )?.value

    const temp = [...shareList.shareList]
    if (biddingForm.shareWay === 'S') {
      for (let i = 0; i < biddingForm.bidderCount; i++) {
        temp[i] = {
          peopleSeq: i + 1,
          name: biddingForm.bidders[i].name ?? '',
          share: '1/' + biddingForm.bidderCount.toString(),
        }
      }
      setShareList({
        ...shareList,
        shareList: temp,
      })
    } else {
      for (let i = 0; i < biddingForm.bidderCount; i++) {
        temp[i] = {
          peopleSeq: i + 1,
          name: biddingForm.bidders[i].name ?? '',
          share: biddingForm.numerator[i] + '/' + biddingForm.denominator[i],
        }
      }
      setShareList({
        ...shareList,
        shareList: temp,
      })
    }
  }

  const handleValidate = () => {
    let valid = 0
    const numerator = (
      document && (document.getElementById('numerator') as HTMLInputElement)
    )?.value
    const denominator = (
      document && (document.getElementById('denominator') as HTMLInputElement)
    )?.value
    if (numerator === '' || denominator === '' || biddingForm.shareWay === '') {
      alert('지분을 확인해주세요')
      setGoNext(true)
      return
    } else if (biddingForm.shareWay === 'N') {
      for (let i = 0; i < biddingForm.bidderCount; i++) {
        valid += parseInt(shareList.shareList[i].share)
      }
      if (valid !== parseInt(denominator)) {
        setGoNext(true)
      } else {
        setGoNext(false)
        handlePutShare()
      }
    } else {
      setGoNext(false)
      handlePutShare()
    }
  }

  const handlePutShare = () => {
    putShares.mutate({
      mstSeq: biddingForm.mstSeq.toString(),
      bidderCount: biddingForm.bidderCount,
      shares: shareList.shareList,
    })
  }

  useEffect(() => {
    handleShareList()
  }, [biddingForm.shareWay])

  useEffect(() => {
    const handleSyncBiddingForm = async () => {
      setLoadding(true)
      try {
        const response = await axios.get(
          `/ggi/api/bid-form/${biddingForm.mstSeq}`,
        )
        if (response.data.success) {
          setIsDataIn(response.data.data.bidders)
          setBiddingForm((prev) => ({
            ...prev,
            bidders: response.data.data.bidders,
            denominator:
              biddingForm.shareWay === 'S'
                ? Array(biddingForm.bidderCount).fill(
                    biddingForm.bidderCount.toString(),
                  )
                : response.data.data?.bidders?.map(
                    (item: any) => item.share?.split('/')[1],
                  ),
            numerator:
              biddingForm.shareWay === 'S'
                ? Array(biddingForm.bidderCount).fill('1')
                : response.data.data?.bidders?.map(
                    (item: any) => item.share?.split('/')[0],
                  ),
          }))
          setLoadding(false)
        }
      } catch (error) {
        console.log(error)
        setLoadding(false)
      }
    }
    handleSyncBiddingForm()
    handleShareList()
  }, [])

  const handlePrevStep = () => {
    if (biddingForm.agentYn === 'Y' && biddingForm.bidders.length > 1) {
      setStateNum(19)
    } else {
      setStateNum(16)
    }
  }

  useEffect(() => {
    let valid = 0
    for (let i = 0; i < biddingForm.bidderCount; i++) {
      valid += parseInt(biddingForm.numerator[i])
      if (valid !== parseInt(biddingForm.denominator[0])) {
        setGoNext(true)
      } else {
        setGoNext(false)
      }
    }
  }, [biddingForm.numerator, biddingForm.denominator])

  return (
    <div className={`flex w-screen bg-mybg justify-center relative`}>
      <div className="flex flex-col w-[100%] h-[100vh] bg-mybg items-center text-center pt-[50px] gap-[25px]">
        <span className="md:text-[32.5px] text-[20px] font-bold font-['suit'] not-italic leading-[135%] tracking-[-1%]">
          입찰자의 지분을 입력해주세요
        </span>
        <div className="flex flex-row gap-[20px] md:w-[550px] w-[90%] justify-center items-center">
          <div className="flex flex-row gap-[5px]">
            <input
              id="shareWay"
              name="shareWay"
              checked={biddingForm.shareWay === 'S' ?? false}
              className="cursor-pointer w-[15px] accent-myBlue"
              type="radio"
              onChange={() => {
                setBiddingForm({
                  ...biddingForm,
                  shareWay: 'S',
                  numerator: Array(biddingForm.bidderCount).fill('1'),
                })
              }}
            />
            <label>
              <span className="md:text-[20px] text-[16px] font-normal font-['suit'] leading-[135%] tracking-[-2%] not-italic text-left">
                균등배분
              </span>
            </label>
          </div>
          <div className="flex flex-row gap-[5px]">
            <input
              id="shareWay"
              className="cursor-pointer w-[15px] accent-myBlue"
              checked={biddingForm.shareWay === 'N' ?? false}
              name="shareWay"
              type="radio"
              onChange={() => {
                setBiddingForm({
                  ...biddingForm,
                  shareWay: 'N',
                  denominator: Array(biddingForm.bidderCount).fill('100'),
                })
              }}
            />
            <label>
              <span className="md:text-[20px] text-[16px] font-normal font-['suit'] leading-[135%] tracking-[-2%] not-italic text-left">
                직접입력
              </span>
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[10px] md:w-[550px] w-[90%] h-[500px] absolute top-[150px] items-center rounded-lg border-slate-500 pt-[25px] pb-[25px] overflow-auto bg-mybg">
        {loadding && <Spinner />}
        {isDataIn &&
          isDataIn.length > 0 &&
          biddingForm.bidders.map((bidder, index) => {
            return (
              <div
                key={index}
                className="flex flex-row gap-[25%] w-[100%] h-[100px] bg-white border-solid border-[1px] rounded-lg relative"
              >
                <div className="flex flex-col w-[40%] justify-center items-start ml-5">
                  <span
                    className="md:text-[17px] text-[15px] font-['suit'] leading-[135%] tracking-[0px] font-normal"
                    style={{
                      color: '#545492',
                    }}
                  >
                    {'#' + (index + 1)}
                  </span>
                  <span className="md:text-[20px] text-[16px] font-['suit'] leading-[140%] tracking-[-1%] font-normal overflow-hidden overflow-ellipsis whitespace-nowrap w-[100%]">
                    {bidder.name +
                      (bidder.bidderType === 'I' ? ' (개인)' : ' (법인)')}
                  </span>
                </div>
                <div
                  className={`flex flex-row gap-[10px] w-[95px] justify-center absolute top-[50%] ${
                    biddingForm.shareWay === 'S'
                      ? 'border-solid border-b-[0.5px] border-b-sutTitle'
                      : 'md:mr-[50px] mr-[25px]'
                  } transform translate-y-[-50%] right-5 mt-[10px]`}
                >
                  {biddingForm.shareWay === 'S' ? (
                    <>
                      <input
                        id="numerator"
                        type="text"
                        readOnly
                        value={'1'}
                        className={`rounded-md md:text-[20px] text-[15px] font-['suit'] leading-[140%] tracking-[0px] not-italic font-normal text-center text-sutTitle w-[20px] bg-white border-none focus:border-transparent focus:outline-none`}
                      />
                      <span className="flex mt-[5px]">/</span>
                      <input
                        aria-label="denominator"
                        id="denominator"
                        type="text"
                        readOnly
                        value={biddingForm.bidderCount}
                        className="rounded-md md:text-[20px] text-[15px] font-['suit'] leading-[140%] tracking-[0px] not-italic font-normal text-center text-sutTitle w-[20px] bg-white border-none focus:border-transparent focus:outline-none"
                      />
                    </>
                  ) : (
                    <>
                      <input
                        id="numerator"
                        type="text"
                        inputMode="numeric"
                        value={
                          shareList.shareList[index]?.share?.split('/')[0] ===
                          'undefined'
                            ? '1'
                            : shareList.shareList[index]?.share?.split('/')[0]
                        }
                        className={` ${
                          biddingForm.shareWay === 'N' && goNext
                            ? 'text-red-500'
                            : ''
                        } rounded-md md:text-[20px] text-[16px] font-['suit'] leading-[150%] tracking-[-1%] p-[10px] not-italic font-semibold text-center md:h-[40px] md:w-[80px] w-[60px] h-[30px] border-[1px] border-sutTitle focus:border-sutTitle `}
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value
                            .replace(/[^0-9.]/g, '')
                            .replace(/(\..*)\./g, '$1')
                        }}
                        onChange={(e) => {
                          const temp = [...shareList.shareList]
                          temp[index] = {
                            ...temp[index],
                            share:
                              e.target.value +
                              '/' +
                              (
                                document &&
                                (document.getElementById(
                                  'denominator',
                                ) as HTMLInputElement)
                              )?.value,
                          }
                          setShareList({
                            ...shareList,
                            shareList: temp,
                          })
                          setBiddingForm({
                            ...biddingForm,
                            numerator: temp.map(
                              (item: any) => item.share?.split('/')[0],
                            ),
                          })
                        }}
                      />
                      <span className="md:mt-2 mt-1">/</span>
                      <input
                        readOnly
                        id="denominator"
                        type="text"
                        inputMode="numeric"
                        value={100}
                        className={`rounded-md md:text-[20px] text-[16px] font-['suit'] leading-[150%] tracking-[-1%] p-[10px] text-center md:h-[40px] md:w-[80px] w-[60px] h-[30px] border border-sutTitle`}
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value
                            .replace(/[^0-9.]/g, '')
                            .replace(/(\..*)\./g, '$1')
                        }}
                        onChange={(e) => {
                          const temp = [...shareList.shareList]
                          temp[index] = {
                            ...temp[index],
                            share:
                              (
                                document &&
                                (document.getElementById(
                                  'numerator',
                                ) as HTMLInputElement)
                              )?.value +
                              '/' +
                              e.target.value,
                          }
                          setShareList({
                            ...shareList,
                            shareList: temp,
                          })
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
            )
          })}
        {biddingForm.shareWay === 'N' && goNext ? (
          <div className="flex w-[100%] flex-row-reverse">
            <span className="md:text-[18px] text-[0.8rem] font-['suit'] font-light leading-[135%] tracking-[-1%] text-red-500 text-right">
              지분의 합은 100이어야 합니다
            </span>
          </div>
        ) : biddingForm.shareWay === 'N' && !goNext ? null : null}
      </div>
      <Button
        nextText="다음으로"
        handleNextStep={handleValidate}
        handlePrevStep={handlePrevStep}
      />
    </div>
  )
}
