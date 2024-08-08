'use client'

import DefaultButton from '@/components/commons/buttons/DefaultButton'
import * as S from './style'
import { ChangeEvent, useState } from 'react'
import { useAddressStore } from '@/store/useAddressStore'

export default function AddressSearch() {
  const [keyword, setKeyword] = useState('')
  const { setAddress, setPage } = useAddressStore()

  const handleChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handleClickSearch = () => {
    if (keyword.length < 3) {
      alert('검색어는 세글자 이상 입력되어야 합니다.')
      return
    }
    setAddress(keyword)
    setPage(1)
  }

  return (
    <S.SearchContainer>
      <S.ContainerTitle>
        <h3>주소검색</h3>
      </S.ContainerTitle>
      <S.SearchContent>
        <S.SearchInput
          placeholder="등기 발급 부동산의 주소를 입력해 주세요."
          onChange={handleChangeKeyword}
          value={keyword}
        />
        <DefaultButton text="검색하기" onClick={handleClickSearch} />
      </S.SearchContent>
    </S.SearchContainer>
  )
}
