import Flex from 'app/map/components/shared/Flex'
import ListRow from 'app/map/components/shared/ListRow'
import Skeleton from 'app/map/components/shared/Skeleton'
import Text from 'app/map/components/shared/Text'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil'
import { authInfo } from '@/store/atom/auth'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { NaverMap } from 'app/map/models/map/Map'
import { queryKey } from 'app/map/components/sections/hooks/useMap'
import BigArrow from 'app/map/components/icons/BigArrow'
import SelectedOnly from './icons/SelectedOnly'

interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  pageInfo: number
}

export default function Header({
  isOpen,
  setIsOpen,
  isLoading,
  pageInfo,
}: Props) {
  const { data: map }: UseQueryResult<NaverMap> = useQuery({
    queryKey: queryKey,
    enabled: false,
  })
  const auth = useRecoilValue(authInfo)
  return (
    <>
      <Flex direction="row" css={ContainerStyle}>
        {isLoading ? (
          <ListRow
            right={null}
            contents={<Skeleton width={150} height={32} />}
            onClick={() => setIsOpen((prev) => !prev)}
          />
        ) : map && map.getZoom() >= 15 ? (
          <ListRow
            left={<SearchText isOpen={isOpen}>검색결과</SearchText>}
            right={
              <Flex
                direction="row"
                style={{
                  gap: '10px',
                }}
              >
                {auth.id !== '' && <SelectedOnly />}
                <BigArrow isOpen={isOpen} setIsOpen={setIsOpen} />
              </Flex>
            }
            contents={<SearchText isOpen={isOpen}>{pageInfo}건</SearchText>}
          />
        ) : map && map.getZoom() < 15 ? (
          <ListRow
            left={<SearchText isOpen={isOpen}>검색결과</SearchText>}
            right={<BigArrow isOpen={isOpen} setIsOpen={setIsOpen} />}
            contents={
              <Text
                css={NoResultText}
                style={{
                  color: isOpen ? '#000001' : '#d21e1b',
                }}
              >
                지도를 확대해주세요
              </Text>
            }
          />
        ) : null}
      </Flex>
    </>
  )
}

const ContainerStyle = css`
  display: flex;
  width: 350px;
  height: 30px;
  position: 'sticky';
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
`

const SearchText = styled.span<{ isOpen?: boolean }>`
  color: ${({ isOpen }) => (isOpen ? '#000001' : '#d21e1b')};
  font-family: SUIT;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 135%;
  letter-spacing: -0.24px;
`
const NoResultText = css`
  color: #545454;
  margin-left: 70px;
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 135%;
  letter-spacing: -0.16px;
`
