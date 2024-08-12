function useNum2Han(number: number, winAmt: number) {
  if (number <= 0) {
    if (!winAmt || winAmt === 0) {
      return '취재중'
    } else if (winAmt > 0) {
      return '-'
    }
  }
  let result = ''
  if (number >= 100000000) {
    result = `${Math.floor(number / 100000000)}억`
    number %= 100000000
    result += number ? ` ${Math.floor(number / 10000)}만` : ''
  } else {
    result = `${Math.floor(number / 10000)}만`
  }
  return result
}
export default useNum2Han
