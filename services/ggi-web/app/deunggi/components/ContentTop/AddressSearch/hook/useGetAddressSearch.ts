
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AddressResponse, fetchAddress } from '../api/addressSearch'

export function useAddressSearchQuery(
  page: number,
  query: string,
): UseQueryResult<AddressResponse, Error> {
  const queryKey = ['addresses', page, query] as const

  const queryFn = async () => {
    const response = await fetchAddress(page, query)

    if (response.statusCode !== '0') {
      alert(response.msg)

      return
    }

    return response
  }

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!query,
    staleTime: Infinity,
  })
}
