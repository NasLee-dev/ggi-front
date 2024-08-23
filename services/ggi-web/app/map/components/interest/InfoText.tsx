import { css } from '@emotion/react'
import Flex from '../shared/Flex'
import Text from '../shared/Text'

export default function InfoTextPage() {
  return (
    <Flex css={Container}>
      <Flex
        direction="row"
        style={{
          marginLeft: '10px',
        }}
      >
        <div
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            backgroundColor: '#000',
            marginTop: '7px',
            marginRight: '10px',
          }}
        />
        <Text css={InfoText}>이미 관심물건으로 등록된 사건입니다.</Text>
      </Flex>
      <Flex
        direction="row"
        style={{
          marginLeft: '10px',
        }}
      >
        <div
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            backgroundColor: '#000',
            marginTop: '7px',
            marginRight: '10px',
          }}
        />
        <Text css={InfoText}>아래 창에서 기존 설정을 수정 등록하거나,</Text>
        &nbsp;
        <Text
          css={InfoText}
          style={{
            color: '#F00',
          }}
        >
          [삭제]
        </Text>
        &nbsp;
        <Text css={InfoText}>버튼을 눌러 관심물건에서 해제할 수 있습니다.</Text>
      </Flex>
    </Flex>
  )
}

const Container = css`
  width: 700px;
  flex-direction: column;
  position: relative;
  justify-content: start;
`

const InfoText = css`
  color: #000001;
  font-family: SUIT;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 135%;
  letter-spacing: -0.34px;
`
