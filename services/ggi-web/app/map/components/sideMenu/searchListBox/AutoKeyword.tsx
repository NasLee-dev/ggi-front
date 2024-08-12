'use client'
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Flex from 'app/map/components/shared/Flex'
import Spacing from 'app/map/components/shared/Spacing'
import { NaverMap } from '@/models/Map'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { queryKey } from '../../sections/hooks/useMap'
import { KakaoAddrProps, KakaoSubwayProps } from '@/models/Kakao'
import useSearchAddr from './hooks/useSearchAddr'
import useSubwayStation from './hooks/useSubwayStation'
import highlightText from './utils/highlightText'

interface AutoKeywordProps {
  keyword: string
  setKeyword: Dispatch<SetStateAction<string>>
}

type SubwayProps = {
  place_name: string
  x: string
  y: string
}

type AddrProps = {
  address_name: string
  x: string
  y: string
}

type AutoKeywordItem = SubwayProps | AddrProps

export default function AutoKeyword({ keyword, setKeyword }: AutoKeywordProps) {
  const [autoKeyword, setAutoKeyword] = useState<AutoKeywordItem[]>([])
  const { data: map }: UseQueryResult<NaverMap> = useQuery({
    queryKey: queryKey,
    enabled: false,
  })

  useEffect(() => {
    const handleSearch = async (inputKeyword: string) => {
      if (inputKeyword === '') {
        setAutoKeyword([])
        return
      }
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { handleSearch } = useSubwayStation(inputKeyword)
      const subwayLists: KakaoSubwayProps[] | undefined = await handleSearch()
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { searchAddr } = useSearchAddr(inputKeyword)
      const filteredKeyword = inputKeyword.replace('역', '')
      const addrLists: KakaoAddrProps[] | undefined = await searchAddr()
      const subwayData: SubwayProps[] = (subwayLists || [])
        .filter(
          (subway) =>
            subway.category_group_name === '지하철역' &&
            subway.place_name.includes(filteredKeyword),
        )
        .map((subway) => ({
          place_name: subway.address_name + '(' + subway.place_name + ')',
          x: subway.x,
          y: subway.y,
        }))

      const addrData: AddrProps[] = (addrLists || []).map((addr) => ({
        address_name: addr.address_name,
        x: addr.x,
        y: addr.y,
      }))
      setAutoKeyword([...subwayData, ...addrData])
    }
    handleSearch(keyword)
  }, [keyword])

  const handleClickAutoKeyword = useCallback(
    (keyword: AutoKeywordItem) => {
      if (!map) return
      setKeyword(
        'place_name' in keyword ? keyword.place_name : keyword.address_name,
      )
      map.setCenter({
        lat: Number(keyword.y),
        lng: Number(keyword.x),
      })
    },
    [map, setKeyword],
  )

  return (
    <ContainerStyle>
      {autoKeyword.length > 0 ? (
        autoKeyword.map((keys, index) => (
          <React.Fragment key={index}>
            <Flex
              css={AutoKeywordStyle}
              onClick={() => handleClickAutoKeyword(keys)}
            >
              <TextStyle>
                {'place_name' in keys
                  ? highlightText(keys.place_name, keyword)
                  : highlightText(keys.address_name, keyword)}
              </TextStyle>
            </Flex>
            <Spacing size={10} />
          </React.Fragment>
        ))
      ) : (
        <Flex
          css={AutoKeywordStyle}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {keyword !== '' && autoKeyword.length === 0 ? (
            <TextStyle>검색 결과가 없습니다.</TextStyle>
          ) : (
            <TextStyle>키워드를 입력해주세요.</TextStyle>
          )}
        </Flex>
      )}
    </ContainerStyle>
  )
}

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  padding: 5px;
  min-height: 50px;
  max-height: 100px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 60px;
  left: 39px;
  z-index: 101;
  margin: 0 auto;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 4px;
    height: 100px;
  }
  &::-webkit-scrollbar-thumb {
    background: #dfdfdf;
    border-radius: 6px;
  }
`

const TextStyle = styled.span`
  overflow: hidden;
  color: #000001;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 135%;
  letter-spacing: -0.16px;
`

const AutoKeywordStyle = css`
  display: flex;
  width: 320px;
  height: 50px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`
