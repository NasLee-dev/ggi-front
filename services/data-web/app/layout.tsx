import Header from '@/app/shared/components/layout/Header'
import ReactQueryClientProvider from './data-pro/config/ReactQueryClientProvider'
import './globals.css'
import Sidebar from '@/app/shared/components/layout/SideBar'

export const metadata = {
  title: 'Your App Title',
  description: 'Your App Description',
  icons: {
    icon: '/favicon.ico', // favicon 설정
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className="custom-scrollbar">
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
