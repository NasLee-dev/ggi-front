interface DimmedComponentProps {
  children: React.ReactNode
}

const DimmedComponent = ({ children }: DimmedComponentProps) => {
  return (
    <div className="fixed inset-0 backdrop-brightness-50 z-20">{children}</div>
  )
}
export default DimmedComponent
