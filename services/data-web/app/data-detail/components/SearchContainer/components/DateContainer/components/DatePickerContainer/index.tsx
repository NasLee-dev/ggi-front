import CalendarIcon from '@/app/data-detail/components/SearchContainer/components/DateContainer/components/DatePickerContainer/components/CalendarIcon'
import DatePickerComponent from '@/app/shared/components/inputs/DatePickerComponent'
import { formatDate } from '@/app/shared/utils/formatDate'
import { useState } from 'react'
import { Control, Controller, useFormContext } from 'react-hook-form'

interface DatePickerContainerProps {
  control: Control<any>
}

export default function DatePickerContainer({
  control,
}: DatePickerContainerProps) {
  const [isOpenStartPicker, setIsOpenStartPicker] = useState(false)
  const [isOpenEndPicker, setIsOpenEndPicker] = useState(false)
  const [startDateValue, setStartDateValue] = useState('yyyy / mm / dd')
  const [endDateValue, setEndDateValue] = useState('yyyy / mm / dd')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const { setValue } = useFormContext()

  const handleClickStartPicker = () => {
    setIsOpenStartPicker((prev) => !prev)
  }
  const handleClickEndPicker = () => {
    setIsOpenEndPicker((prev) => !prev)
  }

  const handleChangeStartDate = (value) => {
    setStartDate(value)
  }

  const handleChangeEndDate = (value) => {
    setEndDate(value)
  }

  const handleStartDateApply = () => {
    if (endDate && startDate > endDate) {
      alert('시작 날짜는 종료 날짜보다 빠를 수 없습니다.')
      return
    }

    if (!endDate || startDate <= endDate) {
      setValue('startDate', startDate)
      setStartDateValue(formatDate(startDate))
      setIsOpenStartPicker(false)
    }
  }

  const handleEndDateApply = () => {
    if (startDate && endDate < startDate) {
      alert('종료 날짜는 시작 날짜보다 빠를 수 없습니다.')
      return
    }

    if (!startDate || endDate >= startDate) {
      setValue('endDate', endDate)
      setEndDateValue(formatDate(endDate))
      setIsOpenEndPicker(false)
    }
  }

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
