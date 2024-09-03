import ChartBox from '@/app/data-detail/components/VisualizationContainer/components/ChartContainer/components/ChartBox'
import ChartCreateBox from '@/app/data-detail/components/VisualizationContainer/components/ChartContainer/components/ChartCreateBox'

interface ChartContainerProps {
  isCreateBox: boolean
  handleToggleCreateBox: () => void
}
export default function ChartContainer({
  isCreateBox,
  handleToggleCreateBox,
}: ChartContainerProps) {
  return (
    <div className="flex gap-5 items-center mb-8">
      <ChartBox />
      {isCreateBox && (
        <ChartCreateBox handleToggleCreateBox={handleToggleCreateBox} />
      )}
    </div>
  )
}
