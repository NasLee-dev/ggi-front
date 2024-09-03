'use client'

import React, { Dispatch, SetStateAction, useRef } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './styles/style.css'
import { ko } from 'date-fns/locale'
import PrevIcon from '@/app/shared/components/icons/PrevIcon'
import NextIcon from '@/app/shared/components/icons/NextIcon'


interface DatePickerComponentProps {
  value: Date | null
  onChange: (value: Date | null) => void
  handleChange: (date: Date | null) => void
  onApply: () => void
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const DatePickerComponent = React.forwardRef<
  DatePicker,
  DatePickerComponentProps
>(({ value, onChange, onApply, isOpen, handleChange, setIsOpen }, ref) => {
  const datePickerRef = useRef<HTMLDivElement>(null)

  const handleInputFocus = () => {
    setIsOpen(true)
  }

  const handleInput = (e) => {
    const inputValue = e.target.value.replace(/\D/g, '') // 숫자 이외의 문자 제거
    let formattedValue = inputValue
    const { selectionStart } = e.target // 커서 위치 저장

    // 포맷팅 적용
    if (inputValue.length >= 8) {
      formattedValue = `${inputValue.slice(0, 4)}/${inputValue.slice(4, 6)}/${inputValue.slice(6, 8)}`
    } else if (inputValue.length >= 6) {
      formattedValue = `${inputValue.slice(0, 4)}/${inputValue.slice(4, 6)}/${inputValue.slice(6)}`
    } else if (inputValue.length >= 4) {
      formattedValue = `${inputValue.slice(0, 4)}/${inputValue.slice(4)}`
    }

    const wasDeleting = e.nativeEvent.inputType === 'deleteContentBackward'
    e.target.value = formattedValue

    // 커서 위치 조정
    let cursorPosition = selectionStart
    if (!wasDeleting && (selectionStart === 4 || selectionStart === 7)) {
      cursorPosition += 1
    }
    if (wasDeleting && (selectionStart === 5 || selectionStart === 8)) {
      cursorPosition -= 1
    }
    e.target.setSelectionRange(cursorPosition, cursorPosition)
  }

  return (
    <div ref={datePickerRef}>
      <DatePicker
        selected={value}
        onChange={handleChange}
        dateFormat="yyyy/MM/dd"
        placeholderText="yyyy / mm / dd"
        ref={ref}
        locale={ko}
        onInputClick={() => setIsOpen(true)}
        open={isOpen}
        onClickOutside={() => setIsOpen(false)}
        customInput={
          <input
            className="custom-input"
            onFocus={handleInputFocus}
            onInput={handleInput}
          />
        }
        calendarContainer={({ children }) => (
          <div className="relative">
            {children}
            <div className="custom-footer">
              <button
                type="button"
                className="cancel-button"
                onClick={() => setIsOpen(false)} // 취소 시 기존 값으로 복원
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
        )}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="custom-header flex justify-between items-center p-2">
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              <PrevIcon />
            </button>
            <span className="text-[18px] font-bold text-[#1F2937]">
              {date.getFullYear()}년{' '}
              {date.toLocaleString('default', { month: 'long' })}
            </span>
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              <NextIcon />
            </button>
          </div>
        )}
      />
    </div>
  )
})

DatePickerComponent.displayName = 'DatePickerComponent'

export default DatePickerComponent
