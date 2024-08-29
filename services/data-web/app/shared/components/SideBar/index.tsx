'use client'
import React from 'react'
import HomeIcon from '../../../data/data-pro/components/icons/sidebar/Home'
import StatisticsIcon from '../../../data/data-pro/components/icons/sidebar/Statistics'
import DetailStatisticsIcon from '../../../data/data-pro/components/icons/sidebar/DetailStatistics'
import MyPageIcon from '../../../data/data-pro/components/icons/sidebar/MyPage'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <div className="fixed top-0 left-0 w-[120px] h-screen bg-[#f5f5f5] ggi:hidden">
      <div className="flex flex-col absolute top-[108px] left-1/2 -translate-x-1/2 p-[20px] bg-white items-center justify-center rounded-[24px] gap-[40px] z-10">
        <Link href="/data/data-pro">
          <HomeIcon />
        </Link>
        <Link href="/">
          <StatisticsIcon />
        </Link>
        <Link href="/data/data-detail">
          <DetailStatisticsIcon />
        </Link>
        <Link href="/">
          <MyPageIcon />
        </Link>
      </div>
    </div>
  )
}
