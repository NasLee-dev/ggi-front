import * as S from './style'
import * as T from 'app/dm/components/styles/Typography'

export default function DMInfo() {
  return (
    <S.TitleContainer>
      <T.TitleText>
        이지DM
      </T.TitleText>
      <T.InfoGothicText>
        경매 현장에서 법률상담, 소송대리, 입찰대리, 경매상담, 중개서비스, 대출서비스, 채권매각을 기다리는 수요자에게 DM을 보내보세요. 
        소유자/채무자/채권자/입주자 등 경매사건 이해관계인의 DM 발송용 정보를 한번에 다운로드 할 수 있습니다. 
        가장 빠르고 정확한 지지옥션 경매정보. 업무에 활용할 수 있는 기회를 놓치지 마세요.
        <button>
          <T.HelpGothicText>
            이용방법 알아보기
          </T.HelpGothicText>
        </button>
      </T.InfoGothicText>
    </S.TitleContainer>
  )
}