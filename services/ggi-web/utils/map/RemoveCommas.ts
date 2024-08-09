export const removeCommas = (numberString: string) => {
  return Number(numberString.replace(/,/g, ''))
}
