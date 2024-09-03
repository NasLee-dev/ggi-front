interface TableBodyProps {
  data: any[]
  activeTab: string
}

export default function TableBody({ data, activeTab }: TableBodyProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-full">
        <div
          className={`flex flex-row w-[204.7px] h-[46px] ${data.length === 0 ? '' : 'border-b border-gray-200'}`}
        >
          <div className="flex w-full h-full pl-[70px] pr-[70px] pt-[12px] pb-[12px] justify-center items-center">
            <p className="text-gray-800 text-base font-normal font-['NanumGothic'] leading-snug">
              대표용도
            </p>
          </div>
        </div>
        <div
          className={`flex flex-row w-[204.7px] h-[46px] ${data.length === 0 ? '' : 'border-b border-gray-200'}`}
        >
          <div className="flex w-full h-full pl-[70px] pr-[70px] pt-[12px] pb-[12px] justify-center items-center">
            <p className="text-gray-800 text-base font-normal font-['NanumGothic'] leading-snug"></p>
          </div>
        </div>
        <div
          className={`flex flex-row w-[204.7px] h-[46px] ${data.length === 0 ? '' : 'border-b border-gray-200'}`}
        >
          <div className="flex w-full h-full pl-[70px] pr-[70px] pt-[12px] pb-[12px] justify-center items-center">
            <p className="text-gray-800 text-base font-normal font-['NanumGothic'] leading-snug"></p>
          </div>
        </div>
        <div
          className={`flex flex-row w-[204.7px] h-[46px] ${data.length === 0 ? '' : 'border-b border-gray-200'}`}
        >
          <div className="flex w-full h-full pl-[70px] pr-[70px] pt-[12px] pb-[12px] justify-center items-center">
            <p className="text-gray-800 text-base font-normal font-['NanumGothic'] leading-snug"></p>
          </div>
        </div>
        <div
          className={`flex flex-row w-[204.7px] h-[46px] ${data.length === 0 ? '' : 'border-b border-gray-200'}`}
        >
          <div className="flex w-full h-full pl-[70px] pr-[70px] pt-[12px] pb-[12px] justify-center items-center">
            <p className="text-gray-800 text-base font-normal font-['NanumGothic'] leading-snug"></p>
          </div>
        </div>
        <div
          className={`flex flex-row w-[204.7px] h-[46px] ${data.length === 0 ? '' : 'border-b border-gray-200'}`}
        >
          <div className="flex w-full h-full pl-[70px] pr-[70px] pt-[12px] pb-[12px] justify-center items-center">
            <p className="text-gray-800 text-base font-normal font-['NanumGothic'] leading-snug"></p>
          </div>
        </div>
        <div
          className={`flex flex-row w-[204.7px] h-[46px] ${data.length === 0 ? '' : 'border-b border-gray-200'}`}
        >
          <div className="flex w-full h-full pl-[70px] pr-[70px] pt-[12px] pb-[12px] justify-center items-center">
            <p className="text-gray-800 text-base font-normal font-['NanumGothic'] leading-snug"></p>
          </div>
        </div>
        <div
          className={`flex flex-row w-[204.7px] h-[46px] ${data.length === 0 ? '' : 'border-b border-gray-200'}`}
        >
          <div className="flex w-full h-full pl-[70px] pr-[70px] pt-[12px] pb-[12px] justify-center items-center">
            <p className="text-gray-800 text-base font-normal font-['NanumGothic'] leading-snug"></p>
          </div>
        </div>
      </div>
      {data.map((item, mainIndex) => (
        <div className="flex flex-row w-full h-full" key={mainIndex}>
          <div
            className={`flex flex-row w-[204.7px] h-[46px] ${mainIndex + 1 === data.length ? '' : 'border-b border-gray-200'}`}
          >
            <div className="flex w-full h-full pl-[70px] pr-[70px] pt-[12px] pb-[12px] justify-center items-center">
              <p className="text-gray-800 text-base font-normal font-['NanumGothic'] leading-snug">
                {'비교군'} {mainIndex + 1}
              </p>
            </div>
          </div>
          {Object.values(item).map((value, index) => (
            <div
              className={`flex flex-row w-[204.7px] h-[46px] ${mainIndex + 1 === data.length ? '' : 'border-b border-gray-200'}`}
              key={index}
            >
              <div className="flex w-full h-full pl-[70px] pr-[70px] pt-[12px] pb-[12px] justify-center items-center">
                <p className="text-gray-800 text-base font-normal font-['NanumGothic'] leading-snug">
                  {value as string}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
