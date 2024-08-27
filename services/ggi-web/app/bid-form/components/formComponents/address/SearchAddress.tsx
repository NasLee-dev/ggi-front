'use client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { createPortal } from 'react-dom'
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form'
import { BiddingInfoType } from 'app/bid-form/models/Bidder'
import { biddingInfoState } from '@/store/atom/bid-form'
import ModalAddr from './ModalAddr'
import { AgentProps } from 'app/bid-form/models/Agent'
import { useDisclosure } from '@chakra-ui/react'

type IsDirtyProps = {
  agentName: boolean
  agentRel: boolean
  agentPhone1: boolean
  agentPhone2: boolean
  agentPhone3: boolean
  agentIdNum1: boolean
  agentIdNum2: boolean
  agentAddr: boolean
  agentAddrDetail: boolean
  agentJob: boolean
}

interface SearchAddressProps {
  isAgent: boolean
  stepNum?: number
  register?: UseFormRegister<BiddingInfoType>
  errors?: FieldErrors<BiddingInfoType>
  setError?: UseFormSetError<BiddingInfoType>
  setValue?: UseFormSetValue<BiddingInfoType>
  isDirty?: IsDirtyProps
  setIsDirty?: Dispatch<SetStateAction<IsDirtyProps>>
  agent?: AgentProps | null
}

export default function SearchAddress({
  isAgent,
  stepNum,
  register,
  errors,
  isDirty,
  setIsDirty,
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
      // setBiddingForm((prev) => ({
      //   ...prev,
      //   isModalOpen: true,
      // }))
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
            {errors?.bidderAddr?.type === 'required' &&
            biddingForm.bidders[stepNum]?.address === '' ? (
              <div className="flex w-[100%] justify-start">
                <span className="md:text-[20px] text-[12px] font-semibold font-['suit'] not-italic text-left text-red-500">
                  주소를 입력해주세요
                </span>
              </div>
            ) : biddingForm.agent.address === '' && isDirty.agentAddr ? (
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
          {register && (
            <input
              {...register('bidderAddr', { required: true })}
              id="bidderAddr"
              readOnly
              type="text"
              className="border border-gray-300 rounded-md md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] h-[40px] px-2 w-[95%] focus:outline-2 focus:outline-myBlue"
              value={biddingForm.bidders[stepNum]?.address ?? ''}
            />
          )}
          {isAgent && (
            <input
              name="agentAddr"
              readOnly
              type="text"
              className="border border-gray-300 rounded-md md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic leading-[135%] tracking-[-2%] h-[40px] px-2 w-[95%] focus:outline-2 focus:outline-myBlue text-left"
              value={agent ? agent.address : biddingForm.agent.address}
            />
          )}
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
          {register && (
            <input
              id="bidAddrDetail"
              type="text"
              maxLength={handleGetLetterNum(
                biddingForm.bidders[stepNum]?.address,
              )}
              readOnly
              className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic leading-[135%] tracking-[-2%] text-left h-[40px] px-2 w-[100%]"
              value={biddingForm.bidders[stepNum]?.addressDetail ?? ''}
            />
          )}
          {isAgent && (
            <input
              name="agentAddrDetail"
              type="text"
              maxLength={handleGetLetterNum(biddingForm.agent.address)}
              readOnly
              className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic leading-[135%] tracking-[-2%] text-left h-[40px] px-2 w-[100%]"
              value={agent ? '' : biddingForm.agent.addressDetail}
            />
          )}
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
            />,
            portalElement,
          )
        : null}
    </>
  )
}
