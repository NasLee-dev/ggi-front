import * as I from "@/models/dm/DM";
import * as S from "./style";
import { useTabStore } from "@/store/dm/useTabStore";

export default function TabBox() {
  const { tabs, setTabs } = useTabStore()
  
  const handleClickTabs = (prop: keyof I.ITabStatus) => () => {
    if (!setTabs) return
    const newTabs = {...tabs}
    for (const key in newTabs) {
      const k: keyof I.ITabStatus = key as keyof I.ITabStatus
      newTabs[k] = false
    }
    newTabs[prop] = true
    setTabs(newTabs)
  }
  return (
    <S.Container>
      <S.TabBtn 
        status={tabs.expected} 
        onClick={handleClickTabs('expected')}
      >
        예정 물건
      </S.TabBtn>
      <S.TabBtn 
        status={tabs.ongoing} 
        onClick={handleClickTabs('ongoing')}
      >
        진행 물건
      </S.TabBtn>
      <S.TabBtn 
        status={tabs.mine} 
        onClick={handleClickTabs('mine')}
      >
        나의DM
      </S.TabBtn>
    </S.Container>
  )
}
