import ChartCreateFilterBox from '@/app/data-detail/components/VisualizationContainer/components/ChartContainer/components/ChartCreateBox/components/ChartCreateFilterContainer/components/ChartCreateFilterBox'
import {
  AUCTION_CASES,
  AUCTION_TOTALS,
  BIDDER_COUNT,
  SALES_INDICATORS,
} from '@/app/shared/constant/chartFilter'

export default function ChartCreateFilterContainer() {
  return (
    <div className="w-full p-6">
      <ChartCreateFilterBox
        title="매각지표"
        description="(미진행율) 유찰, 변경, 취하 등으로 진행되지 않은 사건의 비율"
        options={SALES_INDICATORS}
      />
      <ChartCreateFilterBox
        title="응찰자 수"
        description="설정된 경매조건 아래 매각 완료된 사건의 평균 응찰자 수"
        options={BIDDER_COUNT}
      />
      <ChartCreateFilterBox
        title="경매건수"
        description="경매 진행, 매각, 유찰, 변경, 위하건의 수치"
        options={AUCTION_CASES}
      />
      <ChartCreateFilterBox
        title="경매총액"
        description="매각 완료된 경매사건의 감정가 총액 및 매각가 총액"
        options={AUCTION_TOTALS}
        disabled
      />
    </div>
  )
}
