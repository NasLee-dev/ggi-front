import { SearchCondition } from '@/app/data-pro/models/Conditions'
import RealStatistics from '../../realStatistics'
import RepresentComponent from '../../realStatistics/Represent'

interface PdfRealComponentProps {
  searchCondition: SearchCondition
}

export default function PdfRealComponent({
  searchCondition,
}: PdfRealComponentProps) {
  return (
    <div className="flex flex-col w-full gap-10">
      <RepresentComponent isPdfContent={true} />
      <RealStatistics
        searchCondition={searchCondition}
        activeTab={'실거래통계'}
        isPdfContent={true}
      />
    </div>
  )
}
