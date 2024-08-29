import Header from '@/app/shared/components/Header'
import ReactQueryClientProvider from './data-pro/config/ReactQueryClientProvider'
import './globals.css'
import Sidebar from '@/app/shared/components/SideBar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body>
          <Header />
          <div>
            <Sidebar />
            <div className="pt-[88px] pl-[120px] ggi:pl-0">
              <div className="p-10">{children}</div>
            </div>
          </div>
        </body>
      </html>
    </ReactQueryClientProvider>
  )
}
