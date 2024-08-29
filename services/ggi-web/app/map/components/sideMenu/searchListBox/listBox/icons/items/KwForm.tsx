'use client'
import Interest from 'app/map/components/icons/Interest'
import Flex from 'app/map/components/shared/Flex'
import ListRow from 'app/map/components/shared/ListRow'
import Spacing from 'app/map/components/shared/Spacing'
import Text from 'app/map/components/shared/Text'
import { MapItems } from '@/models/map/MapItem'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useInterestContext } from 'contexts/useModalContext'
import { Dispatch, SetStateAction } from 'react'
import useNum2Han from 'utils/map/useNum2Han'

function KwForm({
  item,
  index,
  openModal,
  setOpenModal,
  handleDuplicatedOpen,
  handleTitle,
}: {
  item: MapItems
  index: number
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  handleDuplicatedOpen: (idCode: string, type: number) => void
  handleTitle: (
    type: number,
  ) => '경매 ' | '캠코 ' | '기관매각 ' | '예정 ' | undefined | JSX.Element
}) {
  const { open } = useInterestContext()
  const onButtonClick = () => {
    setOpenModal(false)
  }
  return (
    <div>
      <Flex
        direction="column"
        css={ContainerStyle}
        style={{
          borderTop: `${index === 0 ? '' : '0.5px solid #e0e0e0 '}`,
          zIndex: 1000,
        }}
      >
        <ListRow
          left={
            <LeftTextStyle color={'#00926F'}>
              {handleTitle(item?.type ?? 4)}
            </LeftTextStyle>
          }
          contents={
            <LeftTextStyle
              color="#000"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {item?.caseNo}
            </LeftTextStyle>
          }
          right={
            <Flex
              style={{
                zIndex: 1000,
              }}
              onClick={() => {
                if (openModal) {
                  close()
                } else {
                  open({
                    type: item?.type.toString() ?? '',
                    id: item?.id ?? '',
                    onButtonClick: () => {
                      onButtonClick()
                    },
                  })
                }
              }}
            >
              <Interest interest={item?.interest ?? ''} />
            </Flex>
          }
          style={ListLeftStyle}
        />
        <Flex
          direction="column"
          style={{
            width: '90%',
            position: 'absolute',
            top: 60,
            cursor: 'pointer',
            zIndex: 1,
          }}
          onClick={() => {
            handleDuplicatedOpen(item?.idCode ?? '', item?.type ?? 4)
          }}
        >
          <Text css={TextStyle}>청구액</Text>
          <Text css={ClaimStyle}>{`${useNum2Han(
            item?.claim,
            item?.winAmt ?? 0,
          )}`}</Text>
          <Spacing size={10} />
          <Flex
            direction="row"
            justify="start"
            align="center"
            style={{
              display: 'flex',
              gap: '10px',
            }}
          >
            <Text css={TextStyle}>현재상태</Text>
            <Text
              css={ClaimStyle}
              style={{
                fontSize: '14px',
              }}
            >{`대기`}</Text>
          </Flex>
          <Flex
            direction="row"
            justify="start"
            align="center"
            style={{
              display: 'flex',
              gap: '5px',
            }}
          >
            <Text css={TextStyle}>경매개시일</Text>
            <Text
              css={ClaimStyle}
              style={{
                fontSize: '14px',
              }}
            >
              {item?.startDate}
            </Text>
            <Spacing direction="horizontal" size={5} />
            <Text css={TextStyle}>배당종기일</Text>
            <Text
              css={ClaimStyle}
              style={{
                fontSize: '14px',
              }}
            >
              {item?.dividendDate}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </div>
  )
}

const ContainerStyle = css`
  display: flex;
  position: relative;
  background: #fff;
  gap: 10px;
  padding: 10px 0 10px 0;
  width: 350px;
  height: 165px;
  flex-shrink: 0;
  left: 10px;
  &:hover {
    background: #f0f7ff;
    opacity: 0.5;
  }
`

const TextStyle = css`
  color: #676767;
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 145%;
  letter-spacing: -0.24px;
`

const ListLeftStyle = css`
  width: 95%;
  flex: 1;
`
const LeftTextStyle = styled.span<{ color: string }>`
  color: ${({ color }) => color};
  font-family: SUIT;
  font-size: 16.5px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.165px;
  height: 30px;
`

const ClaimStyle = css`
  color: #000;
  font-family: SUIT;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 145%;
  letter-spacing: -0.34px;
`

export default KwForm
