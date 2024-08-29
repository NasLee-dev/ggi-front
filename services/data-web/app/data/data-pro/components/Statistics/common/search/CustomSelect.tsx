import { Usage } from '@/app/data/data-pro/constants/Usage'
import { OptionValue } from '@/app/data/data-pro/models/Common'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

interface Option {
  options: OptionValue[]
  label: string
  compare: {
    main: OptionValue
    compare1: OptionValue
    compare2: OptionValue
  }
  setCompare: Dispatch<
    SetStateAction<{
      main: OptionValue
      compare1: OptionValue
      compare2: OptionValue
    }>
  >
}

export default function CustomSelect({
  options,
  label,
  compare,
  setCompare,
}: Option) {
  const [selectedOption, setSelectedOption] = useState<OptionValue | string>(
    Usage[0],
  )
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const handleOptionControl = useCallback(() => {
    if (label === '비교1' && compare.main.label === '선택안함') {
      alert('대표 용도를 먼저 선택해주세요')
      return
    } else if (label === '비교2' && compare.main.label === '선택안함') {
      alert('대표 용도를 먼저 선택해주세요')
      return
    } else if (label === '비교2' && compare.compare1.label === '선택안함') {
      alert('비교1 용도를 먼저 선택해주세요')
      return
    } else {
      setIsOpen((prev) => !prev)
    }
  }, [compare, label])

  const handleOptionClick = useCallback(
    (option: OptionValue) => {
      if (label === '대표') {
        if (option.value !== compare.main.value) {
          setCompare((prev) => ({
            ...prev,
            main: option,
            compare1: Usage[0],
            compare2: Usage[0],
          }))
        }
        setSelectedOption(option)
      } else if (label === '비교1') {
        if (option.value !== compare.compare1.value) {
          setCompare((prev) => ({
            ...prev,
            compare1: option,
            compare2: Usage[0],
          }))
        }
        setSelectedOption(option)
      } else {
        if (option.value !== compare.compare2.value) {
          setCompare((prev) => ({
            ...prev,
            compare2: option,
          }))
        }
        setSelectedOption(option)
      }
      setIsOpen(false)
    },
    [compare, label, setCompare],
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleFilteredOptions = useCallback(() => {
    if (label === '대표') {
      return Usage.filter((options) => options.label !== '선택안함')
    } else if (label === '비교1') {
      if (compare.main.label !== '') {
        return Usage.filter((option) => option.label !== compare.main.label)
      } else {
        return Usage
      }
    } else if (label === '비교2') {
      if (compare.main.label !== '' && compare.compare1.label !== '') {
        return Usage.filter(
          (option) =>
            option.label !== compare.main.label &&
            option.label !== compare.compare1.label,
        )
      } else {
        return Usage
      }
    } else {
      return Usage
    }
  }, [compare, label])

  return (
    <div
      ref={selectRef}
      className="relative inline-block text-left flex-1 rounded-full h-full border border-[#e5e7eb] pr-[16px] pl-[16px] pt-[7px] pb-[7px]"
    >
      <div className="flex flex-row w-full gap-[10px] justify-center items-center">
        <p className="text-left text-gray-300 text-base font-bold font-['NanumGothic'] leading-snug w-[25%]">
          {label}
        </p>

        <select
          value={
            label === '대표'
              ? compare.main.value
              : label === '비교1'
                ? compare.compare1.value
                : compare.compare2.value
          }
          className="hidden"
          onChange={(e) => {
            const option = Usage.find(
              (option) => option.value === e.target.value,
            )
            setSelectedOption(option || '')
          }}
        >
          {handleFilteredOptions()?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div
          className="block appearance-none w-full p-1 rounded-full h-full bg-white focus:outline-none cursor-pointer"
          onClick={() => {
            handleOptionControl()
          }}
        >
          <p className="text-left text-gray-800 text-base font-normal font-['NanumGothic'] leading-snug">
            {label === '대표'
              ? compare.main.label
              : label === '비교1'
                ? compare.compare1.label
                : compare.compare2.label}
          </p>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
          >
            <path
              d="M5.33398 10L8.66732 13.3333L12.0007 10"
              stroke="#6B7280"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.33398 5.99996L8.66732 2.66663L12.0007 5.99996"
              stroke="#6B7280"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {isOpen && (
        <div
          id="selectBox"
          className="absolute z-10 top-[50px] left-0 w-full h-[160px] bg-white rounded-md shadow-lg overflow-y-auto custom-scrollbar"
        >
          {handleFilteredOptions()?.map((option) => (
            <div
              key={option.value}
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
              onClick={() => {
                handleOptionClick(option)
              }}
            >
              <span className="block truncate">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
