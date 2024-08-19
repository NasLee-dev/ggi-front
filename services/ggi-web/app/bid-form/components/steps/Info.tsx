import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { useInfoApi } from './hooks/useInfoApi'
import { biddingInfoState, stepState } from '@/store/atom/bid-form'
import { useCallback, useEffect, useState } from 'react'
import { authInfo } from '@/store/atom/auth'
import Spinner from '../icons/Spinner'
import Button from '../shared/Button'
import { TempData } from '@/models/bid-form/Info'

export default function Info() {
  const { getInfoMstSeq, getCase, getInit } = useInfoApi()
  const auth = useRecoilValue(authInfo)
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [biddingForm, setBiddingForm] = useRecoilState(biddingInfoState)
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState({
    infoId: '',
    caseNo: '',
    mulSeq: '',
  })
  const [tempData, setTempData] = useState<TempData | null>(null)
  const resetBIddingForm = useResetRecoilState(biddingInfoState)

  const handleGetCaseCheck = useCallback(
    async (infoId: string, caseNo: string, mulSeq: string) => {
      setLoading(true)
      try {
        const response = await getCase.mutateAsync({ infoId, caseNo, mulSeq })
        if (response) {
          setLoading(false)
          setBiddingForm((prev) => ({
            ...prev,
            ...response,
          }))
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    },
    [],
  )

  const handleGetMstCaseCheck = useCallback(async () => {
    try {
      const response = await getInfoMstSeq.mutateAsync({
        mstSeq: auth.mstSeq,
      })
      if (response) {
        //  중간 저장 후 다시 접속하여 정보를 불러올 때 정보가 다를 경우 초기화
        setInfo({
          infoId: response.infoId,
          caseNo: response.caseNo,
          mulSeq: response.mulSeq,
        })
        setTempData(response)
      } else {
        alert('사건 정보가 잘못되었습니다. 다시 시도해주세요.')
        window.close()
      }
    } catch (error) {
      console.log(error)
    }
  }, [auth.mstSeq])

  const handleGetInfo = async () => {
    if (
      biddingForm.mstSeq > 0 &&
      biddingForm.infoId != '' &&
      biddingForm.caseNo != '' &&
      biddingForm.mulSeq != ''
    ) {
      try {
        const response = await getInfoMstSeq.mutateAsync({
          mstSeq: biddingForm.mstSeq.toString(),
        })
        if (response) {
          setInfo({
            infoId: response.infoId,
            caseNo: response.caseNo,
            mulSeq: response.mulSeq,
          })
          setTempData(response)
        } else {
          alert('사건 정보가 잘못되었습니다. 다시 시도해주세요.')
          window.close()
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    const fetchBidFormInfo = async () => {
      if (auth.mstSeq) {
        handleGetMstCaseCheck()
      } else {
        handleGetCaseCheck(
          biddingForm.infoId,
          biddingForm.caseNo,
          biddingForm.mulSeq,
        )
        handleGetInfo()
      }
    }
    fetchBidFormInfo()
  }, [auth.mstSeq, handleGetCaseCheck, handleGetMstCaseCheck])

  const handleReset = () => {
    const infoId = biddingForm.infoId
    const caseNo = biddingForm.caseNo
    const mulSeq = biddingForm.mulSeq
    const caseYear = biddingForm.caseYear
    const caseDetail = biddingForm.caseDetail
    const searchResults = biddingForm.searchResults
    const selectedCase = biddingForm.selectedCase
    resetBIddingForm()
    setBiddingForm((prev) => ({
      ...prev,
      infoId: infoId,
      caseNo: caseNo,
      mulSeq: mulSeq,
      caseYear: caseYear,
      caseDetail: caseDetail,
      searchResults: searchResults,
      selectedCase: selectedCase,
    }))
  }

  const handleConfirm = async () => {
    setLoading(true)

    const isInfoSame =
      info.infoId === biddingForm.infoId &&
      info.caseNo === biddingForm.caseNo &&
      info.mulSeq === biddingForm.mulSeq

    const processResponse = (response) => {
      if (response) {
        setBiddingForm((prev) => ({
          ...prev,
          mstSeq: response.mstSeq,
          state: response.state,
          selectedTime: biddingForm.biddingInfos[0].biddingTime,
        }))

        const nextStateNum =
          biddingForm.biddingInfos.length > 1 ? stateNum + 1 : stateNum + 2
        setTimeout(() => {
          setStateNum(nextStateNum)
          setLoading(false)
        }, 1000)
      }
    }

    try {
      if (biddingForm.mstSeq !== 0) {
        if (isInfoSame) {
          setStateNum(stateNum + 2)
        } else if (
          window &&
          window.confirm(
            '사건번호가 달라지면 입찰 정보가 초기화됩니다. 진행하시겠습니까?',
          )
        ) {
          handleReset()
          const response = await getInit.mutateAsync({
            infoId: biddingForm.infoId,
            caseNo: biddingForm.caseNo,
            mulSeq: biddingForm.mulSeq,
            biddingDate: biddingForm.biddingDate,
            biddingTime: biddingForm.biddingInfos[0].biddingTime,
          })
          processResponse(response)
        } else {
          setLoading(false)
          return
        }
      } else {
        const response = await getInit.mutateAsync({
          infoId: biddingForm.infoId,
          caseNo: biddingForm.caseNo,
          mulSeq: biddingForm.mulSeq,
          biddingDate: biddingForm.biddingDate,
          biddingTime: biddingForm.biddingInfos[0].biddingTime,
        })
        processResponse(response)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handlePrevStep = () => {
    if (auth.idCode) {
      setStateNum(0)
    } else {
      setStateNum(stateNum - 1)
      setBiddingForm((prev) => ({
        ...prev,
        searchResultState: 2,
      }))
    }
  }
  console.log(biddingForm)
  const handleNextStep = async () => {
    setLoading(true)
    if (biddingForm.mstSeq === 0) {
      await handleConfirm()
    } else {
      if (biddingForm.biddingInfos.length > 1) {
        setTimeout(() => {
          setStateNum(stateNum + 1)
          setLoading(false)
        }, 1000)
      } else {
        handleConfirm()
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
    }
  }

  return (
    <div className="flex w-[100%] justify-center bg-mybg relative">
      {loading && <Spinner />}
      <div className="flex flex-col w-[100%] bg-mybg items-center text-center md:py-[0px] py-[15px] relative">
        <div className="flex flex-col md:gap-[14px] gap-[6px] pt-[50px]">
          <span className="md:text-[32.5px] text-[20px] leading-[135%] tracking-[-1%] font-bold font-['suit'] not-italic">
            상세 내역을 확인해주세요
          </span>
          <span className="md:text-[18px] text-[16px] leading-[135%] tracking-[-1%] font-normal font-['suit'] not-italic text-sutTitle">
            선택한 경매 사건이 맞는지 체크합니다
          </span>
        </div>
        <div
          className={`flex flex-col md:w-[500px] h-[500px] w-[90%] overflow-y-auto md:gap-[7.5px] gap-[5px] bg-mybg `}
        >
          <div className="flex flex-col relative h-[80px] items-start justify-start bg-white mt-[30px] pt-[16px] pb-[16px] pl-[35px] pr-[35px] gap-[2.5px]">
            <span
              className="font-['suit'] font-medium md:text-[17px] text-[15px] leading-[130%] tracking-[0%]"
              style={{
                color: '#545492',
              }}
            >
              법원
            </span>
            <span
              className="text-black md:text-[20px] text-[16px] font-normal font-['suit'] leading-[135%] tracking-[-1%]"
              style={{
                color: '#181826',
              }}
            >
              {biddingForm.courtFullName}
            </span>
          </div>
          <div className="flex justify-between bg-white pt-[16px] pb-[16px] pl-[35px] pr-[35px] h-[80px]">
            <div className="flex flex-col relative justify-start items-start w-[80%] gap-[2.5px]">
              <span
                className="text-sutTitle font-['suit'] font-medium md:text-[17px] text-[15px] leading-[130%] tracking-[0%]"
                style={{
                  color: '#545492',
                }}
              >
                사건번호
              </span>
              <span
                className="text-black md:text-[20px] text-[16px] font-normal font-['suit'] leading-[135%] tracking-[-1%]"
                style={{
                  color: '#181826',
                }}
              >
                {tempData?.caseNoString === biddingForm.caseNoString
                  ? tempData.caseNoString
                  : biddingForm.caseNoString === ''
                    ? tempData?.caseNoString
                    : biddingForm.caseNoString}
              </span>
            </div>
            <div className="flex flex-col relative justify-start items-start w-[20%] gap-[2.5px]">
              <span
                className="text-sutTitle font-['suit'] font-medium md:text-[17px] text-[15px] leading-[130%] tracking-[0%]"
                style={{
                  color: '#545492',
                }}
              >
                물건번호
              </span>
              <span
                className="text-black md:text-[20px] text-[16px] font-normal font-['suit'] leading-[135%] tracking-[-1%]"
                style={{
                  color: '#181826',
                }}
              >
                {tempData?.mulNo === biddingForm.mulNo
                  ? biddingForm.mulNo === ''
                    ? '1'
                    : tempData?.mulNo
                  : biddingForm.mulNo}
              </span>
            </div>
          </div>
          <div className="flex justify-between bg-white h-[80px] p-[20px] pt-[16px] pb-[16px] pl-[35px] pr-[35px]">
            <div className="flex flex-col relative justify-start items-start w-[80%] gap-[2.5px]">
              <span
                className="text-sutTitle font-['suit'] font-medium md:text-[17px] text-[15px] leading-[130%] tracking-[0%]"
                style={{
                  color: '#545492',
                }}
              >
                입찰기일
              </span>
              <span
                className="text-black md:text-[20px] text-[16px] font-normal font-['suit'] leading-[135%] tracking-[-1%]"
                style={{
                  color: '#181826',
                }}
              >
                {biddingForm.biddingDateString}
              </span>
            </div>
            <div className="flex flex-col relative justify-center items-start w-[20%] gap-[2.5px]">
              <span className="text-sutTitle font-['suit'] md:text-[0.9rem] text-[0.8rem] font-bold">
                {' '}
              </span>
              <span
                className="text-black md:text-[20px] text-[16px] font-normal font-['suit'] leading-[135%] tracking-[-1%]"
                style={{
                  color: '#181826',
                }}
              >
                {biddingForm.dayDay}
              </span>
            </div>
          </div>
          {biddingForm.usage === ('차량' || '중기') ? (
            <div className="flex flex-col relative h-[80px] items-start justify-start bg-white p-[20px] pt-[16px] pb-[16px] pl-[35px] pr-[35px] gap-[2.5px]">
              <span
                className="text-sutTitle font-['suit'] font-medium md:text-[17px] text-[15px] leading-[130%] tracking-[0%]"
                style={{
                  color: '#545492',
                }}
              >
                차량정보
              </span>
              <span
                className="text-black md:text-[20px] text-[16px] font-normal font-['suit'] leading-[135%] tracking-[-1%] text-left"
                style={{
                  color: '#181826',
                }}
              >
                {biddingForm.carInfo}
              </span>
            </div>
          ) : null}
          <div className="flex flex-col relative items-start justify-center bg-white pt-[16px] pb-[16px] pl-[35px] pr-[35px] gap-[2.5px]">
            <span
              className="text-sutTitle font-['suit'] font-medium md:text-[17px] text-[15px] leading-[130%] tracking-[0%]"
              style={{
                color: '#545492',
              }}
            >
              물건지 주소
            </span>
            <span
              className="text-black md:text-[20px] text-[16px] font-normal font-['suit'] leading-[135%] tracking-[-1%] text-left"
              style={{
                color: '#181826',
              }}
            >
              {biddingForm.address +
                (biddingForm.etcAddress !== ''
                  ? '[일괄]' + biddingForm.etcAddress
                  : '')}
            </span>
            <span className="text-myBlue md:text-[18px] text-[16px] text-left font-normal leading-[135%] tracking-[-1%] font-['suit'] ">
              {biddingForm.roadAddress}
            </span>
          </div>
        </div>
      </div>
      <Button
        nextText="다음으로"
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
      />
    </div>
  )
}
