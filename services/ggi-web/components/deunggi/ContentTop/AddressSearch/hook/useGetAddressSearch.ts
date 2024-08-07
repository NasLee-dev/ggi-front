import {
  AddressResponse,
  fetchAddress,
} from '@/components/deunggi/ContentTop/AddressSearch/api/addressSearh'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export function useAddressSearchQuery(
  page: number,
  query: string,
): UseQueryResult<AddressResponse, Error> {
  const queryKey = ['addresses', page, query] as const

  const queryFn = async () => {
    const response = await fetchAddress(page, query)

    return response
  }

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!query,
    staleTime: 5000,
  })
}
