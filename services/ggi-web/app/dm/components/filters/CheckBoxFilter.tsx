import { useState } from "react";
import * as B from "../styles/Boxes";
import * as T from "../styles/Typography";
import { CheckBox } from "../styles/Button";
import { theme } from "../styles/theme";
interface ICheckboxProp {
  type: string
  checked: boolean
  content: string
  setChecked: (chk: boolean, content?: string) => void
}

export default function CheckBoxFilter ({
  type,
  checked,
  content,
  setChecked
}: ICheckboxProp) {
  const [chk, setChk] = useState<boolean>(checked)
  const handleChange = (content?: string) => () => {
    setChk(!chk)
    if (!setChecked) return
    setChecked(!chk, content)
  }

  return (
    <>
      {type === 'modal' ? (
        <B.FlexSpaceBetween>
          <label htmlFor="chk">
            <T.InfoGothicText>
              {content}
            </T.InfoGothicText>
          </label>
          <CheckBox type="checkbox" id='chk' value={Number(chk)} onChange={handleChange(content)} checked={chk} />
        </B.FlexSpaceBetween>
      ) : (
        <B.FlexNowrap>
          <CheckBox type="checkbox" id='chk' value={Number(chk)} onChange={handleChange(undefined)} checked={chk} />
          <label htmlFor="chk">
            <T.InfoGothicText color={theme.palette.grayMain} style={{ marginLeft: '5px' }}>
              {content}
            </T.InfoGothicText>
          </label>
        </B.FlexNowrap>
      )}
    </>
  )
}