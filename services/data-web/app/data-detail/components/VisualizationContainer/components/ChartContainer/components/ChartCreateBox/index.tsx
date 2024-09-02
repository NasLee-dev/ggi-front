import ChartCreateFilterContainer from '@/app/data-detail/components/VisualizationContainer/components/ChartContainer/components/ChartCreateBox/components/ChartCreateFilterContainer'
import ChartCreateHead from '@/app/data-detail/components/VisualizationContainer/components/ChartContainer/components/ChartCreateBox/components/ChartCreateHead'

export default function ChartCreateBox({ handleToggleCreateBox }) {
  return (
    <div className="min-w-[600px] h-full border border-[#E5E7EB] rounded-3xl">
      <ChartCreateHead handleToggleCreateBox={handleToggleCreateBox} />
      <ChartCreateFilterContainer />
    </div>
  )
}
