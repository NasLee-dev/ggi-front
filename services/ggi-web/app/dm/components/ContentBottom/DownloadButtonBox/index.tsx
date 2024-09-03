import * as B from "../../styles/Boxes";
import { theme } from "../../styles/theme";
import * as T from "../../styles/Typography";
import * as S from "./style";
import Selectbox from "../../styled/SelectBox";
import { useTabStore } from "@/store/dm/useTabStore";
import * as C from "constants/dm/dm";
import { useKMFilterStore } from "@/store/dm/useFilterStore";

export default function DownloadButtonBox() {
  const { tabs } = useTabStore()
  const { setPage } = useKMFilterStore()

  const handleSelectPageNum = (value: string, idx: number) => {
    const pageNum = value.replaceAll('개씩 보기', '')
    setPage(Number(pageNum))
  }

  return (
    <S.ButtonContainer>
      <Selectbox 
        options={C.PAGENUMS} 
        width='170px'
        setOption={handleSelectPageNum}
      />
      <div>
        <S.DownloadBtn 
          style={{ marginRight: '10px'}}
        >
          <B.FlexNowrap>
            <T.TextGothicBold18px 
              color={theme.palette.grayMain} 
              style={{ marginRight: '10px'}}
            >
              {tabs.mine ? '선택' : ''} 다운로드
            </T.TextGothicBold18px>
            <S.DownloadCount>
              <T.TextGothic14px 
                color={theme.palette.blueMain}
              >
                20
              </T.TextGothic14px>
            </S.DownloadCount>
          </B.FlexNowrap>
        </S.DownloadBtn>
        {tabs.mine 
          ? null 
          : <S.DownloadBtn>
              <B.FlexNowrap>
                <T.TextGothicBold18px color={theme.palette.grayMain} style={{ marginRight: '10px'}}>
                  전체 다운로드
                </T.TextGothicBold18px>
                <S.DownloadCount>
                  <T.TextGothic14px>
                    2000
                  </T.TextGothic14px>
                </S.DownloadCount>
              </B.FlexNowrap>
            </S.DownloadBtn>
        }
      </div>
    </S.ButtonContainer>
  )
}