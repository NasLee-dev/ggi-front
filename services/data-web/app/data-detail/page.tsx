import AreaDetailContainer from '@/app/data-detail/components/AreaDetailContainer'
import PageTop from '@/app/data-detail/components/PageTop'
import SearchContainer from '@/app/data-detail/components/SearchContainer'
import VisualizationContainer from '@/app/data-detail/components/VisualizationContainer'
import MobileProfileBox from '@/app/shared/components/box/MobileProfileBox'

export default function DataDetailPage() {
  return (
    <>
      <MobileProfileBox isFilter />
      <div className="ggi:py-5">
        <PageTop />
        <SearchContainer />
        <AreaDetailContainer />
        <VisualizationContainer />
      </div>
    </>
  )
}
