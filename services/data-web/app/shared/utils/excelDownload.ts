import XLSX from 'xlsx-js-style'

interface ExcelDownloadProps<T> {
  data: T[]
  fileName: string
  headers: { title: string; key: string; width?: number }[]
  conditions: {
    location: string
    period: string
    usage: string
  }
  styles?: {
    headerStyle?: any
    dataStyle?: any
  }
}

export const excelDownload = <T extends object>({
  data,
  fileName,
  headers,
  conditions,
  styles = {},
}: ExcelDownloadProps<T>) => {
  try {
    const wb = XLSX.utils.book_new()

    const defaultSearchStyle = {
      font: { color: { rgb: '000000' }, name: '맑은고딕', sz: 11 },
      fill: { fgColor: { rgb: 'FFFFFF' } },
      alignment: { horizontal: 'left', vertical: 'center' },
      border: {
        top: { style: 'thin', color: { rgb: 'D3D3D3' } },
        bottom: { style: 'thin', color: { rgb: 'D3D3D3' } },
        left: { style: 'thin', color: { rgb: 'D3D3D3' } },
        right: { style: 'thin', color: { rgb: 'D3D3D3' } },
      },
    }

    const defaultHeaderStyle = {
      font: { bold: true, color: { rgb: '000000' }, name: '맑은고딕', sz: 11 },
      fill: { fgColor: { rgb: 'FFFFFF' } },
      alignment: { horizontal: 'center', vertical: 'center' },
      border: {
        left: { style: 'thin', color: { auto: 1 } },
        right: { style: 'thin', color: { auto: 1 } },
        top: { style: 'thin', color: { auto: 1 } },
        bottom: { style: 'thin', color: { auto: 1 } },
      },
    }
    const defaultDataStyle = {
      font: { color: { rgb: '000000' }, name: '맑은고딕', sz: 11 },
      fill: { fgColor: { rgb: 'FFFFFF' } },
      alignment: { horizontal: 'center', vertical: 'center' },
      border: {
        left: { style: 'thin', color: { auto: 1 } },
        right: { style: 'thin', color: { auto: 1 } },
        top: { style: 'thin', color: { auto: 1 } },
        bottom: { style: 'thin', color: { auto: 1 } },
      },
    }

    const headerStyle = styles.headerStyle || defaultHeaderStyle
    const dataStyle = styles.dataStyle || defaultDataStyle

    const colWidths = headers.map((header) => ({ wpx: header.width || 100 }))

    const searchConditions =
      conditions &&
      [
        { v: '', s: {} },
        {
          v: '■ 검색조건',
          s: defaultSearchStyle,
        },
        {
          v: `지역: ${conditions.location}`,
          s: defaultSearchStyle,
        },
        {
          v: `기간: ${conditions.period}`,
          s: defaultSearchStyle,
        },
        {
          v: `용도: ${conditions.usage}`,
          s: defaultSearchStyle,
        },
        { v: '', s: {} },
      ].map((item) => [item])

    const headerRow = headers.map((header) => ({
      v: header.title,
      s: headerStyle,
    }))

    const dataRows = data.map((item) =>
      headers.map((header) => ({
        v: item[header.key],
        s: dataStyle,
      })),
    )

    const rows = [...searchConditions, headerRow, ...dataRows]
    const ws = XLSX.utils.aoa_to_sheet(rows)

    ws['!cols'] = colWidths

    XLSX.utils.book_append_sheet(wb, ws, fileName)

    XLSX.writeFile(wb, `${fileName}.xlsx`)
    console.log('Excel download success')
  } catch (error) {
    console.error('Excel download failed', error)
  }
}
