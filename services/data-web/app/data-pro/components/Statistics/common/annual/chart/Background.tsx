interface BackgroundProps {
  title: string
  children: React.ReactNode
  isRow: boolean
}

export default function Background({
  title,
  children,
  isRow,
}: BackgroundProps) {
  return (
    <div
      className={`flex flex-col gap-5 w-full bg-[#F8FAFC] rounded-[24px] justify-center items-end`}
    >
      <div className={`flex flex-col gap-5 justify-center items-center w-full`}>
        <div className="flex flex-1 w-full justify-between items-center pl-5 pr-5">
          <div className="w-[10%]">
            <img src={'/images/mark.png'} alt="mark" />
          </div>
          <p className="h-7 text-center text-gray-800 text-lg font-bold font-['SUIT'] leading-normal ">
            {title}
          </p>
          <p className="w-[10%]">&nbsp;&nbsp;</p>{' '}
        </div>
        <p className="text-gray-400 text-sm font-medium font-['SUIT'] leading-[18.90px] ">
          (출처 : 지지옥션)
        </p>
      </div>
      <div className={`flex ${isRow ? 'flex-row' : ''} w-full`}>{children}</div>
    </div>
  )
}
