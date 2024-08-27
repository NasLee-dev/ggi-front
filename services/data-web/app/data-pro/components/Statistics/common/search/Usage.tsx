import SelectOptions from './SelectOptions'

export default function UsageComponent() {
  return (
    <div className="flex flex-col h-[100px] w-[50%] gap-[12px]">
      <div className="flex justify-start w-full">
        <p className="text-gray-800 text-base font-bold font-['NanumGothic'] leading-snug">
          용도
        </p>
      </div>
      <div className="flex flex-row h-[50px] gap-[8px] w-full">
        <div className="relative inline-block text-left flex-1 rounded-full h-full border border-[#e5e7eb] pr-[16px] pl-[16px] pt-[7px] pb-[7px]">
          <div className="flex flex-row w-full gap-[10px] justify-center items-center">
            <p className="text-center text-gray-300 text-base font-bold font-['NanumGothic'] leading-snug w-[20%]">
              대표
            </p>
            <select className="peer block appearance-none w-full p-1 rounded-full h-full bg-white focus:outline-none">
              <SelectOptions />
            </select>
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
        </div>
        <div className="relative inline-block text-left flex-1 rounded-full h-full border border-[#e5e7eb] pr-[16px] pl-[16px] pt-[7px] pb-[7px] ">
          <div className="flex flex-row w-full gap-[10px] justify-center items-center">
            <p className="text-center text-gray-300 text-base font-bold font-['NanumGothic'] leading-snug w-[25%]">
              비교1
            </p>
            <select className="peer block appearance-none w-full p-1 rounded-full bg-white h-full focus:outline-none text-left">
              <option
                value=""
                className="text-center text-gray-800 text-base font-normal font-['NanumGothic'] leading-snug"
              >
                Option 1
              </option>
              <option
                value=""
                className="text-center text-gray-800 text-base font-normal font-['NanumGothic'] leading-snug"
              >
                Option 2
              </option>
              <option
                value=""
                className="text-center text-gray-800 text-base font-normal font-['NanumGothic'] leading-snug"
              >
                Option 3
              </option>
            </select>
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
        </div>
        <div className="relative inline-block text-left flex-1 border rounded-full h-full border-[#e5e7eb] pr-[16px] pl-[16px] pt-[7px] pb-[7px]">
          <div className="flex flex-row w-full gap-[10px] justify-center items-center">
            <p className="text-center text-gray-300 text-base font-bold font-['NanumGothic'] leading-snug w-[25%]">
              비교2
            </p>
            <select className="peer block appearance-none w-full p-1 rounded-full bg-white h-full focus:outline-none">
              <option
                value=""
                className="text-center text-gray-800 text-base font-normal font-['NanumGothic'] leading-snug"
              >
                Option 1
              </option>
              <option
                value=""
                className="text-center text-gray-800 text-base font-normal font-['NanumGothic'] leading-snug"
              >
                Option 2
              </option>
              <option
                value=""
                className="text-center text-gray-800 text-base font-normal font-['NanumGothic'] leading-snug"
              >
                Option 3
              </option>
            </select>
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
        </div>
      </div>
    </div>
  )
}
