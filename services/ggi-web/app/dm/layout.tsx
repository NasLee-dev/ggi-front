import ChaProvider from "./components/layout/ChaProvider"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en">
      <body>
        <ChaProvider>
          {children}
          <div id="root-portal"/>
        </ChaProvider>
      </body>
    </html>
  )
}