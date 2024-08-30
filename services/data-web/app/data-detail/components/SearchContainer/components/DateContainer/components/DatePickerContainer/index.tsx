import CalendarIcon from '@/app/data-detail/components/SearchContainer/components/DateContainer/components/DatePickerContainer/components/CalendarIcon'
import DatePickerComponent from '@/app/shared/components/inputs/DatePickerComponent'
import { Control, Controller } from 'react-hook-form'

interface DatePickerContainerProps {
  control: Control<any>
  isOpenStartPicker: boolean
  isOpenEndPicker: boolean
  startDateValue: string
  endDateValue: string
  handleClickStartPicker: () => void
  handleClickEndPicker: () => void
  handleChangeStartDate: (value: Date) => void
  handleChangeEndDate: (value: Date) => void
  handleStartDateApply: () => void
  handleEndDateApply: () => void
}

export default function DatePickerContainer({
  control,
  isOpenStartPicker,
  isOpenEndPicker,
  startDateValue,
  endDateValue,
  handleClickStartPicker,
  handleClickEndPicker,
  handleChangeStartDate,
  handleChangeEndDate,
  handleStartDateApply,
  handleEndDateApply,
}: DatePickerContainerProps) {
  return (
    <div className="w-[852px] h-[50px] px-4 border border-[#E5E7EB] rounded-2xl flex items-center gap-2">
      <CalendarIcon />
      <div className="flex-[1] flex items-center justify-center">
        {' '}
        <div className="relative w-[190px] h-full detail-date-picker ">
          <p
            onClick={handleClickStartPicker}
            className="w-full h-full flex justify-center items-center cursor-pointer"
          >
            {startDateValue}
          </p>
          <Controller
            name="startDate"
            control={control}
            defaultValue={null}
            render={({ field: { value } }) => (
              <DatePickerComponent
                isOpen={isOpenStartPicker}
                value={value}
                onChange={handleChangeStartDate}
                handleCancelPicker={handleClickStartPicker}
                onApply={handleStartDateApply}
              />
            )}
          />
        </div>
        <span>~</span>
        <div className="relative w-[190px] h-full detail-date-picker ">
          <p
            onClick={handleClickEndPicker}
            className="w-full h-full flex justify-center items-center cursor-pointer"
          >
            {endDateValue}
          </p>
          <Controller
            name="startDate"
            control={control}
            defaultValue={null}
            render={({ field: { value } }) => (
              <DatePickerComponent
                isOpen={isOpenEndPicker}
                value={value}
                onChange={handleChangeEndDate}
                handleCancelPicker={handleClickEndPicker}
                onApply={handleEndDateApply}
              />
            )}
          />
        </div>
      </div>
    </div>
  )
}
