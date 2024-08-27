export default function Address() {
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
        <div
          className="flex w-[30%] h-[34px] p-1 justify-center items-center flex-1 align-self-stretch rounded-full bg-[#F3F4F6]"
          style={{ gap: 'var(--Components-Badge-Gap-Between, 1px)' }}
        >
          <p className="text-gray-500 text-base font-normal font-['NanumGothic'] leading-snug">
            시도
          </p>
        </div>
        <div
          className="flex w-[30%] h-[34px] p-1 justify-center items-center flex-1 align-self-stretch rounded-full bg-[#F3F4F6]"
          style={{ gap: 'var(--Components-Badge-Gap-Between, 1px)' }}
        >
          <p className="text-gray-500 text-base font-normal font-['NanumGothic'] leading-snug">
            시군구
          </p>
        </div>
        <div
          className="flex w-[30%] h-[34px] p-1 justify-center items-center flex-1 align-self-stretch rounded-full bg-[#F3F4F6]"
          style={{ gap: 'var(--Components-Badge-Gap-Between, 1px)' }}
        >
          <p className="text-gray-500 text-base font-normal font-['NanumGothic'] leading-snug">
            읍면동
          </p>
        </div>
      </div>
    </div>
  )
}
