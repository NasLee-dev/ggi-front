import CreateIcon from '@/app/data-detail/components/VisualizationContainer/components/ChartCreateBtn/components/CreateIcon'

interface ChartCreateBtnProps {
  handleToggleCreateBox?: () => void
}
export default function ChartCreateBtn({
  handleToggleCreateBox,
  ...props
}: ChartCreateBtnProps) {
  return (
    <button
      className="w-[50px] h-[50px] flex justify-center items-center rounded-2xl border border-[#E5E7EB]"
      onClick={handleToggleCreateBox}
      {...props}
    >
      <CreateIcon />
    </button>
  )
}
