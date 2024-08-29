'use client'
import React from 'react'

import Link from 'next/link'
import HomeIcon from '@/app/shared/components/layout/SideBar/components/Home'
import StatisticsIcon from '@/app/shared/components/layout/SideBar/components/Statistics'
import DetailStatisticsIcon from '@/app/shared/components/layout/SideBar/components/DetailStatistics'
import MyPageIcon from '@/app/shared/components/layout/SideBar/components/MyPage'

export default function Sidebar() {
  return (
    <div className="fixed top-0 left-0 w-[120px] h-screen bg-[#f5f5f5] ggi:hidden">
      <div className="flex flex-col absolute top-[108px] left-1/2 -translate-x-1/2 p-[20px] bg-white items-center justify-center rounded-[24px] gap-[40px] z-10">
        <Link href="/data-pro">
          <HomeIcon />
        </Link>
        <Link href="/">
          <StatisticsIcon />
        </Link>
        <Link href="/data-detail">
          <DetailStatisticsIcon />
        </Link>
        <Link href="/">
          <MyPageIcon />
        </Link>
      </div>
    </div>
  )
}
