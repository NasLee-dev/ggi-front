'use client'

import { FlexBetween, FlexColumn } from 'styles/sharedStyle'
import * as S from './style'
import DefaultButton from '@/components/commons/buttons/DefaultButton'
import Image from 'next/image'

export default function ProfileBox() {
  return (
    <S.Box>
      <FlexBetween mb={8}>
        <S.ProfileName>best님</S.ProfileName>
        <DefaultButton
          width="138px"
          height="30px"
          fontSize="16px"
          text="사이버머니 충전"
          onClick={() => {}}
        />
      </FlexBetween>
      <FlexColumn gap={12}>
        <S.CashBox>
          <S.CashTitleBox>
            <span>나의 사이버머니</span>
            <Image
              width={16}
              height={16}
              src="/images/question-mark.svg"
              alt=""
            />
          </S.CashTitleBox>
          <S.CashValue>16,200원</S.CashValue>
        </S.CashBox>
        <S.CashBox>
          <S.CashTitleBox>
            <span>일일무료열람</span>
            <Image
              width={16}
              height={16}
              src="/images/question-mark.svg"
              alt=""
            />
          </S.CashTitleBox>
          <S.CashValue>
            <span>0건</span>/3건
          </S.CashValue>
        </S.CashBox>
      </FlexColumn>
    </S.Box>
  )
}
