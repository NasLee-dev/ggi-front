'use client'

import RootLayoutProvider from "./components/layout/RootLayoutProvider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <RootLayoutProvider>
          {children}
        </RootLayoutProvider>
      </body>
    </html>
  )
}
