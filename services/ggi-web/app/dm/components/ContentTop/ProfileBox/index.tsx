import * as S from './style'
import * as B from 'app/dm/components/styles/Boxes'
import * as T from 'app/dm/components/styles/Typography'
import { theme } from '../../styles/theme'
import Image from 'next/image'

export default function ProfileBox() {
  return (
    <S.UsersContainer>
      <B.FlexSpaceBetweenAlignCenter>
        <T.TextSuitBold18px>
          userId님
        </T.TextSuitBold18px>
        <T.InfoSuitText 
          color={theme.palette.grayMain}
        >
          user membership
        </T.InfoSuitText>
      </B.FlexSpaceBetweenAlignCenter>
      <S.DownloadContainer>
        <B.FlexNowrap>
          <T.InfoGothicBoldText 
            color={theme.palette.grayMain}
          >
            잔여 다운로드
          </T.InfoGothicBoldText>
          <Image 
            src='/dm/images/help.png'
            alt='help' 
            width={16} 
            height={16}
          />
        </B.FlexNowrap>
        <B.FlexSpaceBetweenAlignCenter>
          <B.FlexNowrap>
            <T.InfoGothicBoldText 
              color={theme.palette.blueMain}
            >
              일 00개&nbsp;
            </T.InfoGothicBoldText>
            <T.InfoGothicBoldText 
              color={theme.palette.grayMain}
            >
              / 월 00개
            </T.InfoGothicBoldText>
          </B.FlexNowrap>
          <S.AddBtn>
            추가하기
          </S.AddBtn>
        </B.FlexSpaceBetweenAlignCenter>
      </S.DownloadContainer>
    </S.UsersContainer>
  )
}