'use client'

import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './styles/style.css'
import { ko } from 'date-fns/locale'
import CloseButton from '@/app/shared/components/buttons/CloseButton'
import { formatDate } from '@/app/shared/utils/formatDate'
import DropIcon from '@/app/shared/components/inputs/DatePickerSelectComponent/components/DropIcon'

interface DatePickerSelectComponentProps {
  isOpen: boolean
  startDate: Date
  endDate: Date
  handleChange: (dates: any) => void
  onApply: () => void
  setIsOpen: Dispatch<SetStateAction<boolean>>
  resetDate: () => void
  handleCancel: () => void
}

const DatePickerSelectComponent = React.forwardRef<
  DatePicker,
  DatePickerSelectComponentProps
>(
  (
    {
      isOpen,
      startDate,
      endDate,
      handleChange,
      onApply,
      setIsOpen,
      resetDate,
      handleCancel,
    },
    ref,
  ) => {
    const datePickerRef = useRef<HTMLDivElement>(null)

    const [isYearOpen, setIsYearOpen] = useState(false)
    const [isMonthOpen, setIsMonthOpen] = useState(false)

    const years = Array.from(
      { length: 25 },
      (_, i) => new Date().getFullYear() - 19 + i,
    )
    const months = Array.from({ length: 12 }, (_, i) =>
      new Date(0, i).toLocaleString('default', { month: 'long' }),
    )

    return (
      <div ref={datePickerRef}>
        {isOpen && (
          <div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 backdrop-brightness-50 hidden ggi:block z-[100]"></div>
        )}
        <DatePicker
          onChange={handleChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          dateFormat="yyyy/MM/dd"
          placeholderText="yyyy / mm / dd ~ yyyy / mm / dd"
          ref={ref}
          locale={ko}
          onInputClick={() => setIsOpen(true)}
          open={isOpen}
          onClickOutside={handleCancel}
          readOnly
          customInput={<input className="custom-input" />}
          renderCustomHeader={({ date, changeYear, changeMonth }) => (
            <div className="custom-header">
              <CloseButton onClick={handleCancel} />

              <div className="dropdown-container">
                <button
                  onClick={() => setIsYearOpen(!isYearOpen)}
                  className="dropdown-btn"
                >
                  {date.getFullYear()}
                  <span className="drop-icon">
                    <DropIcon />
                  </span>
                </button>
                {isYearOpen && (
                  <ul className="dropdown custom-scrollbar">
                    {years.map((year) => (
                      <li
                        key={year}
                        onClick={() => {
                          changeYear(year)
                          setIsYearOpen(false)
                        }}
                      >
                        {year}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="dropdown-container">
                <button
                  onClick={() => setIsMonthOpen(!isMonthOpen)}
                  className="dropdown-btn"
                >
                  {date.toLocaleString('default', { month: 'long' })}
                  <span className="drop-icon">
                    <DropIcon />
                  </span>
                </button>
                {isMonthOpen && (
                  <ul className="dropdown custom-scrollbar">
                    {months.map((month, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          changeMonth(index)
                          setIsMonthOpen(false)
                        }}
                      >
                        {month}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button className="reset-btn" onClick={resetDate}>
                초기화
              </button>
            </div>
          )}
          calendarContainer={({ children }) => (
            <div className="relative">
              {children}
              <div className="custom-footer">
                <button
                  type="button"
                  className="apply-button"
                  onClick={onApply}
                  disabled={!startDate || !endDate}
                  style={{
                    backgroundColor:
                      (startDate && endDate && '#2563EB') || '#F3F4F6',
                    color: (startDate && endDate && '#fff') || '#6B7280',
                  }}
                >
                  <p>
                    {(startDate && formatDate(startDate)) || 'yyyy.mm.dd'}
                    &nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
                    {(endDate && formatDate(endDate)) || 'yyyy.mm.dd'}
                  </p>
                  {startDate && endDate && '적용하기'}
                </button>
              </div>
            </div>
          )}
        />
      </div>
    )
  },
)

DatePickerSelectComponent.displayName = 'DatePickerSelectComponent'

export default DatePickerSelectComponent
