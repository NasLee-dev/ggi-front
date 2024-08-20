import { AgentInfoType } from '@/models/bid-form/Agent'
import { biddingInfoState, stepState } from '@/store/atom/bid-form'
import { useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { SubmitHandler, useForm } from 'react-hook-form'
import usePostAgent from './hooks/usePostAgent'
import AgentFormProps from '../form/AgentForm'

export default function AgentForm() {
  const [biddingForm, setBiddingForm] = useRecoilState(biddingInfoState)
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const postAgent = usePostAgent(biddingForm.mstSeq.toString(), {
    name: biddingForm.agent.name,
    relationship: biddingForm.agent.relationship,
    phoneNo: biddingForm.agent.phoneNo,
    address: biddingForm.agent.address,
    job: biddingForm.agent.job ?? '',
  })
  const [agentInfo, setAgentInfo] = useState<AgentInfoType>({
    agentName: '',
    agentRel: '',
    agentPhone1: '',
    agentPhone2: '',
    agentPhone3: '',
    agentIdNum1: '',
    agentIdNum2: '',
    agentAddr: '',
    agentAddrDetail: '',
    agentJob: '',
  })

  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    setError,
    formState: { errors },
  } = useForm<AgentInfoType>({
    defaultValues: {
      ...agentInfo,
    },
    mode: 'onChange',
  })

  if (typeof window === 'undefined') return null
  window.document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  })

  const handleAgentSave = async () => {
    try {
      const response = await postAgent.mutateAsync()
      if (response) {
        setStateNum(stateNum + 1)
      } else {
        alert('입력정보를 다시 확인해주세요.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit: SubmitHandler<any> = async () => {
    if (!isOpen) {
      try {
        await handleAgentSave()
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (
      name === 'agentName' ||
      name === 'agentRel' ||
      name === 'agentPhone1' ||
      name === 'agentPhone2' ||
      name === 'agentPhone3' ||
      name === 'agentIdNum1' ||
      name === 'agentIdNum2' ||
      name === 'agentAddr' ||
      name === 'agentAddrDetail' ||
      name === 'agentJob'
    ) {
      setValue(name, value, { shouldValidate: true })
    }
  }

  const handlePrevBtn = () => {
    setStateNum(stateNum - 1)
    setBiddingForm((prev) => ({
      ...prev,
      searchResultState: 2,
    }))
  }

  return (
    <div className="flex w-screen bg-mybg justify-center relative">
      <div className="flex flex-col gap-4 w-[100%] h-[100%] bg-mybg items-center text-center relative">
        <div className="flex flex-col md:gap-[14px] gap-[5px] justify-center items-center pt-[50px]">
          <span className="md:text-[32.5px] text-[20px] leading-[135%] tracking-[-1%] font-bold font-['suit'] not-italic">
            대리인 정보를 입력해주세요
          </span>
          <div className="md:hidden flex w-[100%]">
            <span className="md:text-[18px] text-[16px] leading-[135%] tracking-[-1%] font-normal font-['suit'] not-italic text-sutTitle">
              법인의 대리인인 경우 입찰자와의 관계에
              <br />
              '직원'등으로 적습니다
            </span>
          </div>
          <div className="hidden md:flex w-[100%]">
            <span className="md:text-[18px] text-[16px] leading-[135%] tracking-[-1%] font-normal font-['suit'] not-italic text-sutTitle">
              법인의 대리인인 경우 입찰자와의 관계에 '직원'등으로 적습니다
            </span>
          </div>
        </div>
        {/* 입력정보 */}
        <AgentFormProps
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          errors={errors}
          register={register}
          setValue={setValue}
          setFocus={setFocus}
          setError={setError}
          handleInputChange={handleInputChange}
          agentInfo={agentInfo}
          setAgentInfo={setAgentInfo}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          handlePrevBtn={handlePrevBtn}
        />
      </div>
    </div>
  )
}
