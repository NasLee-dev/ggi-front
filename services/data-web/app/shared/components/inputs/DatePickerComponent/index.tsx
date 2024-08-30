'use client'

import React, { useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './styles/style.css'
import { ko } from 'date-fns/locale'

interface DatePickerComponentProps {
  value: Date | null
  onChange: (date: Date | null) => void
  isOpen: boolean
  handleCancelPicker: () => void
  onApply: () => void
}

const DatePickerComponent = React.forwardRef<
  DatePicker,
  DatePickerComponentProps
>(({ value, onChange, isOpen, handleCancelPicker, onApply }, ref) => {
  const updateHeader = () => {
    setTimeout(() => {
      const headerElement = document.querySelector(
        '.react-datepicker__current-month',
      )
      if (headerElement) {
        const [monthWithSymbol, year] = headerElement.textContent.split(' ')
        const month = monthWithSymbol.replace(/[^0-9]/g, '') // "08월"에서 숫자만 추출
        headerElement.textContent = `${year}년 ${month}월`
      }
    }, 0)
  }

  useEffect(() => {
    if (isOpen) {
      updateHeader() // 처음 열릴 때 한 번 업데이트
    }
  }, [isOpen])

  return (
    isOpen && (
      <div className="absolute z-50 top-16 left-1/2 -translate-x-1/2  border border-[#E5E7EB] rounded-xl overflow-hidden">
        <DatePicker
          selected={value}
          onChange={onChange}
          dateFormat="yyyy/MM/dd"
          placeholderText="yyyy / mm / dd"
          ref={ref}
          locale={ko}
          inline
          onMonthChange={updateHeader}
        />
        <div className="custom-footer">
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancelPicker} // 취소 시 기존 값으로 복원
          >
            취소
          </button>
          <button
            type="button"
            className="apply-button"
            onClick={onApply} // 적용 시 최종 값으로 저장
          >
            적용하기
          </button>
        </div>
      </div>
    )
  )
})

DatePickerComponent.displayName = 'DatePickerComponent'

export default DatePickerComponent
