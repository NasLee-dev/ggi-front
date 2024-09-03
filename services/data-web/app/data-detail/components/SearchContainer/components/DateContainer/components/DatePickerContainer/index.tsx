import CalendarIcon from '@/app/data-detail/components/SearchContainer/components/DateContainer/components/DatePickerContainer/components/CalendarIcon'
import DatePickerSelectComponent from '@/app/shared/components/inputs/DatePickerSelectComponent'
import { Dispatch, SetStateAction } from 'react'
import { Control, Controller } from 'react-hook-form'

interface DatePickerContainerProps {
  control: Control<any>
  isPicker: boolean
  startDate: Date
  endDate: Date
  setIsPicker: Dispatch<SetStateAction<boolean>>
  handleChange: (value: Date) => void
  resetDate: () => void
  handleCancel: () => void
  handleApply: () => void
}

export default function DatePickerContainer({
  control,
  isPicker,
  startDate,
  endDate,
  setIsPicker,
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
