import * as S from './style'
import { useRef, useState } from 'react'
import { Address } from '../../../ContentTop/AddressSearch/api/addressSearch'
import DefaultCheckbox from 'app/deunggi/components/commons/checkbox/DefaultCheckbox'
import { useDeunggiDataStore } from '@/store/useDeunggiStore'

export default function SearchList({
  data,
  index,
}: {
  data: Address
  index: number
}) {
  const { setDeunggiData, isChecked } = useDeunggiDataStore()

  const checkboxRef = useRef<HTMLInputElement>(null)

  const handleClickCheckbox = () => {
    if (checkboxRef.current) {
      setDeunggiData(data)
    }
  }

  return (
    <S.TableLi>
      <S.TableValue width="7.88%">
        <DefaultCheckbox
          id={`checkbox${index}`}
          ref={checkboxRef}
          onChange={handleClickCheckbox}
          isCheck={isChecked(data)}
        />
      </S.TableValue>
      <S.TableValue width="6.96%">{index}</S.TableValue>
      <S.TableValue width="16.1%">{data.uniquenumber}</S.TableValue>
      <S.TableValue width="10.31%">{data.type}</S.TableValue>
      <S.TableValue width="46.56%">{data.sojaeji}</S.TableValue>
      <S.TableValue width="12.08%">{data.dungkiState}</S.TableValue>
    </S.TableLi>
  )
}
