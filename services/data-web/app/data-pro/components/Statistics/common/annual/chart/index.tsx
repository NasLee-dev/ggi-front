import BarChartComponent from './BarChart'
import CombinedChartComponent from './CombinedChart'

export default function ChartComponent({ activeTab }: { activeTab: string }) {
  return (
    <div className="flex w-full">
      {activeTab === '매각통계' && <BarChartComponent />}
      {activeTab === '실거래통계' && <CombinedChartComponent />}
    </div>
  )
}
