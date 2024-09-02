export default function RepresentComponent() {
  return (
    <div className="flex flex-row w-[1720px] p-10 h-[176px] bg-white gap-[12px] rounded-[24px] border border-[#E5E7EB]">
      <div className="flex flex-col w-[200px] h-full gap-[12px]">
        <div className="flex justify-start w-full h-full">
          <p className="text-gray-800 text-xl font-bold font-['SUIT'] leading-7">
            대표 매매사례
          </p>
        </div>
        <div className="flex justify-start w-full h-full">
          <p className="text-gray-500 text-[14px] font-medium font-['SUIT'] leading-[18.90px]">
            {'입력한 지번과 가장 유사한 조건에서'}
            <br />
            {'1년 내 매각된 사례 정보'}
          </p>
        </div>
      </div>
      <div className="flex flex-row w-[1436px] h-full gap-[12px]">
        <div className="flex flex-col p-5 gap-[12px] items-start rounded-[24px] bg-[#F8FAFC] w-[350px] h-full">
          <p className="text-gray-500 text-base font-bold font-['SUIT'] leading-snug">
            주소
          </p>
          <p className="text-gray-800 text-base font-normal font-['NanumGothic'] leading-snug">
            서울특별시 용산구 청파동 35-1
          </p>
        </div>
        <div className="flex flex-col p-5 gap-[12px] items-start rounded-[24px] bg-[#F8FAFC] w-[350px] h-full">
          <p className="text-gray-500 text-base font-bold font-['SUIT'] leading-snug">
            용도
          </p>
          <p className="text-gray-800 text-base font-normal font-['NanumGothic'] leading-snug">
            아파트
          </p>
        </div>
        <div className="flex flex-col p-5 gap-[12px] items-start rounded-[24px] bg-[#F8FAFC] w-[350px] h-full">
          <p className="text-gray-500 text-base font-bold font-['SUIT'] leading-snug">
            매매가격
          </p>
          <p className="text-gray-800 text-base font-normal font-['NanumGothic'] leading-snug">
            1,200,000,000원
          </p>
        </div>
        <div className="flex flex-col p-5 gap-[12px] items-start rounded-[24px] bg-[#F8FAFC] w-[350px] h-full">
          <p className="text-gray-500 text-base font-bold font-['SUIT'] leading-snug">
            토지/건물 면적
          </p>
          <p className="text-gray-800 text-base font-normal font-['NanumGothic'] leading-snug">
            37㎡ / 110㎡
          </p>
        </div>
      </div>
    </div>
  )
}
