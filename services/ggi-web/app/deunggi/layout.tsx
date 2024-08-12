'use client'

import RootLayoutProvider from "./components/header/RootLayoutProvider"

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
