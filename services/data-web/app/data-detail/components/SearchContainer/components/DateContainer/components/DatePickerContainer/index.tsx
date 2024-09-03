import CalendarIcon from '@/app/data-detail/components/SearchContainer/components/DateContainer/components/DatePickerContainer/components/CalendarIcon'
import DatePickerComponent from '@/app/shared/components/inputs/DatePickerComponent'
import DatePickerSelectComponent from '@/app/shared/components/inputs/DatePickerSelectComponent'
import { Dispatch, SetStateAction } from 'react'
import { Control, Controller } from 'react-hook-form'

interface DatePickerContainerProps {
  control: Control<any>
  isPicker: boolean
  setIsPicker: Dispatch<SetStateAction<boolean>>
  startDate: Date
  endDate: Date
  handleChange: (value: Date) => void
  resetDate: () => void
  handleCancel: () => void
  handleApply: () => void
}

export default function DatePickerContainer({
  control,
  isPicker,
  setIsPicker,
  startDate,
  endDate,
  handleChange,
  resetDate,
  handleCancel,
  handleApply,
}: DatePickerContainerProps) {
  return (
    <div className="w-[835px] h-[50px] px-4 border border-[#E5E7EB] rounded-2xl flex items-center gap-2">
      <CalendarIcon />
      <div className="w-full flex-[1] flex items-center justify-center gap-10">
        <Controller
          name="startDate"
          control={control}
          defaultValue={null}
          render={() => (
            <DatePickerSelectComponent
              isOpen={isPicker}
              handleChange={handleChange}
              onChange={handleChange}
              onApply={handleApply}
              setIsOpen={setIsPicker}
              startDate={startDate}
              endDate={endDate}
              resetDate={resetDate}
              handleCancel={handleCancel}
            />
          )}
        />
      </div>
    </div>
  )
}
