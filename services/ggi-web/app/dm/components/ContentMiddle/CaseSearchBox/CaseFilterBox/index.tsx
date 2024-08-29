import { useState } from "react";
import * as I from "@/models/dm/DM";
import * as B from "app/dm/components/styles/Boxes";
import CaseButtonBox from "../CaseButtonBox";
import CaseFilters from "../CaseFilters";
import CaseDetails from "../CaseDetails";
import { useTabStore } from "@/store/dm/useTabStore";

export default function CaseFilterBox({ open, setOpen }: I.ISearchProps) {
  const { tabs } = useTabStore()
  const [openDetail, setOpenDetail] = useState<boolean>(true)
  return (
    open 
    ? <B.FilterContainer>
        <CaseButtonBox 
          open={openDetail}
          setOpen={setOpenDetail}
        />
        <CaseFilters />
        {tabs.ongoing 
        ? <CaseDetails 
            open={openDetail}
            setOpen={setOpenDetail}
          />
        : null}
      </B.FilterContainer>
    : null
  )
}