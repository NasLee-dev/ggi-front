/* eslint-disable react-hooks/rules-of-hooks */

import {
  clickedInfoAtom,
  clickedItemAtom,
  isPyeongState,
} from '@/store/atom/map'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil'
import { useCallback } from 'react'
import { fromSquareMetersToText } from 'utils/map/MeterToText'
import { removeCommas } from 'utils/map/RemoveCommas'
import useNum2Han from 'utils/map/useNum2Han'
import NewPageIcon from './icons/NewPageIcon'
import Flex from '../shared/Flex'
import Text from '../shared/Text'

interface BottomProps {
  nowIndex: number
}

export default function Bottom({ nowIndex }: BottomProps) {
  const clickedItem = useRecoilValue(clickedItemAtom)
  const clickedInfo = useRecoilValue(clickedInfoAtom)
  const isPyeong = useRecoilValue(isPyeongState)
  const handleDetailPage = (type: number, idCode: string) => {
    if (type === 1) {
      return `https://www.ggi.co.kr/kyungmae/mulgun_detail_popup_h.asp?idcode=${idCode}`
    } else if (type === 2 || type === 3) {
      return `https://www.ggi.co.kr/gongmae/GongMae_popup.asp?goodsid=${idCode}&new=new`
    } else if (type === 4) {
      return `https://www.ggi.co.kr/wait/mulgun_detail_popup_w.asp?idcode=${idCode}&new=new&viewchk=P`
    }
  }
  const buildingAreaPyeong = fromSquareMetersToText(
    removeCommas(
      (clickedInfo[nowIndex]?.buildingArea as string)?.split('㎡')[0] ?? '0',
    ),
  )[1]
  const landAreaPyeong = fromSquareMetersToText(
    removeCommas(
      (clickedInfo[nowIndex]?.landArea as string)?.split('㎡')[0] ?? '0',
    ),
  )[1]

  const handleDuplicatedOpen = useCallback(
    (idCode: string, type: number) => {
      if (window) {
        const url = handleDetailPage(type, idCode)
        const win = window.open(url, 'popup_new', 'width=1220,height=1000')
        if (win) {
          win.focus()
        }
      }
    },
    [clickedInfo, nowIndex, handleDetailPage],
  )

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        borderRadius: ' 0px 0px 8px 8px',
        background: '#FFF',
      }}
    >
      <AmountContainer>
        <Flex
          direction="column"
          style={{
            display: 'flex',
            gap: '0px',
          }}
        >
          <Text css={AmountTitleTextStyle}>
            {(clickedInfo[nowIndex]?.claimAmt ?? 0) > 0
              ? '청구액'
              : clickedInfo && (clickedInfo[nowIndex]?.winAmt ?? 0) > 0
                ? '낙찰가'
                : '최저가'}
          </Text>
          <Text css={AmountTextStyle}>
            {clickedInfo && (clickedInfo[nowIndex]?.claimAmt ?? 0) > 0
              ? useNum2Han(
                  clickedInfo[nowIndex]?.claimAmt ?? 0,
                  clickedInfo && (clickedInfo[nowIndex]?.winAmt ?? 0),
                )
              : clickedItem?.winYn === 'Y'
                ? useNum2Han(
                    clickedInfo[nowIndex]?.winAmt ?? 0,
                    clickedInfo && (clickedInfo[nowIndex]?.winAmt ?? 0),
                  )
                : useNum2Han(
                    clickedInfo[nowIndex]?.minAmt ?? 0,
                    clickedInfo && (clickedInfo[nowIndex]?.winAmt ?? 0),
                  ) +
                  '(' +
                  (((clickedInfo && clickedInfo[nowIndex]?.ratio) as number) > 0
                    ? clickedInfo && clickedInfo[nowIndex]?.ratio
                    : 0) +
                  '%)'}
          </Text>
        </Flex>
        <Flex
          style={{
            width: '20px',
            height: '20px',
            flexShrink: 0,
            cursor: 'pointer',
            position: 'absolute',
            right: 0,
            top: '4px',
          }}
          onClick={() => {
            const type = clickedInfo && (clickedInfo[nowIndex]?.type as number)
            const goodsID =
              clickedInfo &&
              (clickedInfo[nowIndex]?.type === 2 ||
                clickedInfo[nowIndex]?.type === 3)
                ? clickedInfo[nowIndex]?.goodsID
                : clickedInfo && clickedInfo[nowIndex]?.idCode
            if (type && goodsID) {
              handleDuplicatedOpen(goodsID, type)
            }
          }}
        >
          <NewPageIcon />
        </Flex>
      </AmountContainer>
      <DetailContainer>
        <Flex
          style={{
            flexDirection: 'row',
            position: 'relative',
          }}
        >
          <div
            css={dotStyle}
            style={{
              backgroundColor: '#545454',
              position: 'absolute',
              left: 0,
              top: 7.5,
            }}
          />
          &nbsp;&nbsp;&nbsp;
          <Text css={DetailTextStyle}>
            {clickedInfo && clickedInfo[nowIndex]?.usage}
          </Text>
        </Flex>
        {clickedInfo && clickedInfo[nowIndex]?.claimAmt === undefined && (
          <Flex
            style={{
              flexDirection: 'row',
              position: 'relative',
            }}
          >
            <div
              css={dotStyle}
              style={{
                backgroundColor: '#545454',
                position: 'absolute',
                left: 0,
                top: 7.5,
              }}
            />
            &nbsp;&nbsp;&nbsp;
            <Text css={DetailTextStyle}>
              {'감정가 ' +
                useNum2Han(
                  clickedInfo[nowIndex]?.appraisalAmt ?? 0,
                  clickedInfo && (clickedInfo[nowIndex]?.winAmt ?? 0),
                )}
            </Text>
          </Flex>
        )}
        {clickedInfo && clickedInfo[nowIndex]?.claimAmt === undefined && (
          <Flex
            style={{
              flexDirection: 'row',
              position: 'relative',
              width: '100%',
              height: '20px',
            }}
          >
            <div
              css={dotStyle}
              style={{
                backgroundColor: '#E9413E',
                position: 'absolute',
                left: 0,
                top: 7.5,
              }}
            />
            &nbsp;&nbsp;&nbsp;
            <Text
              css={DetailTextStyle}
              style={{
                color: '#E9413E',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {(('유찰 ' +
                (clickedInfo && clickedInfo[nowIndex]?.failCount)) as string) +
                '회'}
            </Text>
            {clickedInfo &&
              clickedInfo[nowIndex]?.landArea &&
              clickedInfo[nowIndex].claimAmt !== 0 && (
                <>
                  <Text
                    style={{
                      color: '#CBCBCB',
                      fontFamily: 'SUIT',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: '600',
                      lineHeight: '140%',
                      letterSpacing: '-0.14px',
                    }}
                  >
                    &nbsp;{' | '}&nbsp;
                  </Text>
                  <Text css={DetailTextStyle}>
                    {isPyeong
                      ? '토지 ' + landAreaPyeong
                      : '토지 ' + clickedInfo[nowIndex]?.landArea}
                  </Text>
                </>
              )}
            {clickedInfo && clickedInfo[nowIndex]?.buildingArea && (
              <>
                <Text
                  style={{
                    color: '#CBCBCB',
                    fontFamily: 'SUIT',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    lineHeight: '140%',
                    letterSpacing: '-0.14px',
                  }}
                >
                  &nbsp;{' | '}&nbsp;
                </Text>
                <Text css={DetailTextStyle}>
                  {isPyeong
                    ? '건물 ' + buildingAreaPyeong
                    : '건물 ' + clickedInfo[nowIndex]?.buildingArea}
                </Text>
              </>
            )}
          </Flex>
        )}
        {clickedInfo && (clickedInfo[nowIndex]?.claimAmt as number) > 0 && (
          <Flex
            style={{
              flexDirection: 'row',
              position: 'relative',
            }}
          >
            <div
              css={dotStyle}
              style={{
                backgroundColor: '#545454',
                position: 'absolute',
                left: 0,
                top: 7.5,
              }}
            />
            &nbsp;&nbsp;&nbsp;
            <Text css={DetailTextStyle}>{'경매개시일'}</Text>
            <Text
              style={{
                color: '#CBCBCB',
                fontFamily: 'SUIT',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: '600',
                lineHeight: '140%',
                letterSpacing: '-0.14px',
              }}
            >
              &nbsp;{' | '}&nbsp;
            </Text>
            <Text css={DetailTextStyle}>
              {clickedInfo && clickedInfo[nowIndex]?.startDate}
            </Text>
          </Flex>
        )}
        <Flex
          style={{
            flexDirection: 'row',
            position: 'relative',
          }}
        >
          <div
            css={dotStyle}
            style={{
              backgroundColor: '#545454',
              position: 'absolute',
              left: 0,
              top: 7.5,
            }}
          />
          &nbsp;&nbsp;&nbsp;
          <Text
            css={DetailTextStyle}
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {clickedInfo && clickedInfo[nowIndex]?.shortAddress}
          </Text>
        </Flex>
      </DetailContainer>
    </div>
  )
}

const AmountContainer = styled.div`
  width: 90%;
  justify-content: space-between;
  display: flex;
  position: absolute;
  top: 12px;
`

const AmountTitleTextStyle = css`
  color: #545454;

  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.12px;
`

const AmountTextStyle = css`
  color: #000001;
  font-family: SUIT;
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: 140%;
  letter-spacing: -0.2px;
`

const DetailContainer = styled.div`
  width: 85%;
  display: flex;
  position: absolute;
  top: 55px;
  flex-direction: column;
`
const DetailTextStyle = css`
  color: #545454;
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const dotStyle = css`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  position: absolute;
  top: 5px;
`
