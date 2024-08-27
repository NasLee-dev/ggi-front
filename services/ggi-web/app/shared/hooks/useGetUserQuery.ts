import { useQuery } from '@tanstack/react-query'
import { getUser } from 'app/shared/api/getUser'

export const useGetUserQuery = (token: string) => {
  return useQuery({ queryKey: ['users'], queryFn: () => getUser(token) })
}
