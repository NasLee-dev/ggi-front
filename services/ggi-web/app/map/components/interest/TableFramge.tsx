import styled from '@emotion/styled'
import Text from '../shared/Text'
import { css } from '@emotion/react'
import Star0 from './icons/star0'
import Star1 from './icons/star1'
import Star2 from './icons/star2'
import Star3 from './icons/star3'
import Star4 from './icons/star4'
import Star5 from './icons/star5'

interface TableFrameProps {
  title: string
  contents: string[] | string | React.ReactNode
  background?: string
  height?: string
  starRating?: number | null
}

export default function TableFrame({
  title,
  contents,
  background,
  height,
  starRating,
}: TableFrameProps) {
  return (
    <ContainerFrame height={height}>
      <CategoryFrame
        background={background}
        height={height}
        style={{
          flexDirection: 'row',
        }}
      >
        <Text css={CategoryTextStyle}>{title}</Text>
      </CategoryFrame>
      <ContentsFrame height={height}>
        <Text css={ContentsTextStyle}>{contents}</Text>
        {title === '등록그룹' ? <></> : null}
        {starRating !== undefined && starRating !== null
          ? 
            (() => {
              switch (starRating) {
                case 0:
                  return <Star0 />
                case 1:
                  return <Star1 />
                case 2:
                  return <Star2 />
                case 3:
                  return <Star3 />
                case 4:
                  return <Star4 />
                case 5:
                  return <Star5 />
                default:
                  return null 
              }
            })()
          : null}
      </ContentsFrame>
    </ContainerFrame>
  )
}

const ContainerFrame = styled.div<{ height?: string }>`
  width: 740px;
  flex-shrink: 0;
  flex-direction: row;
  display: flex;
  height: ${({ height }) =>
    height ? (parseInt(height) + 10).toString() + 'px' : '65px'};
`

const CategoryFrame = styled.div<{ background?: string; height?: string }>`
  display: flex;
  width: 100px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  background: ${({ background }) => background || '#F0F3FF'};
  border-bottom: 1px solid #bcbcbc;
`

const ContentsFrame = styled.div<{ height?: string }>`
  display: flex;
  width: 640px;
  min-height: ${({ height }) =>
    height ? (parseInt(height) - 1).toString() + 'px' : '64px'};
  max-height: 200px;
  padding: ${({ height }) =>
    height ? '5px 10px 0px 10px' : '0px 10px 0px 10px'};
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-bottom: 1px solid #bcbcbc;
  overflow-y: hidden;
  overflow-x: hidden;
`

const CategoryTextStyle = css`
  color: #000001;
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 125%;
  letter-spacing: -0.32px;
`

const ContentsTextStyle = css`
  color: #000001;
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 125%;
  letter-spacing: -0.32px;
`
