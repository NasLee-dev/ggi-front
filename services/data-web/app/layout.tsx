import ReactQueryClientProvider from './data-pro/config/ReactQueryClientProvider'
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ReactQueryClientProvider>
  )
}
