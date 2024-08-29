import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface AddressProps {
  searchCondition: {
    keyword: string
    address: {
      sido: boolean
      sigungu: boolean
      eupmyeondong: boolean
    }
    usage: {
      main: {
        value: string
        label: string
      }
      compare1: {
        value: string
        label: string
      }
      compare2: {
        value: string
        label: string
      }
    }
  }
  setSearchCondition: Dispatch<
    SetStateAction<{
      keyword: string
      address: {
        sido: boolean
        sigungu: boolean
        eupmyeondong: boolean
      }
      usage: {
        main: {
          value: string
          label: string
        }
        compare1: {
          value: string
          label: string
        }
        compare2: {
          value: string
          label: string
        }
      }
    }>
  >
}

const AddressOption = ({
  label,
  isActive,
  onClick,
}: {
  label: string
  isActive: boolean
  onClick: () => void
}) => (
  <div
    className={`flex w-[33%] h-[34px] p-1 justify-center items-center flex-1 align-self-stretch rounded-full ${isActive ? 'bg-[#dbeafe] border border-[#1e40af]' : 'bg-[#F3F4F6]'} cursor-pointer`}
    style={{ gap: 'var(--Components-Badge-Gap-Between, 1px)' }}
    onClick={onClick}
  >
    <p
      className={`${isActive ? 'text-[#1E40AF]' : 'text-gray-500'} text-base font-normal font-['NanumGothic'] leading-snug`}
    >
      {label}
    </p>
  </div>
)

const AddressOptionSidoCombined = ({
  label,
  setSearchCondition,
  isCombined,
}: {
  label: string
  setSearchCondition: Dispatch<
    SetStateAction<{
      keyword: string
      address: {
        sido: boolean
        sigungu: boolean
        eupmyeondong: boolean
      }
      usage: {
        main: {
          value: string
          label: string
        }
        compare1: {
          value: string
          label: string
        }
        compare2: {
          value: string
          label: string
        }
      }
    }>
  >
  isCombined: {
    sidoCombined: boolean
    eupmyeondongCombined: boolean
  }
}) => (
  <div
    className={`flex p-[4px] flex-row gap-[200px] justify-center items-center self-stretch rounded-full border border-[#1e40af] bg-[#dbeafe] cursor-pointer ${isCombined.sidoCombined && !isCombined.eupmyeondongCombined ? 'w-[66%]' : !isCombined.sidoCombined && isCombined.eupmyeondongCombined ? 'w-[66%]' : isCombined.sidoCombined && isCombined.eupmyeondongCombined ? 'w-[99%]' : ''} h-[34px]`}
  >
    <p
      className={`text-[#1E40AF] text-base font-normal font-['NanumGothic'] leading-snug`}
      onClick={() => {
        if (label.split(' ')[0] === '시도') {
          setSearchCondition((prev) => ({
            ...prev,
            address: {
              ...prev.address,
              sido: !prev.address.sido,
            },
          }))
        } else {
          setSearchCondition((prev) => ({
            ...prev,
            address: {
              ...prev.address,
              sigungu: !prev.address.sigungu,
            },
          }))
        }
      }}
    >
      {label.split(' ')[0]}
    </p>
    <p
      className={`text-[#1E40AF] text-base font-normal font-['NanumGothic'] leading-snug`}
      onClick={() => {
        if (label.split(' ')[1] === '시군구') {
          setSearchCondition((prev) => ({
            ...prev,
            address: {
              ...prev.address,
              sigungu: !prev.address.sigungu,
            },
          }))
        } else {
          setSearchCondition((prev) => ({
            ...prev,
            address: {
              ...prev.address,
              eupmyeondong: !prev.address.eupmyeondong,
            },
          }))
        }
      }}
    >
      {label.split(' ')[1]}
    </p>
    {isCombined.sidoCombined && isCombined.eupmyeondongCombined && (
      <p
        className={`text-[#1E40AF] text-base font-normal font-['NanumGothic'] leading-snug`}
        onClick={() => {
          setSearchCondition((prev) => ({
            ...prev,
            address: {
              ...prev.address,
              eupmyeondong: !prev.address.eupmyeondong,
            },
          }))
        }}
      >
        {label.split(' ')[2]}
      </p>
    )}
  </div>
)

export default function Address({
  searchCondition,
  setSearchCondition,
}: AddressProps) {
  const [isCombined, setIsCombined] = useState({
    sidoCombined: false,
    eupmyeondongCombined: false,
  })

  useEffect(() => {
    if (
      searchCondition.address.sido &&
      searchCondition.address.sigungu &&
      !searchCondition.address.eupmyeondong
    ) {
      setIsCombined(() => ({
        sidoCombined: true,
        eupmyeondongCombined: false,
      }))
    } else if (
      !searchCondition.address.sido &&
      searchCondition.address.sigungu &&
      searchCondition.address.eupmyeondong
    ) {
      setIsCombined(() => ({
        sidoCombined: false,
        eupmyeondongCombined: true,
      }))
    } else if (
      searchCondition.address.sido &&
      searchCondition.address.sigungu &&
      searchCondition.address.eupmyeondong
    ) {
      setIsCombined(() => ({
        sidoCombined: true,
        eupmyeondongCombined: true,
      }))
    } else {
      setIsCombined(() => ({
        sidoCombined: false,
        eupmyeondongCombined: false,
      }))
    }
  }, [searchCondition])

  return (
    <div className="flex flex-col w-[50%] gap-[12px]">
      <div className="flex justify-between w-full">
        <p className="text-gray-800 text-base font-bold font-['NanumGothic'] leading-snug">
          기준범위
        </p>
        <p className="text-right text-gray-500 text-base font-normal font-['NanumGothic'] leading-snug">
          통계를 조회할 기준범위를 선택하세요
        </p>
      </div>
      <div className="flex flex-row gap-[8px] p-2 px-4 justify-between items-start content-start gap-y-4 self-stretch flex-wrap rounded-[16px] bg-[#F8FAFC] w-full">
        {isCombined.sidoCombined && !isCombined.eupmyeondongCombined ? (
          <>
            <AddressOptionSidoCombined
              label="시도 시군구"
              setSearchCondition={setSearchCondition}
              isCombined={isCombined}
            />
            <AddressOption
              label="읍면동"
              isActive={searchCondition.address.eupmyeondong}
              onClick={() =>
                setSearchCondition((prev) => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    eupmyeondong: !prev.address.eupmyeondong,
                  },
                }))
              }
            />
          </>
        ) : isCombined.sidoCombined && isCombined.eupmyeondongCombined ? (
          <AddressOptionSidoCombined
            label="시도 시군구 읍면동"
            setSearchCondition={setSearchCondition}
            isCombined={isCombined}
          />
        ) : !isCombined.sidoCombined && isCombined.eupmyeondongCombined ? (
          <>
            <AddressOption
              label="시도"
              isActive={searchCondition.address.sido}
              onClick={() =>
                setSearchCondition((prev) => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    sido: !prev.address.sido,
                  },
                }))
              }
            />
            <AddressOptionSidoCombined
              label="시군구 읍면동"
              setSearchCondition={setSearchCondition}
              isCombined={isCombined}
            />
          </>
        ) : (
          <>
            <AddressOption
              label="시도"
              isActive={searchCondition.address.sido}
              onClick={() =>
                setSearchCondition((prev) => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    sido: !prev.address.sido,
                  },
                }))
              }
            />
            <AddressOption
              label="시군구"
              isActive={searchCondition.address.sigungu}
              onClick={() =>
                setSearchCondition((prev) => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    sigungu: !prev.address.sigungu,
                  },
                }))
              }
            />
            <AddressOption
              label="읍면동"
              isActive={searchCondition.address.eupmyeondong}
              onClick={() =>
                setSearchCondition((prev) => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    eupmyeondong: !prev.address.eupmyeondong,
                  },
                }))
              }
            />
          </>
        )}
      </div>
    </div>
  )
}
