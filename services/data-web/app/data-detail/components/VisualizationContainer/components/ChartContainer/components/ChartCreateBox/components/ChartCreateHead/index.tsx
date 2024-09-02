import ChartCreateBtn from '@/app/data-detail/components/VisualizationContainer/components/ChartCreateBtn'
import CloseButton from '@/app/shared/components/buttons/CloseButton'
import SubTitle from '@/app/shared/components/text/SubTitle'

export default function ChartCreateHead({ handleToggleCreateBox }) {
  return (
    <div className="p-6 w-full border-b border-[#E5E7EB] flex gap-4 relative">
      <ChartCreateBtn />
      <div className="flex-col gap-1">
        <SubTitle title="차트 만들기" />
        <p className="text-[14px] font-normal text-[#6B7280]">
          Y축에 넣을 지표를 선택해주세요. (최대 2개)
        </p>
      </div>
      <div className="absolute top-6 right-6">
        <CloseButton onClick={handleToggleCreateBox} />
      </div>
    </div>
  )
}
