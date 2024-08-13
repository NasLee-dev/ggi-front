const usePathUrl = (type?: number) => {
  if (type === 1) {
    return 'https://www.ggi.co.kr'
  } else if (type === 2 || type === 3) {
    return 'http://file.ggi.co.kr/Gongmae/Pic/'
  } else {
    return 'https://www.ggi.co.kr/'
  }
}

export default usePathUrl
