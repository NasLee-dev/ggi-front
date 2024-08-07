'use client'

import { forwardRef } from 'react'
import * as S from './style'

interface DefaultCheckboxProps {
  id: string
  onChange: () => void
  isCheck: boolean
}

const DefaultCheckbox = forwardRef<HTMLInputElement, DefaultCheckboxProps>(
  ({ id, onChange, isCheck }: DefaultCheckboxProps, ref) => {
    return (
      <>
        <S.HideCheckbox
          id={id}
          ref={ref}
          type="checkbox"
          checked={isCheck}
          onChange={onChange}
        />
        <S.CustomCheckbox htmlFor={id} isCheck={isCheck}>
          {isCheck && <img src="/images/checked.png" alt="체크" />}
        </S.CustomCheckbox>
      </>
    )
  },
)

export default DefaultCheckbox
