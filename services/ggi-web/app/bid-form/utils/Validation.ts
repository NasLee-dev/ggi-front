//  민증 검증
const handleVerifyIdNum = (idNum: string) => {
  let total = 0
  const jumin = idNum.replace('-', '').split('')
  const lastNum = parseInt(jumin[jumin.length - 1])
  const bits = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5]
  let sum = 0
  for (let i = 0; i < bits.length; i++) {
    sum += Number(jumin[i]) * bits[i]
  }
  const checkNum = (11 - (total % 11)) % 10
  return lastNum == checkNum ? true : false
}

//  사업자 등록 번호 검증
const handleVerifyCorpNum = (number: string) => {
  if (number.length !== 10) {
    return false
  }

  const regsplitNum = number
    .replace(/-/gi, '')
    .split('')
    .map(function (item) {
      return parseInt(item, 10)
    })

  if (regsplitNum.length === 10) {
    const regkey = [1, 3, 7, 1, 3, 7, 1, 3, 5]
    let regNumSum = 0
    for (var i = 0; i < regkey.length; i++) {
      regNumSum += regkey[i] * regsplitNum[i]
    }
    regNumSum += parseInt(((regkey[8] * regsplitNum[8]) / 10).toString(), 10)
    const regCheck =
      Math.floor(regsplitNum[9]) === (10 - (regNumSum % 10)) % 10

    return regCheck
  }
}

//  법인등록번호 검증
const handleVerifyCorpReiNum = (num: string) => {
  const rawValue = num
    .replace(/[^\d]/g, '')
    .split('')
    .map((r) => Number(r))
  const checkSum = rawValue.pop()
  const sum =
    [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
      .map((n, i) => n * rawValue[i])
      .reduce((sum, n) => {
        sum += n
        return sum
      }, 0) % 10
  return sum === (10 - (checkSum ? checkSum : 0)) % 10
}

  //  전화번호 검증
  const handleVerifyPhone = (phone: string) => {
    const telRegex = /^(070|02|0[3-9]{1}[0-9]{1})[0-9]{3,4}[0-9]{4}$/
    const smartPhoneRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/g
    const telCheck = telRegex.test(phone)
    const smartPhoneCheck = smartPhoneRegex.test(phone)
    if (telCheck || smartPhoneCheck) {
      return true
    } else {
      return false
    }
  }