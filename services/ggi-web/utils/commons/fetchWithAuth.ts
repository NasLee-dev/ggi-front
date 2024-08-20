export const fetchWithAuth: any = async (
  url: string,
  options: any,
  retryCount = 0,
) => {
  const defaultOptions = {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer token`,
      'Content-Type': 'application/json',
    },
  }

  const requestUrl = `${url}`

  try {
    const response = await fetch(requestUrl, defaultOptions)

    if (!response.ok) {
      const res: any = await response.json()

      // case 1: 에러 코드가 403인 경우 -> 기간 만료이므로 리프레시 토큰으로 갱신
      if (res.code === 403 && retryCount < 1) {
        try {
          const newAccessToken = '리프레시 토큰'

          if (!newAccessToken) {
            throw new Error('갱신된 액세스 토큰이 존재하지 않습니다.')
          }

          return await fetchWithAuth(url, options, retryCount + 1)
        } catch (e) {
          throw new Error(`HTTP error! ${e}`)
        }
      }

      // case 2: 에러 코드가 401인 경우 -> 인증된 유저가 아니므로 로그인 페이지로 이동?
      if (response.status === 401) {
        alert('로그인이 필요한 서비스 입니다.')
        return window.location.assign('/login')
      }

      // case 3: 그 이외의 에러는 throw
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    // TODO: 적절한 에러처리 필요!
    console.error('Fetch error:', error)
  }
}
