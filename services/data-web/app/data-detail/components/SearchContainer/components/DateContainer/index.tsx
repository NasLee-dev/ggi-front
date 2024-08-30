import DatePickerContainer from '@/app/data-detail/components/SearchContainer/components/DateContainer/components/DatePickerContainer'
import LastMonthButton from '@/app/data-detail/components/SearchContainer/components/DateContainer/components/LastMonthsButton'
import FilterTitle from '@/app/shared/components/text/FilterTitle'
import { formatDate } from '@/app/shared/utils/formatDate'
import { useState } from 'react'
import { Control, useFormContext } from 'react-hook-form'
import { subMonths, endOfMonth } from 'date-fns'

interface DateContainerProps {
  control: Control<any>
}

export default function DateContainer({ control }: DateContainerProps) {
  const [isOpenStartPicker, setIsOpenStartPicker] = useState(false)
  const [isOpenEndPicker, setIsOpenEndPicker] = useState(false)
  const [startDateValue, setStartDateValue] = useState('yyyy / mm / dd')
  const [endDateValue, setEndDateValue] = useState('yyyy / mm / dd')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const { setValue } = useFormContext()

  const handleClickStartPicker = () => {
    setIsOpenStartPicker((prev) => !prev)
    setIsOpenEndPicker(false)
  }
  const handleClickEndPicker = () => {
    setIsOpenEndPicker((prev) => !prev)
    setIsOpenStartPicker(false)
  }

  const handleChangeStartDate = (value: Date) => {
    setStartDate(value)
  }

  const handleChangeEndDate = (value: Date) => {
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

  const setDateRange = (monthsAgo: number) => {
    const endDate = endOfMonth(subMonths(new Date(), 1)) // 저번 달 말일
    const startDate = subMonths(endDate, monthsAgo - 1) // endDate 기준 monthsAgo 만큼 이전 날짜 설정
    setValue('startDate', startDate)
    setValue('endDate', endDate)
    setStartDateValue(formatDate(startDate))
    setEndDateValue(formatDate(endDate))
    setIsOpenStartPicker(false)
    setIsOpenEndPicker(false)
  }

  return (
    <div>
      <FilterTitle title="기준일자" />
      <div className="flex justify-between items-center mt-3 mb-8">
        <DatePickerContainer
          control={control}
          isOpenStartPicker={isOpenStartPicker}
          isOpenEndPicker={isOpenEndPicker}
          startDateValue={startDateValue}
          endDateValue={endDateValue}
          handleClickStartPicker={handleClickStartPicker}
          handleClickEndPicker={handleClickEndPicker}
          handleChangeStartDate={handleChangeStartDate}
          handleChangeEndDate={handleChangeEndDate}
          handleStartDateApply={handleStartDateApply}
          handleEndDateApply={handleEndDateApply}
        />
        <LastMonthButton text="최근 3개월" onClick={() => setDateRange(3)} />
        <LastMonthButton text="최근 6개월" onClick={() => setDateRange(6)} />
        <LastMonthButton text="최근 1년" onClick={() => setDateRange(12)} />
      </div>
    </div>
  )
}
