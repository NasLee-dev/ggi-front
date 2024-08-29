import FilterHeader from "../FilterHeader";
import * as I from "@/models/dm/DM";
import CaseFilterBox from "./CaseFilterBox";

export default function CaseSearchBox({ open, setOpen }: I.ISearchProps) { 
  return (
    <>
      <FilterHeader 
        open={open} 
        setOpen={setOpen} 
        title='사건검색'
      />
      <CaseFilterBox 
        open={open}
        setOpen={setOpen}      
      />
    </>
  )
}