import BarChartComponent from './BarChart'
import CombinedChartComponent from './CombinedChart'

export default function ChartComponent({ activeTab }: { activeTab: string }) {
  return (
    <div className="flex w-[1714px]">
      {activeTab === '매각통계' && <BarChartComponent />}
      {activeTab === '실거래통계' && <CombinedChartComponent />}
    </div>
  )
}
