import * as I from "@/models/dm/DM";
import * as S from "./style";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

export default function TableList({ headers, values }: I.ITableListProps) {
  return (
    <S.Table>
      <TableHeader 
        headers={headers}
        values={[]}      
      />
      <TableBody 
        headers={headers}
        values={values}         
      />
    </S.Table>
  )
}