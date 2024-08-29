import { useEffect, useState } from "react";
import { theme } from "../../styles/theme";
import { InfoGothicText } from "../../styles/Typography";
import { MyDmBox } from "./style";

interface StyledDmProps {
  type: string,
  content: string
}

export default function MyDmBadge({
  type,
  content
}: StyledDmProps) {
  const [bgColor, setBgColor] = useState<string>('')

  useEffect(() => {
    const newBgColor = type === 'date' ? theme.palette.date
      : type === 'local' ? theme.palette.local
      : type === 'usage' ? theme.palette.usage
      : type === 'specific' ? theme.palette.specific
      : type === 'price' ? theme.palette.price
      : type === 'status' ? theme.palette.status
      : type === 'sendTo' ? theme.palette.sendTo
      : type === 'mine' ? theme.palette.mine
      : theme.palette.white
    setBgColor(newBgColor)
  }, [type])

  return (
    <MyDmBox bgColor={bgColor}>
      <InfoGothicText color={type==='mine' ? theme.palette.blueMain : undefined}>
        {type==='mine' ? '★' : ''}{content}
      </InfoGothicText>
    </MyDmBox>
  )
}