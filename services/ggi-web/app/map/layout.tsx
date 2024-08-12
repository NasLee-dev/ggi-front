'use client'
import InterestContextProvider from 'contexts/useModalContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <InterestContextProvider>{children}</InterestContextProvider>
}
