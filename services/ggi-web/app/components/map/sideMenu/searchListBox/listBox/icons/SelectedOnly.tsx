import Flex from 'app/components/shared/Flex'
import Text from 'app/components/shared/Text'
import { isOnlySelectedAtom } from '@/store/atom/map'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useRecoilState } from 'recoil'

export default function SelectedOnly() {
  const [isOnlySelected, setIsOnlySelected] = useRecoilState(isOnlySelectedAtom)
  return (
    <>
      {!isOnlySelected ? (
        <ContainerStyle
          onClick={() => {
            setIsOnlySelected((prev) => !prev)
          }}
        >
          <Flex direction="row">
            <Flex
              style={{
                width: '15px',
                height: '10px',
                marginTop: '2px',
                marginRight: '2px',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="10"
                viewBox="0 0 13 10"
                fill="none"
              >
                <path
                  d="M0 4.75071C0 4.75071 2.36364 0.0234375 6.5 0.0234375C10.6364 0.0234375 13 4.75071 13 4.75071"
                  fill="#2ACB42"
                />
                <path
                  d="M0 4.75391C0 4.75391 2.36364 9.48118 6.5 9.48118C10.6364 9.48118 13 4.75391 13 4.75391"
                  fill="#2ACB42"
                />
                <path
                  d="M6.5032 6.52592C7.48225 6.52592 8.27592 5.73225 8.27592 4.7532C8.27592 3.77415 7.48225 2.98047 6.5032 2.98047C5.52415 2.98047 4.73047 3.77415 4.73047 4.7532C4.73047 5.73225 5.52415 6.52592 6.5032 6.52592Z"
                  fill="white"
                />
              </svg>
            </Flex>
            <Text css={TextStyle}>본건만</Text>
          </Flex>
        </ContainerStyle>
      ) : (
        <ContainerStyle
          style={{
            background: '#2ACB42',
          }}
          onClick={() => {
            setIsOnlySelected((prev) => !prev)
          }}
        >
          <Flex direction="row">
            <Flex
              style={{
                width: '15px',
                height: '10px',
                marginTop: '2px',
                marginRight: '2px',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="10"
                viewBox="0 0 13 10"
                fill="none"
              >
                <path
                  d="M0 4.75071C0 4.75071 2.36364 0.0234375 6.5 0.0234375C10.6364 0.0234375 13 4.75071 13 4.75071"
                  fill="white"
                />
                <path
                  d="M0 4.75391C0 4.75391 2.36364 9.48118 6.5 9.48118C10.6364 9.48118 13 4.75391 13 4.75391"
                  fill="white"
                />
                <path
                  d="M6.5032 6.52592C7.48225 6.52592 8.27592 5.73225 8.27592 4.7532C8.27592 3.77415 7.48225 2.98047 6.5032 2.98047C5.52415 2.98047 4.73047 3.77415 4.73047 4.7532C4.73047 5.73225 5.52415 6.52592 6.5032 6.52592Z"
                  fill="#2ACB42"
                />
              </svg>
            </Flex>
            <Text
              css={css`
                ${TextStyle}
                color: white;
              `}
            >
              본건만
            </Text>
          </Flex>
        </ContainerStyle>
      )}
    </>
  )
}

const ContainerStyle = styled.div`
  display: flex;
  padding: 5.25px 6px;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  border-radius: 100px;
  background: #f4f4f4;
  cursor: pointer;
`
const TextStyle = css`
  color: #494949;
  font-family: SUIT;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 13px */
  letter-spacing: -0.26px;
`
