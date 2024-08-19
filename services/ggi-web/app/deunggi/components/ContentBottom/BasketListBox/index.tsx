'use client'

import DefaultPagination from 'app/deunggi/components/commons/pagination/DefaultPagination'
import BasketList from './BasketList'
import * as S from './style'
import { FlexColumn } from 'styles/sharedStyle'
import { useEffect, useState } from 'react'
import { toLocalStringFn } from 'utils/commons/toLocalString'

const BASKET_LIST = [
  {
    uniquenumber: '1234567890',
    type: '건물',
    address: '서울특별시 성동구',
    status: '현행',
    price: 1004000,
  },
  {
    uniquenumber: '1234567891',
    type: '건물',
    address: '서울특별시 광진구',
    status: '현행',
    price: 1000000,
  },
  {
    uniquenumber: '1234567892',
    type: '건물',
    address: '서울특별시 성동구',
    status: '현행',
    price: 3000000,
  },
  {
    uniquenumber: '1234567893',
    type: '건물',
    address: '서울특별시 송파구',
    status: '현행',
    price: 100000,
  },
]

export default function BasketListBox() {
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    let totalPrice = 0
    BASKET_LIST.forEach((data) => {
      const price = data.price
      totalPrice += price
    })
    setTotalPrice(totalPrice)
  }, [])

  return (
    <FlexColumn gap={8}>
      <S.ListContainer>
        <S.TableContainer width={BASKET_LIST.length > 0 ? '888px' : '100%'}>
          <S.ListHead>
            <S.HeadList width="7.66%" mobileWidth="55px">
              선택
            </S.HeadList>
            <S.HeadList width="16.08%" mobileWidth="140px">
              고유번호
            </S.HeadList>
            <S.HeadList width="10.16%" mobileWidth="88px">
              구분
            </S.HeadList>
            <S.HeadList width="44.25%" mobileWidth="388px">
              주소
            </S.HeadList>
            <S.HeadList width="12%" mobileWidth="100px">
              상태
            </S.HeadList>
            <S.HeadList width="9.58%" mobileWidth="110px">
              단가
            </S.HeadList>
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
        </S.TableContainer>
      </S.ListContainer>
      <S.TotalPriceBox>
        <p>
          총 결제 금액 &nbsp;&nbsp;:&nbsp;&nbsp; {toLocalStringFn(totalPrice)}원
        </p>
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
