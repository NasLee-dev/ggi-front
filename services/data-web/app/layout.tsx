import Header from '@/app/shared/components/layout/Header'
import ReactQueryClientProvider from './data-pro/config/ReactQueryClientProvider'
import './globals.css'
import Sidebar from '@/app/shared/components/layout/SideBar'

export const metadata = {
  title: '데이터 프로바이저',
  description: '지지옥션 데이터 프로바이저',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="https://web.ggi.co.kr/GGILogo.ico" />
        </head>
        <body className="custom-scrollbar noselect ">
          <Header />
          <div>
            <Sidebar />
            <div className="pt-[88px] pl-[120px] ggi:pl-0 ggi:pt-[50px]">
              <div className="w-[1794px] p-10 ggi:w-full ggi:p-0">
                {children}
              </div>
            </div>
          </div>
        </body>
      </html>
    </ReactQueryClientProvider>
  )
}
