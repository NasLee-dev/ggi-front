'use client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { createPortal } from 'react-dom'
import { FieldErrors, UseFormRegister, UseFormSetError } from 'react-hook-form'
import { BiddingInfoType } from 'app/bid-form/models/Bidder'
import { AgentInfoType } from 'app/bid-form/models/Agent'
import { biddingInfoState } from '@/store/atom/bid-form'
import ModalAddr from './ModalAddr'

interface SearchAddressProps {
  stepNum?: number
  register?: UseFormRegister<BiddingInfoType>
  errors?: FieldErrors<BiddingInfoType>
  setError?: UseFormSetError<BiddingInfoType>
  agentRegister?: UseFormRegister<AgentInfoType>
  agentErrors?: FieldErrors<AgentInfoType>
  agentSetError?: UseFormSetError<AgentInfoType>
  agentInfo?: AgentInfoType
  setAgentInfo?: Dispatch<SetStateAction<AgentInfoType>>
  isOpen?: boolean
  onClose?: () => void
  onOpen?: () => void
  setValue?: any
  agentSetValue?: any
}

export default function SearchAddress({
  stepNum,
  register,
  errors,
  agentRegister,
  agentErrors,
  agentSetError,
  agentInfo,
  setAgentInfo,
  setValue,
  isOpen,
  onClose,
  onOpen,
  agentSetValue,
}: SearchAddressProps) {
  const [portalElement, setPortalElement] = useState<Element | null>(null)
  const [biddingForm, setBiddingForm] = useRecoilState(biddingInfoState)

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
      setBiddingForm((prev) => ({
        ...prev,
        isModalOpen: true,
      }))
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
            ) : agentErrors?.agentAddr?.type === 'required' &&
              biddingForm.agent.address === '' ? (
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
          {agentRegister && (
            <input
              {...agentRegister('agentAddr', { required: true })}
              id="agentAddr"
              readOnly
              type="text"
              className="border border-gray-300 rounded-md md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic leading-[135%] tracking-[-2%] h-[40px] px-2 w-[95%] focus:outline-2 focus:outline-myBlue text-left"
              value={biddingForm.agent.address ?? ''}
            />
          )}
          <button
            className="text-black bg-mySelect focus:outline-2 focus:outline-sutTitle rounded-md w-[25%] h-[40px]"
            style={{
              border: '1px solid black',
            }}
            onClick={() => {
              handleModal && handleModal()
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
          {agentRegister && (
            <input
              id="agentAddrDetail"
              type="text"
              maxLength={handleGetLetterNum(biddingForm.agent.address)}
              readOnly
              className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic leading-[135%] tracking-[-2%] text-left h-[40px] px-2 w-[100%]"
              value={biddingForm.agent.addressDetail ?? ''}
            />
          )}
        </div>
      </div>
      {isOpen && portalElement
        ? createPortal(
            <ModalAddr
              isOpen={isOpen}
              onClose={onClose}
              stepNum={stepNum}
              agentInfo={agentInfo}
              setAgentInfo={setAgentInfo}
              agentSetError={agentSetError}
              setValue={setValue}
              agentSetValue={agentSetValue}
            />,
            portalElement,
          )
        : null}
    </>
  )
}
