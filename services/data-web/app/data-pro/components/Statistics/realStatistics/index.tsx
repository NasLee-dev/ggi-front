import { SearchCondition } from '@/app/data-pro/models/Conditions'
import TableComponent from '../common/table'

interface RealStatisticsProps {
  activeTab: string
  searchCondition: SearchCondition
  isPdfContent: boolean
}

export default function RealStatistics({
  activeTab,
  searchCondition,
  isPdfContent,
}: RealStatisticsProps) {
  return (
    <div>
      <TableComponent
        activeTab={activeTab}
        searchCondition={searchCondition}
        isPdfContent={isPdfContent}
      />
    </div>
  )
}
