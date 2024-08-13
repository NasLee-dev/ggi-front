export const fromSquareMetersToText = (squareMeters: number) => {
  const SQUARE_METER_TO_PYEONG = 1 / 3.305785
  const SQUARE_KM = 1_000_000

  const isSquareKm = squareMeters >= SQUARE_KM
  const areaValue = isSquareKm ? squareMeters / SQUARE_KM : squareMeters
  const areaUnit = isSquareKm
    ? '<span style="color: #000001"> km²</span>'
    : '<span style="color: #000001"> m²</span>'

  const formattedAreaValue = formatNumber(parseFloat(areaValue.toFixed(1)))

  const pyeong = `${formatNumber(
    parseFloat((squareMeters * SQUARE_METER_TO_PYEONG).toFixed(1)),
  )}평`

  const text = `${formattedAreaValue}${areaUnit}`

  return [text, pyeong]
}

const formatNumber = (num: number): string => {
  return num.toLocaleString()
}
