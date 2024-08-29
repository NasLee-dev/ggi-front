import styled from '@emotion/styled'
import { Dispatch, SetStateAction } from 'react'
import { css } from '@emotion/react'
import Flex from '../../../shared/Flex'
import useResult from './hooks/useResult'
import Header from './Header'
import { MapItems } from '@/models/map/MapItem'
import Form from './icons/items/Form'
import Loader from './icons/loading/loader/Loader'
import Spacing from 'app/map/components/shared/Spacing'
import Text from 'app/map/components/shared/Text'
import InfiniteScroll from 'react-infinite-scroll-component'
import ListSkeleton from './Skeleton'

interface ResultProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  dragStateRef: React.MutableRefObject<boolean>
}

const Result = ({ isOpen, setIsOpen, dragStateRef }: ResultProps) => {
  const {
    isShowingList: showingList,
    mapListItems,
    scrollbarRef,
    handleReturnSelectedItems,
    handleReturnPageInfo,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isOnlySelected,
    auth,
  } = useResult(setIsOpen, dragStateRef)
  return (
    <Flex
      direction="column"
      justify="start"
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0px',
      }}
    >
      {showingList ? (
        mapListItems?.contents && mapListItems?.contents.length > 0 ? (
          <>
            <Header
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              isLoading={isLoading}
              pageInfo={handleReturnPageInfo() as number}
            />
            {isOpen && auth.id !== '' && (
              <Form
                item={handleReturnSelectedItems() as MapItems}
                index={0}
                isSelected={true}
                isDetailed={true}
              />
            )}
            <Container isOpen={isOpen} id="scrollbarDiv" ref={scrollbarRef}>
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {!isOnlySelected && (
                    <InfiniteScroll
                      dataLength={mapListItems.contents.length}
                      next={fetchNextPage}
                      hasMore={hasNextPage ?? true}
                      loader={<ListSkeleton />}
                      scrollableTarget="scrollbarDiv"
                    >
                      {mapListItems.contents.map((item, index) => (
                        <Form
                          key={index}
                          item={item}
                          index={auth.id === '' ? index : index + 1}
                          isSelected={false}
                          isDetailed={false}
                        />
                      ))}
                    </InfiniteScroll>
                  )}
                </>
              )}
            </Container>
          </>
        ) : (
          <>
            <Header
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              isLoading={isLoading}
              pageInfo={handleReturnPageInfo() as number}
            />
            {isOpen && auth.id !== '' && (
              <Form
                item={handleReturnSelectedItems() as MapItems}
                index={0}
                isSelected={true}
                isDetailed={true}
              />
            )}
            <ContainerNone isOpen={true} idCode={auth.id}>
              {auth.id === '' && (
                <>
                  <Spacing size={20} />
                  <Text css={NoResultText}>
                    검색 결과가 없습니다. 좌표를 이동해주세요.
                  </Text>
                </>
              )}
            </ContainerNone>
          </>
        )
      ) : (
        <>
          <Header
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isLoading={isLoading}
            pageInfo={mapListItems?.paging?.totalElements ?? 0}
          />
          <ContainerNone isOpen={true} idCode={auth.id}>
            <Spacing size={20} />
            <Text css={NoResultText}>
              300m 초과에서는 매물 종류(경매/예정/공매)
              <br />와 용도로만 필터링 할 수 있습니다.
            </Text>
          </ContainerNone>
        </>
      )}
    </Flex>
  )
}

const ContainerNone = styled.div<{ isOpen: boolean; idCode: string }>`
  height: ${({ isOpen, idCode }) =>
    idCode === ''
      ? isOpen
        ? 'calc(100% - 60px)'
        : '0px'
      : isOpen
        ? 'calc(100% - 60px)'
        : '0px'};
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`

const Container = styled.div<{ isOpen: boolean }>`
  height: ${({ isOpen }) => (isOpen ? 'calc(100% - 60px)' : '0px')};
  display: flex;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    background: #dfdfdf;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  & {
    scrollbar-width: thin;
    scrollbar-color: #dfdfdf #fff;
  }

  &:hover {
    scrollbar-color: #555 #fff;
  }
  & > * {
    width: 100%;
  }
`

const NoResultText = css`
  color: #545454;
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  letter-spacing: -0.16px;
`

export default Result
