'use client'

import DefaultPagination from 'app/deunggi/components/commons/pagination/DefaultPagination'
import BasketList from './BasketList'
import * as S from './style'
import { FlexColumn } from 'styles/sharedStyle'

const BASKET_LIST = [
  {
    uniquenumber: '1234567890',
    type: '건물',
    address: '서울특별시 성동구',
    status: '현행',
    price: '1,004,000 원',
  },
  {
    uniquenumber: '1234567891',
    type: '건물',
    address: '서울특별시 광진구',
    status: '현행',
    price: '1,000,000 원',
  },
  {
    uniquenumber: '1234567892',
    type: '건물',
    address: '서울특별시 성동구',
    status: '현행',
    price: '3,000,000 원',
  },
  {
    uniquenumber: '1234567893',
    type: '건물',
    address: '서울특별시 송파구',
    status: '현행',
    price: '100,000 원',
  },
]

export default function BasketListBox() {
  return (
    <FlexColumn gap={8}>
      <S.ListContainer>
        <S.ListHead>
          <S.HeadList width="7.66%">선택</S.HeadList>
          <S.HeadList width="16.08%">고유번호</S.HeadList>
          <S.HeadList width="10.16%">구분</S.HeadList>
          <S.HeadList width="44.25%">주소</S.HeadList>
          <S.HeadList width="12%">상태</S.HeadList>
          <S.HeadList width="9.58%">단가</S.HeadList>
        </S.ListHead>
        <S.ListContent>
          {BASKET_LIST.length < 1 ? (
            <S.EmptyContent>
              {/* {isLoading ? <Loading /> : '장바구니 내역이 존재하지 않습니다.'} */}
              장바구니 내역이 존재하지 않습니다.
            </S.EmptyContent>
          ) : (
            BASKET_LIST.map((data, index) => (
              <BasketList key={data.uniquenumber} data={data} index={index} />
            ))
          )}
        </S.ListContent>
      </S.ListContainer>
      <S.TotalPriceBox>
        <p>총 결제 금액 &nbsp;&nbsp;:&nbsp;&nbsp; 2,000원</p>
      </S.TotalPriceBox>
      {BASKET_LIST.length > 0 && (
        <DefaultPagination
          totalPages={10}
          currentPage={1}
          onPageChange={() => {}}
        />
      )}
    </FlexColumn>
  )
}
