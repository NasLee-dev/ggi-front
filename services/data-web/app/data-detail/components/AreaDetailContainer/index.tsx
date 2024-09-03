import DownloadBtn from '@/app/data-detail/components/AreaDetailContainer/components/DownloadBtn'
import ContentBox from '@/app/shared/components/box/ContentBox'
import TableContainer from '@/app/shared/components/table/TableContainer'
import TableHead from '@/app/shared/components/table/TableHead'
import TableItem from '@/app/shared/components/table/TableItem'
import PickText from '@/app/shared/components/text/PickText'
import SubTitle from '@/app/shared/components/text/SubTitle'

export default function AreaDetailContainer() {
  return (
    <div className="w-full mb-10">
      <ContentBox>
        <div className="w-full flex justify-between items-center mb-8">
          <div>
            <SubTitle title="지역별 경매통계 상세" />
            <div className="mt-3">
              <PickText text="서울특별시" />
            </div>
          </div>
          <DownloadBtn />
        </div>
        <TableContainer>
          <ul className="flex border-b border-[#E5E7EB]">
            <TableHead width="120px" text="시도" />
            <TableHead width="120px" text="시군구" />
            <TableHead width="88px" text="읍면동" />
            <TableHead width="160px" text="용도" />
            <TableHead width="88px" text="매각율" />
            <TableHead width="88px" text="매각가율" />
            <TableHead width="88px" text="미진행율" />
            <TableHead
              width="88px"
              text={
                <span>
                  평균
                  <br />
                  응찰자 수
                </span>
              }
            />
            <TableHead width="88px" text="진행건수" />
            <TableHead width="88px" text="매각건수" />
            <TableHead width="88px" text="유찰건수" />
            <TableHead width="88px" text="변경건수" />
            <TableHead width="88px" text="취하건수" />
            <TableHead width="180px" text="감정가총액" />
            <TableHead width="180px" text="매각가총액" />
          </ul>
          <ul className="flex border-b border-[#E5E7EB] last:border-none">
            <TableItem width="120px" text="서울특별시" />
            <TableItem width="120px" text="서대문구" />
            <TableItem width="88px" text="전체" />
            <TableItem width="160px" text="아파트" />
            <TableItem width="88px" text="45.65" />
            <TableItem width="88px" text="65.45" />
            <TableItem width="88px" text="15.54" />
            <TableItem width="88px" text="5.3" />
            <TableItem width="88px" text="65" />
            <TableItem width="88px" text="35" />
            <TableItem width="88px" text="25" />
            <TableItem width="88px" text="2" />
            <TableItem width="88px" text="8" />
            <TableItem width="180px" text="12,110,000,000" />
            <TableItem width="180px" text="12,110,000,000" />
          </ul>
        </TableContainer>
      </ContentBox>
    </div>
  )
}
