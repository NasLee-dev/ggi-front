import { biddingInfoState } from '@/store/atom/bid-form'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { LiaEyeSlashSolid, LiaEyeSolid } from 'react-icons/lia'
import SearchAddress from './address/SearchAddress'
import useGetAgent from '../steps/hooks/useGetAgent'

interface Props {
  onSubmit: () => void
  handlePrevBtn: () => void
}

export default function AgentForm({
  onSubmit,
  handlePrevBtn,
}: Props) {
  const [passwordActive, setPasswordActive] = useState(false)
  const [biddingForm, setBiddingForm] = useRecoilState(biddingInfoState)
  const { data: agent } = useGetAgent({ mstSeq: biddingForm.mstSeq.toString() })
  const [isDirty, setIsDirty] = useState({
    agentName: false,
    agentRel: false,
    agentPhone1: false,
    agentPhone2: false,
    agentPhone3: false,
    agentIdNum1: false,
    agentIdNum2: false,
    agentAddr: false,
    agentAddrDetail: false,
    agentJob: false,
  })

  const handleFocusChange = (length: number, nextField: string) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length === length) {
        document.getElementsByName(nextField)[0].focus()
      }
    }
  }

  const handleAgentForm = useCallback(() => {
    if (typeof agent === 'undefined') return
    if (!agent) {
      setBiddingForm((prev) => ({
        ...prev,
        agent: {
          address: prev.agent.address,
          job: prev.agent.job || '',
          name: prev.agent.name,
          phoneNo: prev.agent.phoneNo,
          relationship: prev.agent.relationship,
          addressDetail: prev.agent.addressDetail,
          agentIdNum1: prev.agent.agentIdNum1 || '',
          agentIdNum2: prev.agent.agentIdNum2 || '',
          phoneNo1: prev.agent.phoneNo1,
          phoneNo2: prev.agent.phoneNo2,
          phoneNo3: prev.agent.phoneNo3,
        },
      }))
    } else {
      setBiddingForm((prev) => ({
        ...prev,
        agent: {
          address: agent.address,
          job: agent.job || '',
          name: agent.name,
          phoneNo: agent.phoneNo,
          relationship: agent.relationship,
          addressDetail: '',
          agentIdNum1: prev.agent.agentIdNum1 || '',
          agentIdNum2: prev.agent.agentIdNum2 || '',
          phoneNo1: agent.phoneNo.substring(0, 3) || prev.agent.phoneNo1,
          phoneNo2: agent.phoneNo.substring(3, 7) || prev.agent.phoneNo2,
          phoneNo3: agent.phoneNo.substring(7, 11) || prev.agent.phoneNo3,
        },
      }))
    }
  }, [agent])
  useEffect(() => {
    handleAgentForm()
  }, [agent])
  return (
    <div className="flex flex-col md:w-[550px] w-[80%] h-[100%] justify-center items-center">
      <div className="flex flex-col w-[100%] h-[100%] gap-2">
        {/* 이름 & 관계 */}
        <div className="flex md:flex-row flex-col w-[100%] md:gap-[0.5%] gap-2">
          {/* 이름 */}
          <div className="flex flex-col w-[100%] gap-1">
            <div className="flex justify-between w-[100%]">
              {biddingForm.agent.name === '' && isDirty.agentName ? (
                <div className="flex w-[100%] justify-start">
                  <label
                    htmlFor="bidderName"
                    className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500"
                  >
                    성명을 입력해주세요
                  </label>
                </div>
              ) : biddingForm.agent.name.length < 2 && isDirty.agentName ? (
                <div className="flex w-[100%] justify-start">
                  <label
                    htmlFor="bidderName"
                    className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500"
                  >
                    이름은 2글자 이상 입력해주세요
                  </label>
                </div>
              ) : (
                <div className="flex flex-row">
                  <span className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%]">
                    성명
                  </span>
                  <span className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500">
                    *
                  </span>
                </div>
              )}
            </div>
            <input
              name="agentName"
              maxLength={10}
              value={biddingForm.agent.name ?? ''}
              type="text"
              className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic leading-[150%] tracking-[-1%] text-left h-[40px] px-2"
              placeholder="성명을 입력해주세요"
              onChange={(e) => {
                setIsDirty((prev) => ({
                  ...prev,
                  agentName: true,
                }))
                setBiddingForm((prev) => ({
                  ...prev,
                  agent: {
                    ...prev.agent,
                    name: e.target.value,
                  },
                }))
                if (biddingForm.agent.name.length > 10) {
                  setBiddingForm((prev) => ({
                    ...prev,
                    agent: {
                      ...prev.agent,
                      name: prev.agent.name.slice(0, 10),
                    },
                  }))
                }
              }}
            />
          </div>
          {/* 관계 */}
          <div className="flex flex-col w-[100%] gap-1">
            <div className="flex flex-row w-[100%]">
              {biddingForm.agent.relationship === '' && isDirty.agentRel ? (
                <div className="flex w-[100%] justify-start">
                  <label
                    htmlFor="agentRel"
                    className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500"
                  >
                    관계를 입력해주세요
                  </label>
                </div>
              ) : biddingForm.agent.relationship.length > 10 ? (
                <div className="flex w-[100%] justify-start">
                  <label
                    htmlFor="agentRel"
                    className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500"
                  >
                    10글자 이내로 입력해주세요
                  </label>
                </div>
              ) : (
                <div className="flex w-[100%] justify-start">
                  <label
                    htmlFor="agentRel"
                    className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%]"
                  >
                    입찰자와의 관계
                  </label>
                  <span className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500">
                    *
                  </span>
                </div>
              )}
            </div>
            <input
              value={biddingForm.agent.relationship ?? ''}
              name="agentRel"
              maxLength={10}
              type="text"
              className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic leading-[150%] tracking-[-1%] text-left h-[40px] px-2"
              placeholder="관계를 입력해주세요"
              onChange={(e) => {
                setIsDirty((prev) => ({
                  ...prev,
                  agentRel: true,
                }))
                setBiddingForm((prev) => ({
                  ...prev,
                  agent: {
                    ...prev.agent,
                    relationship: e.target.value,
                  },
                }))
                if (biddingForm.agent.relationship.length > 10) {
                  setBiddingForm((prev) => ({
                    ...prev,
                    agent: {
                      ...prev.agent,
                      relationship: prev.agent.relationship.slice(0, 10),
                    },
                  }))
                }
              }}
            />
          </div>
        </div>
        {/* 전화번호 */}
        <div className="flex flex-col w-[100%] gap-1">
          <div className="flex justify-between w-[100%]">
            {biddingForm.agent.phoneNo === '' &&
            isDirty.agentPhone1 &&
            isDirty.agentPhone2 &&
            isDirty.agentPhone3 ? (
              <div className="flex w-[100%] justify-start">
                <label
                  htmlFor="agentPhone"
                  className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500"
                >
                  전화번호를 입력해주세요
                </label>
              </div>
            ) : (
              <div className="flex w-[100%] justify-start">
                <label
                  htmlFor="agentPhone"
                  className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%]"
                >
                  전화번호
                </label>
                <span className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500">
                  *
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-row gap-[0.5%]">
            <input
              name="agentPhone1"
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*)\./g, '$1')
              }}
              type="text"
              maxLength={3}
              placeholder="010"
              className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic leading-[150%] tracking-[-1%] h-[40px] px-2 w-[33%] text-center"
              value={biddingForm.agent.phoneNo1 ?? ''}
              inputMode="numeric"
              onChange={(e) => {
                setBiddingForm((prev) => ({
                  ...prev,
                  agent: {
                    ...prev.agent,
                    phoneNo:
                      e.target.value +
                      prev.agent.phoneNo2 +
                      prev.agent.phoneNo3,
                    phoneNo1: e.target.value,
                  },
                }))
                setIsDirty((prev) => ({
                  ...prev,
                  agentPhone1: true,
                }))
                handleFocusChange(3, 'agentPhone2')(e)
              }}
            />
            <input
              type="text"
              name="agentPhone2"
              inputMode="numeric"
              maxLength={4}
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*)\./g, '$1')
              }}
              placeholder="1234"
              className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic leading-[150%] tracking-[-1%] h-[40px] px-2 w-[33%] text-center"
              value={biddingForm.agent.phoneNo2 ?? ''}
              onChange={(e) => {
                setIsDirty((prev) => ({
                  ...prev,
                  agentPhone2: true,
                }))
                setBiddingForm((prev) => ({
                  ...prev,
                  agent: {
                    ...prev.agent,
                    phoneNo:
                      prev.agent.phoneNo1 +
                      e.target.value +
                      prev.agent.phoneNo3,
                    phoneNo2: e.target.value,
                  },
                }))
                handleFocusChange(4, 'agentPhone3')(e)
              }}
            />
            <input
              type="text"
              name="agentPhone3"
              inputMode="numeric"
              maxLength={4}
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*)\./g, '$1')
              }}
              placeholder="5678"
              className=" border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic leading-[150%] tracking-[-1%] h-[40px] px-2 w-[33%] text-center"
              value={biddingForm.agent.phoneNo3 ?? ''}
              onChange={(e) => {
                setIsDirty((prev) => ({
                  ...prev,
                  agentPhone3: true,
                }))
                setBiddingForm((prev) => ({
                  ...prev,
                  agent: {
                    ...prev.agent,
                    phoneNo:
                      prev.agent.phoneNo1 +
                      prev.agent.phoneNo2 +
                      e.target.value,
                    phoneNo3: e.target.value,
                  },
                }))
                handleFocusChange(4, 'agentPhone3')(e)
              }}
            />
          </div>
        </div>
        {/* 주민등록번호 */}
        <div className="flex flex-col w-[100%] gap-1">
          <div className="flex justify-between w-[100%]">
            {biddingForm.agent.agentIdNum1 + biddingForm.agent.agentIdNum2 ===
              '' &&
            isDirty.agentIdNum1 &&
            isDirty.agentIdNum2 ? (
              <div className="flex w-[100%] justify-start mb-[5px]">
                <span className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500">
                  주민등록번호를 입력해주세요
                </span>
              </div>
            ) : (
              <div className="flex flex-row justify-between w-[100%]">
                <div className="flex flex-row justify-start">
                  <label
                    htmlFor="bidIdNum"
                    className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%]"
                  >
                    주민등록번호
                  </label>
                </div>
                <div>
                  <span className="hidden md:flex md:text-[15px] text-[0.8rem] font-normal font-['suit'] tracking-[-3%] not-italic text-left text-red-500">
                    주민등록번호는 별도로 저장되지 않습니다
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-row gap-[5%] relative">
            <input
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*)\./g, '$1')
              }}
              type="text"
              name="agentIdNum1"
              autoComplete="off"
              maxLength={6}
              inputMode="numeric"
              className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[150%] tracking-[-1%] font-['suit'] not-italic h-[40px] px-2 w-[45%] text-center"
              value={biddingForm.agent.agentIdNum1 ?? ''}
              onChange={(e) => {
                setIsDirty((prev) => ({
                  ...prev,
                  agentIdNum1: true,
                }))
                setBiddingForm((prev) => ({
                  ...prev,
                  agent: {
                    ...prev.agent,
                    agentIdNum1: e.target.value,
                  },
                }))
                if (biddingForm.agent.agentIdNum1.length > 6) {
                  setBiddingForm((prev) => ({
                    ...prev,
                    agent: {
                      ...prev.agent,
                      agentIdNum1: prev.agent.agentIdNum1.slice(0, 6),
                    },
                  }))
                }
                handleFocusChange(6, 'agentIdNum2')(e)
              }}
            />
            <span className="flex text-mygray font-['suit'] font-bold mt-1">
              -
            </span>
            <input
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*)\./g, '$1')
              }}
              type={`${!passwordActive ? 'password' : 'text'}`}
              name="agentIdNum2"
              autoComplete="off"
              inputMode="numeric"
              maxLength={7}
              className="flex justify-center items-center border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[150%] tracking-[-1%] font-['suit'] not-italic h-[40px] px-2 w-[45%] text-center"
              value={biddingForm.agent.agentIdNum2 ?? ''}
              onChange={(e) => {
                setIsDirty((prev) => ({
                  ...prev,
                  agentIdNum2: true,
                }))
                setBiddingForm((prev) => ({
                  ...prev,
                  agent: {
                    ...prev.agent,
                    agentIdNum2: e.target.value,
                  },
                }))
                if (biddingForm.agent.agentIdNum2.length > 7) {
                  setBiddingForm((prev) => ({
                    ...prev,
                    agent: {
                      ...prev.agent,
                      agentIdNum2: prev.agent.agentIdNum2.slice(0, 7),
                    },
                  }))
                }
                handleFocusChange(7, 'agentIdNum2')(e)
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
        <div className={`flex flex-col w-[100%] h-[250px] gap-1 relative `}>
          <div className="flex flex-col w-[100%] gap-1">
            <div className="flex justify-between w-[100%]">
              <div className="flex w-[100%] justify-start">
                <label
                  htmlFor="agentJob"
                  className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%]"
                >
                  직업
                </label>
              </div>
            </div>
            <input
              name="agentJob"
              value={biddingForm.agent.job ?? ''}
              maxLength={10}
              type="text"
              className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold font-['suit'] leading-[150%] tracking-[-1%] not-italic text-left h-[40px] px-2"
              placeholder="직업을 입력해주세요(예: 회사원, 농부)"
              onChange={(e) => {
                setIsDirty((prev) => ({
                  ...prev,
                  agentJob: true,
                }))
                setBiddingForm((prev) => ({
                  ...prev,
                  agent: {
                    ...prev.agent,
                    job: e.target.value,
                  },
                }))
                if (biddingForm.agent.job.length > 10) {
                  setBiddingForm((prev) => ({
                    ...prev,
                    agent: {
                      ...prev.agent,
                      job: prev.agent.job.slice(0, 10),
                    },
                  }))
                }
              }}
            />
          </div>
          <SearchAddress
            isAgent={true}
            isDirty={isDirty}
            setIsDirty={setIsDirty}
            agent={agent}
          />
        </div>
      </div>
      <div className="flex flex-row gap-[10px] fixed md:bottom-[80px] bottom-[10px] md:w-[550px] w-[90%]">
        <button
          type="button"
          className="flex w-[35%] h-[50px] bg-prevBtn rounded-full justify-center items-center cursor-pointer"
          onClick={() => {
            handlePrevBtn()
          }}
        >
          <span className="text-sutTitle font-bold font-['suit'] md:text-[1.2rem] text-[1rem]">
            이전으로
          </span>
        </button>
        <button
          type="button"
          className={`flex w-[60%] md:w-[65%] h-[50px] bg-myBlue rounded-full justify-center items-center cursor-pointer`}
          onClick={() => {
            onSubmit()
          }}
        >
          <span className="text-white font-bold font-['suit'] md:text-[1.2rem] text-[1rem]">
            다음으로
          </span>
        </button>
      </div>
    </div>
  )
}
