import CaseSearch from "./CaseSearchBox";
import { useState } from "react";
import MySetBox from "./MySetBox";
import ButtonBox from "./ButtonBox";
export default function ContentMiddle() {
  const [openCase, setOpenCase] = useState<boolean>(true)
  const [openMySet, setOpenMySet] = useState<boolean>(true)
  return (
    <>
      <CaseSearch  
        open={openCase}
        setOpen={setOpenCase} 
      />
      <MySetBox 
        open={openMySet} 
        setOpen={setOpenMySet}      
      />
      <ButtonBox />
    </>
  )
}