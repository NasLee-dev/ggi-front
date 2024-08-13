import DefaultCheckbox from 'app/deunggi/components/commons/checkbox/DefaultCheckbox'
import * as S from './style'
import { useRef, useState } from 'react'

export default function BasketList({
  data,
  index,
}: {
  data: any
  index: number
}) {
  const [isCheck, setIsCheck] = useState(false)

  const checkboxRef = useRef<HTMLInputElement>(null)

  const handleClickCheckbox = () => {
    if (checkboxRef.current) {
      const isChecked = checkboxRef.current.checked
      setIsCheck(isChecked)
    }
  }

  return (
    <S.TableLi>
      <S.TableValue width="7.66%">
        <DefaultCheckbox
          id={`checkbox${index}`}
          ref={checkboxRef}
          onChange={handleClickCheckbox}
          isCheck={isCheck}
        />
      </S.TableValue>
      <S.TableValue width="16.08%">{data.uniquenumber}</S.TableValue>
      <S.TableValue width="10.16%">{data.type}</S.TableValue>
      <S.TableValue width="44.25%">{data.address}</S.TableValue>
      <S.TableValue width="12%">{data.status}</S.TableValue>
      <S.TableValue width="9.58%">{data.price}</S.TableValue>
    </S.TableLi>
  )
}
