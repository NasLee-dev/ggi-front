import * as I from "@/models/dm/DM";
import * as BT from "app/dm/components/styles/Button";
import * as T from "app/dm/components/styles/Typography";
import * as S from "./style";
import { theme } from "app/dm/components/styles/theme";
import { useTabStore } from "@/store/dm/useTabStore";

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
              : <>
                  <T.InfoGothicBoldText 
                    color={ idx < 7 ? theme.palette.grayMain : theme.palette.black }
                  >
                    {headers[key].name}
                  </T.InfoGothicBoldText>
                  {key === 'reDownload' 
                    ? <div id="tooltip-portal" /> 
                    : null
                  }
                </>
            }
          </S.StyledTH>
        ))}
      </tr>
    </thead>
  )
}