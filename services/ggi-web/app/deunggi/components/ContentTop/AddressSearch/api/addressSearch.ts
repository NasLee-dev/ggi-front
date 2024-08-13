export interface Address {
  uniquenumber: string
  type: string
  sojaeji: string
  dungkiState: string
}

export interface AddressResponse {
  addrInfo: Address[]
  currentPage: number
  totalPage: number
  result: string
  msg: string
  statusCode: string
}

export async function fetchAddress(
  page: number,
  query: string,
): Promise<AddressResponse> {
  const response = await fetch(
    `/irosDungki/search?pageNum=${page}&simpleAddress=${encodeURIComponent(query)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
  )

  if (!response.ok) {
    throw new Error('Failed to fetch addresses')
  }

  return await response.json()
}
