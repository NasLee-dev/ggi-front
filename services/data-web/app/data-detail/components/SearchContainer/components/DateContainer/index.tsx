import DatePickerContainer from '@/app/data-detail/components/SearchContainer/components/DateContainer/components/DatePickerContainer'
import LastMonthButton from '@/app/data-detail/components/SearchContainer/components/DateContainer/components/LastMonthsButton'
import FilterTitle from '@/app/shared/components/text/FilterTitle'
import { useState } from 'react'
import { Control, useFormContext } from 'react-hook-form'
import { subMonths, endOfMonth } from 'date-fns'

interface DateContainerProps {
  control: Control<any>
}

export default function DateContainer({ control }: DateContainerProps) {
  const [isOpenStartPicker, setIsOpenStartPicker] = useState(false)
  const [isOpenEndPicker, setIsOpenEndPicker] = useState(false)
  const [isPicker, setIsPicker] = useState(false)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [prevStartDate, setPrevStartDate] = useState(startDate)
  const [prevEndDate, setPrevEndDate] = useState(endDate)

  const { setValue } = useFormContext()

  const handleChange = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const handleApply = () => {
    if (endDate && startDate > endDate) {
      alert('시작 날짜는 종료 날짜보다 늦을 수 없습니다.')
      return
    }

    if (startDate && endDate < startDate) {
      alert('종료 날짜는 시작 날짜보다 빠를 수 없습니다.')
      return
    }

    setValue('startDate', startDate)
    setValue('endDate', endDate)
    setPrevStartDate(startDate)
    setPrevEndDate(endDate)
    setIsPicker(false)
  }

  const setDateRange = (monthsAgo: number) => {
    const endDate = endOfMonth(subMonths(new Date(), 1)) // 저번 달 말일
    const startDate = subMonths(endDate, monthsAgo - 1) // endDate 기준 monthsAgo 만큼 이전 날짜 설정
    setValue('startDate', startDate)
    setValue('endDate', endDate)
    setIsOpenStartPicker(false)
    setIsOpenEndPicker(false)
  }

  const resetDate = () => {
    setValue('startDate', null)
    setValue('endDate', null)
    setStartDate(null)
    setEndDate(null)
  }

  const handleCancel = () => {
    setIsPicker(false)
    setStartDate(prevStartDate)
    setEndDate(prevEndDate)
  }

  return (
    <div>
      <FilterTitle title="기준일자" />
      <div className="flex justify-between items-center mt-3 mb-8">
        <DatePickerContainer
          control={control}
          isPicker={isPicker}
          setIsPicker={setIsPicker}
          startDate={startDate}
          endDate={endDate}
          handleChange={handleChange}
          resetDate={resetDate}
          handleCancel={handleCancel}
          handleApply={handleApply}
        />
        <LastMonthButton text="최근 3개월" onClick={() => setDateRange(3)} />
        <LastMonthButton text="최근 6개월" onClick={() => setDateRange(6)} />
        <LastMonthButton text="최근 1년" onClick={() => setDateRange(12)} />
      </div>
    </div>
  )
}
