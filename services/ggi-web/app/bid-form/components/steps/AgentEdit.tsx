import { biddingInfoState, stepState } from '@/store/atom/bid-form'
import { useDisclosure } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import AgentForm from '../formComponents/AgentForm'
import usePutAgent from './hooks/usePutAgent'

export default function AgentEdit() {
  const [biddingForm, setBiddingForm] = useRecoilState(biddingInfoState)
  const [stateNum, setStateNum] = useRecoilState(stepState)

  const putAgent = usePutAgent({
    mstSeq: biddingForm.mstSeq.toString(),
    name: biddingForm.agent.name,
    relationship: biddingForm.agent.relationship,
    phoneNo: biddingForm.agent.phoneNo,
    address: biddingForm.agent.address,
    job: biddingForm.agent.job ?? '',
  })

  if (typeof window === 'undefined') return null
  window.document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  })

  const handleUpdateAgent = async () => {
    try {
      const response = await putAgent.mutateAsync()
      if (response) {
        stateNum === 17 ? setStateNum(6) : setStateNum(stateNum + 1)
      } else {
        alert('입력정보를 다시 확인해주세요.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = async () => {
    if (!biddingForm.isModalOpen) {
      try {
        await handleUpdateAgent()
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handlePrevBtn = () => {
    stateNum === 17 ? setStateNum(4) : setStateNum(stateNum - 1)
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
        <AgentForm
          onSubmit={onSubmit}
          handlePrevBtn={handlePrevBtn}
        />
      </div>
    </div>
  )
}
