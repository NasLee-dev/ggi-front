import ChartBox from '@/app/data-detail/components/VisualizationContainer/components/ChartContainer/components/ChartBox'
import ChartCreateBox from '@/app/data-detail/components/VisualizationContainer/components/ChartContainer/components/ChartCreateBox'
import ChartLayout from '@/app/shared/components/layout/ChartLayout'

interface ChartContainerProps {
  isCreateBox: boolean
  handleToggleCreateBox: () => void
}
export default function ChartContainer({
  isCreateBox,
  handleToggleCreateBox,
}: ChartContainerProps) {
  return (
    <div className="flex gap-5 items-center mb-8 ggi:px-4">
      <ChartBox />
      {/* <ChartLayout title="차트제목">차트</ChartLayout> */}
      {isCreateBox && (
        <ChartCreateBox handleToggleCreateBox={handleToggleCreateBox} />
      )}
    </div>
  )
}
