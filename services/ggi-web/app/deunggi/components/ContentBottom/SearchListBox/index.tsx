'use client'

import Loading from 'app/deunggi/components/commons/loading/Loading'
import { useAddressSearchQuery } from '../../ContentTop/AddressSearch/hook/useGetAddressSearch'
import * as S from './style'
import { useAddressStore } from '@/store/useAddressStore'
import SearchList from './SearchList'
import DefaultPagination from 'app/deunggi/components/commons/pagination/DefaultPagination'

export default function SearchListBox() {
  const { address, page, setPage } = useAddressStore()

  const { data: addressData, isLoading } = useAddressSearchQuery(page, address)

  const totalPages = addressData?.totalPage

  const handleChangePage = (page: number) => {
    setPage(page)
  }

  return (
    <>
      <S.ListContainer>
        <S.TableContainer width={addressData ? '873px' : '100%'}>
          {address && !isLoading && (
            <S.ListHead>
              <S.HeadList width="7.88%" mobileWidth="55px">
                선택
              </S.HeadList>
              <S.HeadList width="6.96%" mobileWidth="62px">
                NO
              </S.HeadList>
              <S.HeadList width="16.1%" mobileWidth="144px">
                고유번호
              </S.HeadList>
              <S.HeadList width="10.31%" mobileWidth="92px">
                구분
              </S.HeadList>
              <S.HeadList width="46.56%" mobileWidth="415px">
                주소
              </S.HeadList>
              <S.HeadList width="12.08%" mobileWidth="105px">
                상태
              </S.HeadList>
            </S.ListHead>
          )}

          <S.ListContent>
            {!addressData ? (
              <S.EmptyContent>
                {isLoading ? (
                  <Loading />
                ) : (
                  '주소를 검색하시면 이곳에 결과가 표시됩니다.'
                )}
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
        </S.TableContainer>
      </S.ListContainer>
      {addressData?.addrInfo && (
        <DefaultPagination
          totalPages={totalPages ? totalPages : 1}
          currentPage={page}
          onPageChange={handleChangePage}
        />
      )}
    </>
  )
}
