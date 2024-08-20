export const fetchQueryString = (searchParams: URLSearchParams) => {
  const token = searchParams.get('token')
  const type = searchParams.get('type')
  const idCode = searchParams.get('idCode')
  return { token, type, idCode }
}
