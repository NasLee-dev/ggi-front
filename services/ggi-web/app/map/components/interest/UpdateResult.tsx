import Image from 'next/image'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import TopLine from './TopLine'
import styled from '@emotion/styled'
import Text from '../shared/Text'
import { css } from '@emotion/react'
import { useRecoilValue } from 'recoil'
import { authInfo } from '@/store/atom/auth'
import { InterestFormData, UpdatedInterest } from '@/models/map/Interest'
import TitlePage from './TitlePage'
import TableFrame from './TableFramge'
import useHandleSelectedData from './hooks/useHandleSelectedData'

interface UpdateResultProps {
  onButtonClick: () => void
  updatedData: UpdatedInterest
  처음등록하는가: boolean
  formData: InterestFormData
  type: string
}

export default function UpdateResult({
  onButtonClick,
  updatedData,
  처음등록하는가,
  formData,
  type,
}: UpdateResultProps) {
  const { handleSelectedData } = useHandleSelectedData()
  const auth = useRecoilValue(authInfo)

  return (
    <>
      <Flex justify="space-between">
        <TitlePage
          title={
            처음등록하는가
              ? '관심물건이 등록되었습니다'
              : '관심물건이 수정되었습니다'
          }
        />
        <Image
          src={
            'https://cdn3.iconfinder.com/data/icons/user-interface-169/32/cross-512.png'
          }
          alt="close"
          width={30}
          height={30}
          onClick={() => {
            onButtonClick && onButtonClick()
            handleSelectedData()
          }}
          style={{
            cursor: 'pointer',
          }}
        />
      </Flex>
      <Spacing size={10} />
      <TopLine />
      <TableFrame
        title={updatedData?.caseNo !== undefined ? '사건번호' : '관리번호'}
        contents={
          updatedData?.caseNo !== undefined
            ? updatedData?.caseNo?.slice(0, 4) +
              '-' +
              updatedData?.caseNo?.slice(5, updatedData?.caseNo?.length)
            : updatedData?.manageNo
        }
        starRating={
          formData.interestInfo.starRating !== ''
            ? parseInt(updatedData?.interestInfo?.starRating)
            : null
        }
      />
      <TableFrame
        title="소재지"
        contents={updatedData?.address}
        background="#F9F9F9"
      />
      <TableFrame
        title="등록그룹"
        contents={updatedData?.interestInfo?.category}
        background="#F9F9F9"
      />
      <Spacing size={20} />
      <Flex
        style={{
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center',
          flexDirection: 'row',
          gap: '5px',
        }}
      >
        <CloseButtonStyle
          onClick={() => {
            onButtonClick && onButtonClick()
            auth.id === '' ? null : handleSelectedData()
          }}
        >
          <Text css={TextStyle}>닫기</Text>
        </CloseButtonStyle>
      </Flex>
    </>
  )
}

const CloseButtonStyle = styled.button`
  display: flex;
  width: 90px;
  height: 50px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #6d6e70;
  background: #fff;
  cursor: pointer;
`
const TextStyle = css`
  color: #6d6e70;
  font-family: SUIT;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 135%;
  letter-spacing: -0.36px;
`
