import FilterCheckIcon from '@/app/data-detail/components/VisualizationContainer/components/ChartContainer/components/ChartCreateBox/components/ChartCreateFilterContainer/components/ChartCreateFilterBox/components/FilterCheckIcon'
import FilterButton from '@/app/shared/components/buttons/FilterButton'
import FilterTitle from '@/app/shared/components/text/FilterTitle'

interface ChartCreateFilterBoxProps {
  title: string
  description: string
  disabled?: boolean
  options: {
    title: string
    name: string
  }[]
}

export default function ChartCreateFilterBox({
  title,
  description,
  disabled,
  options,
}: ChartCreateFilterBoxProps) {
  return (
    <div className="[&:not(:last-child)]:mb-8">
      <div className="w-full flex justify-between items-center">
        <FilterTitle title={title} />
        <p className="text-[14px] font-normal text-[#6B7280]">{description}</p>
      </div>
      <div className="w-full py-2 px-4 bg-[#F8FAFC] rounded-2xl mt-3 flex flex-wrap gap-2">
        {options.map((el, index) => (
          <FilterButton
            key={index}
            text={
              el.title === '전체' ? (
                <div className="flex items-center gap-2">
                  전체
                  <FilterCheckIcon />
                </div>
              ) : (
                el.title
              )
            }
            name={el.name}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  )
}
