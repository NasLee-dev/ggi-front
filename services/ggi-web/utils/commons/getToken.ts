export const getToken = () => {
  if (
    typeof window !== 'undefined' &&
    typeof window.sessionStorage !== 'undefined'
  ) {
    const token = JSON.parse(sessionStorage.getItem('token') as string)

    return token
  }
}
