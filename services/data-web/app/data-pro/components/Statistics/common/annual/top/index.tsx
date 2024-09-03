import Info from '../icon/Info'

export default function TopComponent() {
  return (
    <div className="flex flex-col w-full gap-3 ">
      <div className="flex flex-row w-full gap-[10px] justify-start items-center">
        <p className="text-gray-800 text-xl font-bold font-['SUIT'] leading-[27px]">
          연간 데이터
        </p>
        <Info />
      </div>
      <div className="flex w-full">
        <p className="text-blue-600 text-base font-medium font-['SUIT'] leading-snug">
          {
            '서울특별시 용산구 청파동, 2023.08.01 ~ 2024.07.31 경매매각 건, 아파트'
          }
        </p>
      </div>
    </div>
  )
}
