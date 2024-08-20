export const fetchApi: any = async (url: string, options: any) => {
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
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    // TODO: 적절한 에러처리 필요!
    console.error('Fetch error:', error)
  }
}
