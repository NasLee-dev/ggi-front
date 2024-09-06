interface IAnnualTableBodyProps {
  data: any[]
}

export default function AnnualTableBody({ data }: IAnnualTableBodyProps) {
  return (
    <div className="flex flex-col w-full">
      {data.map((item, index) => (
        <div key={index} className="flex flex-row w-full h-full ">
          {Object.values(item).map((value, subIndex) => (
            <div
              key={subIndex}
              className={`flex flex-row w-[204.7px] h-[46px] ${index + 1 !== data.length && 'border-b border-gray-200'} ${index + 1 === data.length && 'bg-[#F9FBFF]'}`}
            >
              <div className="flex w-full h-full pl-[20px] pr-[20px] pt-[12px] pb-[12px] justify-center items-center">
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
