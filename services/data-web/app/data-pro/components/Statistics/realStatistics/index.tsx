import TableComponent from '../common/table'

export default function RealStatistics({ activeTab, searchCondition }: any) {
  return (
    <div>
      <TableComponent activeTab={activeTab} searchCondition={searchCondition} />
    </div>
  )
}
