import { useQuery } from '@tanstack/react-query'
import { getUser } from 'app/shared/api/getUser'

export const useGetUserQuery = (token: string) => {
  return useQuery({ queryKey: ['user'], queryFn: () => getUser(token) })
}
