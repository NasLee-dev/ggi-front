import DatePickerContainer from '@/app/data-detail/components/SearchContainer/components/DateContainer/components/DatePickerContainer'
import FilterTitle from '@/app/shared/components/text/FilterTitle'
import { Control } from 'react-hook-form'

interface DateContainerProps {
  control: Control<any>
}

export default function DateContainer({ control }: DateContainerProps) {
  return (
    <div>
      <FilterTitle title="기준일자" />
      <div className="flex justify-between items-center mt-3 mb-8">
        <DatePickerContainer control={control} />
      </div>
    </div>
  )
}
