import MyDmBadge from "../../styled/MyDmBadge";
import { Flex } from "../../styles/Boxes";
import { TextGothic15px, TextSuitBold20px } from "../../styles/Typography";
import { IConditionStatusProps } from "@/models/dm/Modal";
import * as S from "./style";

export default function DetailMyCondition ({
  title,
  subTitle,
  contents
}: IConditionStatusProps) {

  return (
    <S.ModalBox>
      <TextSuitBold20px 
        style={{ 
          marginBottom: '10px' 
        }}
      >
        {title}
      </TextSuitBold20px>
      <TextGothic15px>
        {subTitle}
      </TextGothic15px>
      <S.ModalContentBox>
        <Flex 
          style={{ 
            flexWrap: 'wrap' 
          }}
        >
          {contents && Object.keys(contents)?.map((key: any) => (
            <MyDmBadge 
              key={key} 
              type={key} 
              content={contents[key]} 
            />
          ))}
        </Flex>
      </S.ModalContentBox>
    </S.ModalBox>
  )
}