import FilterButton from '@/app/shared/components/buttons/FilterButton'
import FilterTitle from '@/app/shared/components/text/FilterTitle'
import { USE_ARRAY } from '@/app/shared/constant'

export default function UseContainer() {
  return (
    <div>
      <FilterTitle title="용도" />
      <div className="w-full py-2 px-4 bg-[#F8FAFC] rounded-2xl mt-3 flex flex-wrap gap-2">
        {USE_ARRAY.map((el, index) => (
          <FilterButton key={index} text={el} />
        ))}
      </div>
    </div>
  )
}
