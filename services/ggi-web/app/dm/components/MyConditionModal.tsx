import { CloseIcon } from "@chakra-ui/icons";
import { FlexSpaceBetween, InputBox, ModalBox, ModalContainer, ModalContentBox } from "./styles/Boxes";
import { TextGothic15px, TextSuit20px } from "./styles/Typography";

interface IModalProps {
  title: string,
  subTitle: string,
  contents?: Array<any>
}

export default function MyConditionModal({
  title,
  subTitle,
  contents
}: IModalProps) {
  
  return (
    <ModalContainer>
      <div style={{ display: 'flex', flexDirection: 'row-reverse'}}>
        <CloseIcon width={'16px'} height={'16px'}/>
      </div>
      <ModalBox>
        <TextSuit20px>{title}{`(n/10)`}</TextSuit20px>
        <TextGothic15px>{subTitle}</TextGothic15px>

        {contents ? contents.map((content, idx) => (
          <ModalContentBox key={idx}>

          </ModalContentBox>
        )) : (
          <ModalContentBox>
            <FlexSpaceBetween>
              {/* input components */}
              <InputBox />
            </FlexSpaceBetween>
          </ModalContentBox>
        )}
      </ModalBox>
    </ModalContainer>
  )
}