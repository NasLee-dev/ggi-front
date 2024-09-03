import { useState } from 'react'
import TableBody from './T.body'
import TableHeader from './T.header'

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
    <div className="flex flex-col w-full h-[200px] mt-[20px]">
      <TableHeader activeTab={activeTab} />
      <TableBody data={dummy} activeTab={activeTab} />
    </div>
  )
}
