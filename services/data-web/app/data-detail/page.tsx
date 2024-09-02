import AreaDetailContainer from '@/app/data-detail/components/AreaDetailContainer'
import PageTop from '@/app/data-detail/components/PageTop'
import SearchContainer from '@/app/data-detail/components/SearchContainer'
import VisualizationContainer from '@/app/data-detail/components/VisualizationContainer'

export default function DataDetailPage() {
  return (
    <>
      <PageTop />
      <SearchContainer />
      <AreaDetailContainer />
      <VisualizationContainer />
    </>
  )
}
