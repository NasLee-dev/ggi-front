interface TableHeaderProps {
  activeTab: string
}
export default function TableHeader({ activeTab }) {
  return (
    <div className="flex flex-row w-full">
      <div className="flex w-[204.7px] h-[50px] pt-3 pb-3 pl-5 pr-5 justify-center items-center border-b border-gray-200 ">
        <p className="text-gray-500 text-base font-bold font-['NanumGothic'] leading-snug text-center">
          구분
        </p>
      </div>
      <div className="flex w-[204.7px] h-[50px] pt-3 pb-3 pl-5 pr-5 justify-center items-center border-b border-gray-200 ">
        <p className="text-gray-500 text-base font-bold font-['NanumGothic'] leading-snug text-center">
          용도
        </p>
      </div>
      <div className="flex w-[204.7px] h-[50px] pt-3 pb-3 pl-5 pr-5 justify-center items-center border-b border-gray-200 ">
        <p className="text-gray-500 text-base font-bold font-['NanumGothic'] leading-snug text-center">
          {activeTab === '매각통계' ? '감정가 총액(원)' : '평균 평당가(만원)'}
        </p>
      </div>
      <div className="flex w-[204.7px] h-[50px] pt-3 pb-3 pl-5 pr-5 justify-center items-center border-b border-gray-200 ">
        <p className="text-gray-500 text-base font-bold font-['NanumGothic'] leading-snug text-center">
          {activeTab === '매각통계' ? '매각가 총액(원)' : '최저 평당가(만원)'}
        </p>
      </div>
      <div className="flex w-[204.7px] h-[50px] pt-3 pb-3 pl-5 pr-5 justify-center items-center border-b border-gray-200 ">
        <p className="text-gray-500 text-base font-bold font-['NanumGothic'] leading-snug text-center">
          {activeTab === '매각통계' ? '매각가율' : '최고 평당가(만원)'}
        </p>
      </div>
      <div className="flex w-[204.7px] h-[50px] pt-3 pb-3 pl-5 pr-5 justify-center items-center border-b border-gray-200 ">
        <p className="text-gray-500 text-base font-bold font-['NanumGothic'] leading-snug text-center">
          {activeTab === '매각통계' ? '진행건수' : '평균 거래면적(㎡)'}
        </p>
      </div>
      <div className="flex w-[204.7px] h-[50px] pt-3 pb-3 pl-5 pr-5 justify-center items-center border-b border-gray-200 ">
        <p className="text-gray-500 text-base font-bold font-['NanumGothic'] leading-snug text-center">
          {activeTab === '매각통계' ? '매각건수' : '거래량'}
        </p>
      </div>
      <div className="flex w-[204.7px] h-[50px] pt-3 pb-3 pl-5 pr-5 justify-center items-center border-b border-gray-200">
        <p className="text-gray-500 text-base font-bold font-['NanumGothic'] leading-snug text-center">
          {activeTab === '매각통계'
            ? '매각율'
            : '전년 동기 평당가(만원)\n 상승률(%)'}
        </p>
      </div>
    </div>
  )
}
