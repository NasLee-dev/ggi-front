'use client'
import React from 'react'
import HomeIcon from './icons/sidebar/Home'
import StatisticsIcon from './icons/sidebar/Statistics'
import DetailStatisticsIcon from './icons/sidebar/DetailStatistics'
import MyPageIcon from './icons/sidebar/MyPage'

export default function Sidebar() {
  return (
    <div className="flex flex-col fixed top-[120px] left-[30px] p-[20px] bg-white items-center justify-center rounded-[100px] gap-[40px] z-10">
      <HomeIcon />
      <StatisticsIcon />
      <DetailStatisticsIcon />
      <MyPageIcon />
    </div>
  )
}
