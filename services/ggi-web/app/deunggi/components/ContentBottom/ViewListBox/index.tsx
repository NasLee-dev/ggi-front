'use client'

import DefaultPagination from 'app/deunggi/components/commons/pagination/DefaultPagination'
import ViewList from './ViewList'
import * as S from './style'

const VIEW_LIST = [
  {
    time: '2024-08-05',
    type: '건물',
    address: '서울특별시 성동구',
    status: '열람',
  },
  {
    time: '2024-08-05',
    type: '건물',
    address: '서울특별시 성동구',
    status: '과다등기',
  },
  {
    time: '2024-08-05',
    type: '건물',
    address: '서울특별시 성동구',
    status: '열람',
  },
  {
    time: '2024-08-05',
    type: '건물',
    address: '서울특별시 성동구',
    status: '열람',
  },
]

export default function ViewListBox() {
  return (
    <>
      <S.ListContainer>
        <S.ListHead>
          <S.HeadList width="7.66%">선택</S.HeadList>
          <S.HeadList width="16.08%">열람일시</S.HeadList>
          <S.HeadList width="10.16%">구분</S.HeadList>
          <S.HeadList width="44.25%">주소</S.HeadList>
          <S.HeadList width="12%">열람</S.HeadList>
          <S.HeadList width="9.58%">다운로드</S.HeadList>
        </S.ListHead>
        <S.ListContent>
          {VIEW_LIST.length < 1 ? (
            <S.EmptyContent>
              {/* {isLoading ? <Loading /> : '장바구니 내역이 존재하지 않습니다.'} */}
              열람 내역이 존재하지 않습니다.
            </S.EmptyContent>
          ) : (
            VIEW_LIST.map((data, index) => (
              <ViewList key={index} data={data} index={index} />
            ))
          )}
        </S.ListContent>
      </S.ListContainer>
      {VIEW_LIST.length > 0 && (
        <DefaultPagination
          totalPages={10}
          currentPage={1}
          onPageChange={() => {}}
        />
      )}
    </>
  )
}
