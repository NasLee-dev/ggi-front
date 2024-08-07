'use client'

import * as S from './style'
import { useAddressStore } from '@/store/useAddressStore'
import { useAddressSearchQuery } from '@/components/deunggi/ContentTop/AddressSearch/hook/useGetAddressSearch'
import SearchList from '@/components/deunggi/ContentBottom/SearchListBox/SearchList'

export default function SearchListBox() {
  const { address, page } = useAddressStore()

  // React Query 훅을 사용하여 데이터 가져오기
  const { data: addressData } = useAddressSearchQuery(page, address)

  return (
    <S.ListContainer>
      <S.ListHead>
        <S.HeadList width="7.88%">선택</S.HeadList>
        <S.HeadList width="6.96%">NO</S.HeadList>
        <S.HeadList width="16.1%">고유번호</S.HeadList>
        <S.HeadList width="10.31%">구분</S.HeadList>
        <S.HeadList width="46.56%">주소</S.HeadList>
        <S.HeadList width="12.08%">상태</S.HeadList>
      </S.ListHead>
      <S.ListContent>
        {!addressData ? (
          <S.EmptyContent>
            주소를 검색하시면 이곳에 결과가 표시됩니다.
          </S.EmptyContent>
        ) : (
          addressData?.addrInfo?.map((data, index) => (
            <SearchList
              key={data.uniquenumber}
              data={data}
              index={
                addressData.currentPage === 1
                  ? index + 1
                  : index + 10 * (addressData.currentPage - 1) + 1
              }
            />
          ))
        )}
      </S.ListContent>
    </S.ListContainer>
  )
}
