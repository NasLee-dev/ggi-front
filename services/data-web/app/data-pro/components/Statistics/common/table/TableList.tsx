import { useState } from 'react'
import TableBody from './T.body'
import TableHeader from './T.header'
import { REAL_HEADER, SOLD_HEADER } from '@/app/data-pro/constants/Table'

interface TableListProps {
  activeTab: string
}

export default function TableList({ activeTab }: TableListProps) {
  const [dummy, setDummy] = useState<any[]>(
    Array(2).fill({
      usage: '주거',
      appraisalPrice: 100000000,
      auctionPrice: 100000000,
      auctionRate1: 100,
      progressCount: 100,
      auctionCount: 100,
      auctionRate2: 100,
    }),
  )
  return (
    <div className="flex flex-col w-[100%] h-[200px] mt-[20px]">
      <TableHeader
        tableHeader={activeTab === '매각통계' ? SOLD_HEADER : REAL_HEADER}
      />
      <TableBody data={dummy} />
    </div>
  )
}
