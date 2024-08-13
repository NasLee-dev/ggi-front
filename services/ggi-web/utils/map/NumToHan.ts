export function NumToHan(num: number) {
  if (num >= 100000000000) {
    //  1000억 이상
    const eok = Math.round(num / 100000000).toFixed(1)
    return `${eok.toString().replace(/\.0+/, '')}억`
  } else if (num >= 10000000000) {
    //  100억 이상
    const eok = Math.floor(num / 100000000).toFixed(0)
    const man = Math.round((num % 100000000) / 10000000)
    if (man.toString().length > 1) {
      return `${parseInt(eok) + 1}억`
    } else if (man.toString() === '0') {
      return `${eok}억`
    } else {
      return `${eok}.${man.toString().replace('0', '')}억`
    }
  } else if (num >= 1000000000) {
    //  10억 이상
    const eok = Math.floor(num / 100000000).toFixed(0)
    const man = Math.round((num % 100000000) / 10000000)
    return man ? `${eok}.${man.toString().replace('0', '')}억` : `${eok}억`
  } else if (num >= 100000000) {
    //  1억 이상
    const eok = Math.floor(num / 100000000).toFixed(0)
    const man = Math.round((num % 100000000) / 10000000)
    if (man.toString().length > 1) {
      return `${parseInt(eok) + 1}억`
    } else if (man.toString() === '0') {
      return `${eok}억`
    } else {
      return `${eok}.${man.toString().replace('0', '')}억`
    }
  } else if (num >= 10000000) {
    //  1천만 이상
    const chunMan = Math.floor(num / 10000000)
    const baekMan = Math.round((num % 10000000) / 1000000)
    if (baekMan.toString().length > 1) {
      return `${chunMan + 1 === 10 ? '1억원' : chunMan + 1 + '천만'}`
    } else if (baekMan.toString() === '0') {
      return `${chunMan}천만`
    } else {
      return `${chunMan}.${baekMan}천만`
    }
  } else if (num >= 1000000) {
    //  100만 이상
    const baekMan = Math.floor(num / 1000000)
    const shipMan = Math.round((num % 1000000) / 100000)
    if (shipMan.toString().length > 1) {
      return `${baekMan + 1 === 10 ? '1천만' : baekMan + 1 + '백만'}`
    } else if (shipMan.toString() === '0') {
      return `${baekMan}백만`
    } else {
      return `${baekMan}.${shipMan}백만`
    }
  } else if (num >= 100000) {
    //  10만 이상
    const shipMan = Math.floor(num / 10000)
    return `${shipMan}만`
  } else {
    //  1만
    return `${Math.floor(num / 10000)}만`
  }
}
