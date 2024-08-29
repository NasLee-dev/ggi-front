import * as I from "@/models/dm/DM"

export interface SearchRes {
  contents: any[]
  paging: {
    isFirst: boolean
    pageNumber: number
    isLast: boolean
    totalPages: number
    isEmpty: boolean
    pageSize: number
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    totalElements: number
  }
}

export const getSearchList = async (pageNum: number, pageSize: number, sorts: string[], filters: I.IFilterProps): Promise<SearchRes> => {
  try {
    let sort: any = ''
    if (sorts.length) {
      sorts.forEach((s) => sort += '&sort='+s)
    }

    const data = await fetch(
      `/ggi/api/dm/km-items?page=${pageNum}&size=${pageSize}${sort}`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filters)
      }
    ).then((res) => res.json())

    if (!data.success) {
      throw new Error(data.message)
    }

    console.log(data.data)
    return data.data
  } catch (error) {
    throw new Error(error)
  }
}