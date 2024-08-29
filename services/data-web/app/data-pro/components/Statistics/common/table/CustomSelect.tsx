import { useRef, useState } from 'react'

export default function CustomSelect() {
  const selectRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const optionLabel = [
    {
      label: '최근 3개월',
      value: '3',
    },
    {
      label: '최근 6개월',
      value: '6',
    },
    {
      label: '최근 12개월',
      value: '12',
    },
  ]
  const [options, setOptions] = useState(optionLabel[2].label)

  return (
    <div
      ref={selectRef}
      className="relative inline-block text-left flex-1 rounded-full h-full border border-[#e5e7eb] bg-[#f8fafc] p-[14px]"
    >
      <div className="flex flex-row w-full gap-[5px] justify-center items-center">
        <p className="text-center text-gray-300 text-base font-bold font-['NanumGothic'] leading-snug w-[30%]">
          기간
        </p>

        <select
          value={options}
          className="hidden"
          onChange={(e) => {
            setOptions(e.target.value)
          }}
        >
          {optionLabel.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div
          className="block appearance-none w-full p-1 rounded-full h-full  focus:outline-none cursor-pointer"
          onClick={() => {}}
        >
          <p className="text-left text-gray-800 text-base font-normal font-['NanumGothic'] leading-snug">
            {options}
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
        <div className="absolute z-10 top-[50px] left-0 w-full h-[160px] bg-white rounded-md shadow-lg overflow-y-auto custom-scrollbar">
          {optionLabel.map((option, index) => (
            <div
              key={index}
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
              onClick={() => {
                setOptions(option.value)
                setIsOpen(false)
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