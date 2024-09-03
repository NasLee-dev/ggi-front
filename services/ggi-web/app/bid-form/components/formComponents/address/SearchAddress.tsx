'use client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { createPortal } from 'react-dom'
import { biddingInfoState } from '@/store/atom/bid-form'
import ModalAddr from './ModalAddr'
import { AgentProps } from 'app/bid-form/models/Agent'
import { useDisclosure } from '@chakra-ui/react'

type AgentIsDirtyProps = {
  agentName: boolean
  agentRel: boolean
  agentPhone1: boolean
  agentPhone2: boolean
  agentPhone3: boolean
  agentIdNum1: boolean
  agentIdNum2: boolean
  agentAddrDetail: boolean
  agentJob: boolean
  agentAddr: boolean
}

type BidderisDirtyProps = {
  bidderName: boolean
  bidderPhone1: boolean
  bidderPhone2: boolean
  bidderPhone3: boolean
  bidderIdNum1: boolean
  bidderIdNum2: boolean
  bidderAddrDetail: boolean
  bidderCorpNum1: boolean
  bidderCorpNum2: boolean
  bidderCorpNum3: boolean
  bidderCorpRegiNum1: boolean
  bidderCorpRegiNum2: boolean
  bidderJob: boolean
  bidderAddr: boolean
}

interface SearchAddressProps {
  isAgent: boolean
  stepNum?: number
  isDirty?: AgentIsDirtyProps
  setIsDirty?: Dispatch<SetStateAction<AgentIsDirtyProps>>
  bidderIsDirty?: BidderisDirtyProps
  setBidderIsDirty?: Dispatch<SetStateAction<BidderisDirtyProps>>
  agent?: AgentProps | null
}

export default function SearchAddress({
  isAgent,
  stepNum,
  isDirty,
  setIsDirty,
  bidderIsDirty,
  setBidderIsDirty,
  agent,
}: SearchAddressProps) {
  const [portalElement, setPortalElement] = useState<Element | null>(null)
  const [biddingForm, setBiddingForm] = useRecoilState(biddingInfoState)
  const { isOpen, onClose, onOpen } = useDisclosure()

  useEffect(() => {
    setPortalElement(document.getElementById('portal'))
  }, [])

  const handleModal = () => {
    if (isOpen && onClose) {
      onClose()
      setBiddingForm((prev) => ({
        ...prev,
        isModalOpen: true,
      }))
    } else {
      onOpen && onOpen()
    }
  }

  const handleGetLetterNum = (addr: string) => {
    if (addr) {
      return 50 - addr.length
    }
  }
  return (
    <>
      <div className="flex flex-col w-[full]  gap-1">
        <div className="flex w-[100%] ">
          <div className="flex justify-between w-[100%]">
            {biddingForm.bidders[stepNum]?.address === '' &&
            bidderIsDirty.bidderAddr ? (
              <div className="flex w-[100%] justify-start">
                <span className="md:text-[20px] text-[12px] font-semibold font-['suit'] not-italic text-left text-red-500">
                  주소를 입력해주세요
                </span>
              </div>
            ) : biddingForm.agent?.address === '' && isDirty?.agentAddr ? (
              <div className="flex w-[70%] justify-start">
                <span className="md:text-[20px] text-[12px] font-semibold font-['suit'] not-italic text-left text-red-500">
                  주소를 입력해주세요
                </span>
              </div>
            ) : (
              <div className="flex flex-row justify-start w-[100%]">
                <label
                  htmlFor="addr"
                  className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%]"
                >
                  주소
                </label>
                <span className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500">
                  *
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-[1%]">
          <input
            id={!isAgent ? 'bidderAddr' : undefined}
            name={isAgent ? 'agentAddr' : undefined}
            readOnly
            type="text"
            className="border border-gray-300 rounded-md md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic leading-[135%] tracking-[-2%] h-[40px] px-2 w-[95%] focus:outline-2 focus:outline-myBlue text-left"
            value={
              isAgent
                ? agent
                  ? agent.address
                  : biddingForm.agent.address
                : (biddingForm.bidders[stepNum]?.address ?? '')
            }
          />
          <button
            className="text-black bg-mySelect focus:outline-2 focus:outline-sutTitle rounded-md w-[25%] h-[40px]"
            style={{
              border: '1px solid black',
            }}
            onClick={() => {
              handleModal()
            }}
          >
            <span className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%]">
              주소검색
            </span>
          </button>
        </div>
        {/* 상세주소 */}
        <div className="flex flex-col w-[100%] bg-mybg gap-1">
          <input
            id={!isAgent ? 'bidAddrDetail' : undefined}
            name={isAgent ? 'agentAddrDetail' : undefined}
            type="text"
            maxLength={
              isAgent
                ? handleGetLetterNum(biddingForm.agent.address)
                : handleGetLetterNum(biddingForm.bidders[stepNum]?.address)
            }
            readOnly
            className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic leading-[135%] tracking-[-2%] text-left h-[40px] px-2 w-[100%]"
            value={
              isAgent
                ? agent
                  ? ''
                  : biddingForm.agent.addressDetail
                : (biddingForm.bidders[stepNum]?.addressDetail ?? '')
            }
          />
        </div>
      </div>
      {isOpen && portalElement
        ? createPortal(
            <ModalAddr
              isAgent={isAgent}
              isOpen={isOpen}
              onClose={onClose}
              stepNum={stepNum}
              setIsDirty={setIsDirty}
              setBidderIsDirty={setBidderIsDirty}
            />,
            portalElement,
          )
        : null}
    </>
  )
}
