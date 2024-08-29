import { theme } from "../../styles/theme";
import { InfoGothicBoldText } from "../../styles/Typography";
import * as I from "@/models/dm/Modal";
import CheckBoxFilter from "../../filters/CheckBoxFilter";
import * as S from "./style";
import { useTabStore } from "@/store/dm/useTabStore";
import { useFilterStore } from "@/store/dm/useFilterStore";
import * as C from "constants/dm/dm";

export default function ExtraModal ({
  type,
  values,
  setValues,
  setOpenModal,
  clickSave,
  extra
}: I.IExtraModalProps) {
  const { tabs } = useTabStore()
  const { filters, setFilters } = useFilterStore()

  const handleChecked = (idx: number) => (checked: boolean, name?: string) => {
    const newValues = [...values]
    newValues[idx].status = !values[idx].status
    setValues(newValues)

    const newFilters = {...filters}
    const clickedValue = type === 'usageIds'
      ? C.USAGECODE[name]
      : type === 'checkIds'
          ? C.SPECIFICCODE[name]
          : 0
    newFilters[type].push(clickedValue)
    setFilters(newFilters)
  }

  const handleClickReset = () => {
    const newValues = [...values]
    newValues.forEach(v => v.status = false)
    console.log(newValues)
    setValues(newValues)

    const newFilters = {...filters}
    newFilters[type] = []
    setFilters(newFilters)
  } 

  const handleClickSave = () => {
    clickSave()
    setOpenModal(false)
  }

  return (
    <S.ModalContainer 
      type={type} 
      tabs={tabs}
    >
      <S.ModalContentGrid styles={type === 'usageIds' 
        ? theme.styles.modal.extra.usageContent 
        : theme.styles.modal.extra.specificContent}
      >
        {values?.length && values.slice(extra).map((content, idx) => (
          <CheckBoxFilter 
            key={content.name}
            type="modal"
            checked={content.status} 
            content={content.name}
            setChecked={handleChecked(idx+extra)}
          />
        ))}
      </S.ModalContentGrid>
      <S.ButtonBox>
        <div>
          <S.ExtraModalBtn save={false}>
            <InfoGothicBoldText onClick={handleClickReset}>
              초기화
            </InfoGothicBoldText>
          </S.ExtraModalBtn>
        </div>
        <div>
          <S.ExtraModalBtn 
            save={false} 
            style={{ marginRight: '10px' }} 
            onClick={() => setOpenModal(false)}
          >
            <InfoGothicBoldText>
              취소
            </InfoGothicBoldText>
          </S.ExtraModalBtn>
          <S.ExtraModalBtn save={true}>
            <InfoGothicBoldText 
              color={theme.palette.white} 
              onClick={handleClickSave}
            >
              적용하기
            </InfoGothicBoldText>
          </S.ExtraModalBtn>
        </div>
      </S.ButtonBox>
    </S.ModalContainer>
  )
}
