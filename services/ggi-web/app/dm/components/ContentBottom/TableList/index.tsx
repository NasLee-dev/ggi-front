import * as I from "@/models/dm/DM";
import * as S from "./style";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

export default function TableList({ headers }: I.ITableListProps) {
  return (
    <S.Table>
      <TableHeader 
        headers={headers}
      />
      <TableBody 
        headers={headers}
      />
    </S.Table>
  )
}