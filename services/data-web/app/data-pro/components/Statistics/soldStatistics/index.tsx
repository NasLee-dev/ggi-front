import { SearchCondition } from '@/app/data-pro/models/Common'
import TableComponent from '../common/table'

interface SoldComponentProps {
  searchCondition: SearchCondition
  activeTab: string
}

export default function SoldComponent({
  searchCondition,
  activeTab,
}: SoldComponentProps) {
  return (
    <div className="flex w-full">
      <TableComponent searchCondition={searchCondition} activeTab={activeTab} />
    </div>
  )
}
