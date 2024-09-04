import XLSX from 'xlsx-js-style'
import { Header } from '../models/Table';
import { Dummy } from '../models/Dummy';

interface ExcelDownloadProps {
  data: Dummy[]
  fileName: string
  header: Header
  condition: {
    location: string
    period: string
    usage: string
  }
}

export const excelDownload = ({
  data,
  fileName,
  header,
  condition
}: ExcelDownloadProps) => {
  try {
    const xl = XLSX.utils.book_new()
    const searchStyle = {
      font: { color: { rgb: '000000' }, name: '맑은고딕', sz: 11 },
      fill: { fgColor: { rgb: 'FFFFFF' } },
      alignment: { horizontal: 'left', vertical: 'center' },
      border: { 
        top: { style: 'thin', color: { rgb: 'D3D3D3' } }, // 옅은 회색
        bottom: { style: 'thin', color: { rgb: 'D3D3D3' } }, 
        left: { style: 'thin', color: { rgb: 'D3D3D3' } }, 
        right: { style: 'thin', color: { rgb: 'D3D3D3' } } 
      }
    };
    const headerStyle = { 
      font: { bold: true, color: { rgb: '000000' }, name: '맑은고딕', sz: 11 }, 
      fill: { fgColor: { rgb: 'FFFFFF' } }, 
      alignment: { horizontal: 'center', vertical: 'center' }, 
      border: { left: { style: 'thin', color: { auto: 1 } }, right: { style: 'thin', color: { auto: 1 } }, top: { style: 'thin', color: { auto: 1 } }, bottom: { style: 'thin', color: { auto: 1 } } } 
    };
    const dataStyle = { 
      font: { color: { rgb: '000000' }, name: '맑은고딕', sz: 11 }, 
      fill: { fgColor: { rgb: 'FFFFFF' } }, 
      alignment: { horizontal: 'center', vertical: 'center' }, 
      border: { left: { style: 'thin', color: { auto: 1 } }, right: { style: 'thin', color: { auto: 1 } }, top: { style: 'thin', color: { auto: 1 } }, bottom: { style: 'thin', color: { auto: 1 } } } 
    };
    const colWidths = Array([data[0]].length).fill({ wpx: 120 })

    const searchCol = [
      { v: '', s: {} }, 
      {
        v: '■ 검색조건',
        s: searchStyle
      },
      {
        v: `지역: ${condition.location}`,
        s: searchStyle
      },
      {
        v: `기간: ${condition.period}`,
        s: searchStyle
      },
      {
        v: `용도: ${condition.usage}`,
        s: searchStyle
      },
      { v: '', s: {} }, 
    ].map((item) => [item])
  
    const headerRow = header.header.map((item) => {
      return {
        v: item.title,
        s: headerStyle
      }
    })
    const dataRows = data.map((item) => [
      item.year,
      item.appraisalSum,
      item.auctionSum,
      item.auctionRate,
      item.progressCount,
      item.auctionCount,
      item.avgBidCount,
      item.auctionRate2
    ].map((value) => {
      return {
        v: value,
        s: dataStyle
      }
    }))
    const rows = [...searchCol, headerRow, ...dataRows]
    const ws = XLSX.utils.aoa_to_sheet(rows)
  
    ws['!cols'] = colWidths
  
    XLSX.utils.book_append_sheet(xl, ws, '연간 데이터')
    XLSX.writeFile(xl, `${fileName}.xlsx`)
    console.log('excel download success')
  } catch (error) {
    console.log('excel download fail')
  }
}