import DefaultCheckbox from '@/components/commons/checkbox/DefaultCheckbox'
import * as S from './style'
import { Address } from '@/components/deunggi/ContentTop/AddressSearch/api/addressSearh'
import { useRef, useState } from 'react'

export default function SearchList({
  data,
  index,
}: {
  data: Address
  index: number
}) {
  const [isCheck, setIsCheck] = useState(false)

  const checkboxRef = useRef<HTMLInputElement>(null)

  const handleClickCheckbox = () => {
    if (checkboxRef.current) {
      // checkboxRef.current가 null이 아닌 경우
      console.log(checkboxRef.current)
      const isChecked = checkboxRef.current.checked
      setIsCheck(isChecked) // 체크 여부를 상태에 저장
      console.log('Checkbox checked:', isChecked) // 체크 여부를 콘솔에 출력
    }
  }

  return (
    <S.SearchLi>
      <S.SearchValue width="7.88%">
        <DefaultCheckbox
          id={`checkbox${index}`}
          ref={checkboxRef}
          onChange={handleClickCheckbox}
          isCheck={isCheck}
        />
      </S.SearchValue>
      <S.SearchValue width="6.96%">{index}</S.SearchValue>
      <S.SearchValue width="16.1%">{data.uniquenumber}</S.SearchValue>
      <S.SearchValue width="10.31%">{data.type}</S.SearchValue>
      <S.SearchValue width="46.56%">{data.sojaeji}</S.SearchValue>
      <S.SearchValue width="12.08%">{data.dungkiState}</S.SearchValue>
    </S.SearchLi>
  )
}
