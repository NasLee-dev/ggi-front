import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  clickedInfoAtom,
  clickedItemAtom,
  isOnlySelectedAtom,
} from '@/store/atom/map'
import { useInterestContext } from 'contexts/useModalContext'
import MiniMap from './MiniMap'
import { Swiper, SwiperSlide } from 'swiper/react'
import NextImageWithFallback from '../shared/NextImageWithFallback'
import NoImage from './icons/NoImage'
import { colors } from 'app/styles/colorPallette'
import Interest from '../icons/Interest'
import NextBtn from './icons/NextBtn'
import PrevBtn from './icons/PrevBtn'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import Text from '../shared/Text'
import Flex from '../shared/Flex'

export default function Carousel({
  nowIndex,
  setNowIndex,
}: {
  nowIndex: number
  setNowIndex: Dispatch<SetStateAction<number>>
}) {
  const [image, setImage] = useState<string[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)
  const clickedItem = useRecoilValue(clickedItemAtom)
  const isOnlySelected = useRecoilValue(isOnlySelectedAtom)
  const [clickedInfo, setClickedInfo] = useRecoilState(clickedInfoAtom)
  useEffect(() => {
    if (clickedInfo) {
      setImage(
        clickedInfo.map((info) =>
          info?.type === 1
            ? 'https://www.ggi.co.kr' + info?.path
            : info?.type === 2 || info?.type === 3
              ? 'http://file.ggi.co.kr/Gongmae/Pic/' + info?.path
              : 'https://www.ggi.co.kr/' + info?.path,
        ),
      )
    }
  }, [clickedItem, clickedInfo])

  const handleDetailPage = (idCode: string, type: number) => {
    if (type === 1) {
      return `https://www.ggi.co.kr/kyungmae/mulgun_detail_popup_h.asp?idcode=${idCode}`
    } else if (type === 2 || type === 3) {
      return `https://www.ggi.co.kr/gongmae/GongMae_popup.asp?goodsid=${idCode}&new=new`
    } else if (type === 4) {
      return `https://www.ggi.co.kr/wait/mulgun_detail_popup_w.asp?idcode=${idCode}&new=new&viewchk=P`
    }
  }
  const { open } = useInterestContext()

  const onButtonClick = () => {
    setOpenModal(false)
  }

  const handleDuplicatedOpen = useCallback(
    (idCode: string, type: number) => {
      if (window) {
        const url = handleDetailPage(idCode, type)
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
        width: '299px',
        height: '180px',
        position: 'relative',
      }}
    >
      {clickedInfo &&
        clickedInfo.map((info, index) =>
          info?.type === 4 ? (
            <div
              key={index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
                width: '299px',
                height: '180px',
                borderRadius: '8px 8px 0px 0px',
              }}
              onClick={() => {
                clickedInfo && clickedInfo[nowIndex]?.type === 4
                  ? handleDuplicatedOpen(
                      clickedInfo[nowIndex]?.idCode as string,
                      clickedInfo[nowIndex]?.type as number,
                    )
                  : null
              }}
            >
              <MiniMap
                clickedItem={clickedItem}
                clickedInfo={clickedInfo}
                index={nowIndex}
              />
            </div>
          ) : null,
        )}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        freeMode={true}
        style={{
          width: '299px',
          height: '180px',
          borderRadius: '8px 8px 0px 0px',
          position: 'relative',
          cursor: 'pointer',
          zIndex: 10,
        }}
        onSlideChange={(swiper) => {
          setNowIndex(swiper.activeIndex)
        }}
        onClick={() => {
          clickedInfo && clickedInfo[nowIndex]?.type === 4
            ? handleDuplicatedOpen(
                clickedInfo[nowIndex]?.idCode as string,
                clickedInfo[nowIndex]?.type as number,
              )
            : null
        }}
      >
        {clickedInfo &&
          clickedInfo?.map((info, index) => (
            <SwiperSlide key={info?.id || info?.goodsID || index}>
              {info?.type === 1 || info?.type === 2 || info?.type === 3 ? (
                <div>
                  <NextImageWithFallback
                    src={image[index] ?? ''}
                    alt="image"
                    fallbackComponent={
                      <NoImage winYn={(info?.winAmt as number) > 0} />
                    }
                    width={299}
                    height={180}
                    style={{
                      borderRadius: '8px 8px 0px 0px',
                      width: '300px',
                      height: '180px',
                      cursor: 'pointer',
                    }}
                    handleDuplicatedOpen={handleDuplicatedOpen}
                    type={info?.type ?? 1}
                    idCode={info?.idCode || info?.goodsID || ''}
                  />
                  <TypeStyle
                    style={{
                      backgroundColor:
                        info?.type === 1
                          ? colors.kmBlue
                          : info?.type === 2
                            ? colors.gmBlue
                            : info?.type === 3
                              ? colors.ggPurple
                              : colors.kwGreen,
                    }}
                  >
                    <Text css={TextStyle}>
                      {clickedItem?.types[index] === 1
                        ? '경매'
                        : clickedItem?.types[index] === 2
                          ? '캠코'
                          : clickedItem?.types[index] === 3
                            ? '기관'
                            : '예정'}
                    </Text>
                  </TypeStyle>
                  {clickedInfo && clickedInfo.length > 1 && !isOnlySelected && (
                    <PageCount>
                      <Text css={PageCountTextStyle}>
                        {index + 1}/{clickedInfo.length}
                      </Text>
                    </PageCount>
                  )}
                  {clickedInfo && clickedInfo[index]?.share === 'Y' && (
                    <ShareType>
                      <Text css={TextStyle}>지분</Text>
                    </ShareType>
                  )}
                  {clickedInfo &&
                    (clickedInfo[index]?.winAmt as number) > 0 && (
                      <WinType
                        shareYn={
                          clickedInfo && clickedInfo[index]?.share === 'Y'
                            ? true
                            : false
                        }
                        style={{
                          backgroundColor: colors.winOrange,
                        }}
                      >
                        <Text css={TextStyle}>낙찰</Text>
                      </WinType>
                    )}
                  <Flex
                    style={{
                      position: 'absolute',
                      top: 14,
                      right: 14,
                      zIndex: 1000,
                    }}
                    onClick={() => {
                      if (openModal) {
                        close()
                      } else {
                        open({
                          type:
                            (clickedInfo &&
                              clickedInfo[index]?.type?.toString()) ||
                            '1',
                          id:
                            clickedInfo && clickedInfo[index]?.type === 1
                              ? (clickedInfo[index]?.id as string)
                              : clickedInfo[index]?.type === 2 || 3
                                ? (clickedInfo[index]?.goodsID as string)
                                : (clickedInfo[index]?.id as string),
                          onButtonClick: () => {
                            onButtonClick()
                          },
                        })
                      }
                    }}
                  >
                    <Interest
                      interest={
                        (clickedInfo && clickedInfo[index]?.interest) || ''
                      }
                    />
                  </Flex>
                  <BottomBox>
                    <Text css={BottomTextStyle}>
                      {clickedItem?.types[index] === 1
                        ? clickedInfo && clickedInfo[index]?.caseNo
                        : clickedItem?.types[index] === 2 || 3
                          ? clickedInfo && clickedInfo[index]?.manageNo
                          : ''}
                    </Text>
                  </BottomBox>
                </div>
              ) : (
                <>
                  <TypeStyle
                    style={{
                      backgroundColor: colors.kwGreen,
                    }}
                  >
                    <Text css={TextStyle}>예정</Text>
                  </TypeStyle>
                  {clickedInfo && clickedInfo.length > 1 && !isOnlySelected && (
                    <PageCount>
                      <Text css={PageCountTextStyle}>
                        {nowIndex + 1}/{clickedInfo.length}
                      </Text>
                    </PageCount>
                  )}
                  <BottomBox
                    style={{
                      flexDirection: 'row',
                      zIndex: 1,
                    }}
                  >
                    <Text css={BottomTextStyle}>
                      {clickedInfo && clickedInfo[index]?.caseNo}
                    </Text>
                  </BottomBox>
                </>
              )}
            </SwiperSlide>
          ))}
        {clickedInfo && clickedInfo.length > 1 && !isOnlySelected ? (
          <>
            <NextBtn />
            <PrevBtn />
          </>
        ) : null}
      </Swiper>
      {clickedInfo && clickedInfo[nowIndex]?.type === 4 ? (
        <Flex
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            zIndex: 1000,
          }}
          onClick={() => {
            if (openModal) {
              close()
            } else {
              open({
                type:
                  clickedInfo &&
                  (clickedInfo[nowIndex]?.type?.toString() as string),
                id: clickedInfo && (clickedInfo[nowIndex]?.id as string),
                onButtonClick: () => {
                  onButtonClick()
                },
              })
            }
          }}
        >
          <Interest
            interest={(clickedInfo && clickedInfo[nowIndex]?.interest) || ''}
          />
        </Flex>
      ) : null}
    </div>
  )
}

const BottomBox = styled.div`
  width: 298px;
  height: 28px;
  border: 0px solid #fff;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  bottom: 0;
  padding: 5px 0px 0px 0px;
`

const BottomTextStyle = css`
  color: #fff;
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: -0.14px;
  margin-left: 10px;
`

const TextStyle = css`
  color: #fff;
  font-family: SUIT;
  font-size: 13px;
  font-style: normal;
  font-weight: 800;
  line-height: 140%;
  letter-spacing: -0.13px;
  text-align: center;
`

const TypeStyle = styled.div<{ type?: boolean; num?: number }>`
  display: flex;
  width: 39px;
  height: 22px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  position: absolute;
  border: 0.5px solid #fff;
  top: 13px;
  left: 14px;
  z-index: 1;
  background-color: ${({ type, num }) =>
    type
      ? `${colors.kwGreen}`
      : num === 1
        ? `${colors.kmBlue}`
        : num === 2
          ? `${colors.gmBlue}`
          : num === 3
            ? `${colors.ggPurple}`
            : `${colors.kwGreen}`};
`
const ShareType = styled.div`
  display: flex;
  width: 39px;
  height: 22px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 0.5px solid #fff;
  background: #f00;
  position: absolute;
  top: 13px;
  left: 60px;
`

const WinType = styled.div<{ shareYn: boolean }>`
  display: flex;
  width: 39px;
  padding: 2px 6px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 0.5px solid #fff;
  background: #f00;
  position: absolute;
  top: 13px;
  left: ${({ shareYn }) => (shareYn ? '106px' : '60px')};
`

const PageCount = styled.div`
  width: 39px;
  height: 22px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 0.5px solid #fff;
  background: rgba(0, 0, 0, 0.45);
  position: absolute;
  top: 40px;
  left: 14px;
  justify-content: center;
  align-items: center;
  display: flex;
`

const PageCountTextStyle = css`
  color: #fff;
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: -0.12px;
`
