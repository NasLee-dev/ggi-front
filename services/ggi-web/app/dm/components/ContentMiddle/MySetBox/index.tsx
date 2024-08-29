import FilterHeader from "../FilterHeader";
import * as I from "@/models/dm/DM";
import MySetFilters from "./MySetFilters";

export default function MySetBox({ open, setOpen }: I.ISearchProps) {
  return (
    <>
      <FilterHeader 
        open={open} 
        setOpen={setOpen} 
        title='나의설정'
      />
      <MySetFilters 
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}