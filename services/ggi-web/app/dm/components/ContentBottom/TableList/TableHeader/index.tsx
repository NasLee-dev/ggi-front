import * as I from "@/models/dm/DM";
import * as BT from "app/dm/components/styles/Button";
import * as T from "app/dm/components/styles/Typography";
import * as S from "./style";
import { theme } from "app/dm/components/styles/theme";
import { useTabStore } from "@/store/dm/useTabStore";
import Image from "next/image"
import { FlexCenter } from "app/dm/components/styles/Boxes";

export default function TableHeader({ headers }: I.ITableListProps) {
  const { tabs } = useTabStore()
  return (
    <thead style={{ height: '50px' }}>
      <tr>
        {Object.keys(headers).map((key, idx) => (
          <S.StyledTH 
            key={key} 
            idx={idx}
            length={Object.keys(headers).length}
            mine={tabs.mine}
            width={headers[key].width}
          >
            {idx === 0 
              ? <BT.CheckBox type="checkbox" id='chk' />
              : <FlexCenter>
                  <T.InfoGothicBoldText 
                    color={ idx < 7 ? theme.palette.grayMain : theme.palette.black }
                  >
                    {headers[key].name}
                  </T.InfoGothicBoldText>
                  {key === 'idx'
                    ? null
                    : <BT.IconBtn>
                        <Image 
                          src='/dm/images/up_down.png' 
                          alt='upDown' 
                          width={16} 
                          height={16} 
                        />
                      </BT.IconBtn>}
                  {key === 'reDownload' 
                    ? <div id="tooltip-portal" /> 
                    : null
                  }
                </FlexCenter>
            }
          </S.StyledTH>
        ))}
      </tr>
    </thead>
  )
}