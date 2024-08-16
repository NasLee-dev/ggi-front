import DefaultCheckbox from 'app/deunggi/components/commons/checkbox/DefaultCheckbox'
import * as S from './style'
import { useRef, useState } from 'react'
import { useBasketDataStore } from '@/store/useDeunggiStore'
import { toLocalStringFn } from 'utils/commons/toLocalString'

export default function BasketList({
  data,
  index,
}: {
  data: any
  index: number
}) {
  const { setBasketData, isChecked } = useBasketDataStore()

  const checkboxRef = useRef<HTMLInputElement>(null)

  const handleClickCheckbox = () => {
    if (checkboxRef.current) {
      setBasketData(data)
    }
  }

  return (
    <S.TableLi>
      <S.TableValue width="7.66%">
        <DefaultCheckbox
          id={`checkbox${index}`}
          ref={checkboxRef}
          onChange={handleClickCheckbox}
          isCheck={isChecked(data)}
        />
      </S.TableValue>
      <S.TableValue width="16.08%">{data.uniquenumber}</S.TableValue>
      <S.TableValue width="10.16%">{data.type}</S.TableValue>
      <S.TableValue width="44.25%">{data.address}</S.TableValue>
      <S.TableValue width="12%">{data.status}</S.TableValue>
      <S.TableValue width="9.58%">{toLocalStringFn(data.price)}원</S.TableValue>
    </S.TableLi>
  )
}
