import DatePickerContainer from '@/app/data-detail/components/SearchContainer/components/DateContainer/components/DatePickerContainer'
import LastMonthButton from '@/app/data-detail/components/SearchContainer/components/DateContainer/components/LastMonthsButton'
import FilterTitle from '@/app/shared/components/text/FilterTitle'
import { useEffect, useState } from 'react'
import { Control, useFormContext } from 'react-hook-form'
import { subMonths, endOfMonth } from 'date-fns'

interface DateContainerProps {
  control: Control<any>
}

export default function DateContainer({ control }: DateContainerProps) {
  const [isPicker, setIsPicker] = useState(false)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [prevStartDate, setPrevStartDate] = useState(startDate)
  const [prevEndDate, setPrevEndDate] = useState(endDate)
  const [activeButton, setActiveButton] = useState(null)

  const { setValue } = useFormContext()

  const handleChange = (dates: any) => {
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
    setStartDate(startDate)
    setEndDate(endDate)
    setPrevStartDate(startDate)
    setPrevEndDate(endDate)
    setValue('startDate', startDate)
    setValue('endDate', endDate)
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

  useEffect(() => {
    if (startDate && endDate) {
      const monthsDifference = Math.round(
        (endDate - startDate) / (1000 * 60 * 60 * 24 * 30),
      )
      setActiveButton(monthsDifference + 1)
    }
  }, [startDate, endDate])

  return (
    <div>
      <FilterTitle title="기준일자" />
      <div className="flex justify-between items-center mt-3 mb-8 gap-2 ggi:flex-col ggi:mt-2 ggi:mb-5">
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
        <div className="flex flex-1 justify-between ggi:w-full">
          <LastMonthButton
            active={activeButton === 3}
            text="최근 3개월"
            onClick={() => setDateRange(3)}
          />
          <LastMonthButton
            active={activeButton === 6}
            text="최근 6개월"
            onClick={() => setDateRange(6)}
          />
          <LastMonthButton
            active={activeButton === 12}
            text="최근 1년"
            onClick={() => setDateRange(12)}
          />
        </div>
      </div>
    </div>
  )
}
