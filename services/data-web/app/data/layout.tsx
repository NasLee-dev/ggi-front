import Header from '@/app/shared/components/Header'
import Sidebar from '@/app/shared/components/SideBar'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div>
        <Sidebar />
        <div className="pt-[88px] pl-[120px] ggi:pl-0">
          <div className="p-10">{children}</div>
        </div>
      </div>
    </>
  )
}
