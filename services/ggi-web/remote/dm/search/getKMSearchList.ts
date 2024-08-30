import * as I from "@/models/dm/DM"
import { ISearchRes } from "@/models/dm/SearchList"

export const getKMSearchList = async (pageNum: number, pageSize: number, sorts: string[], filters: I.IFilterProps): Promise<ISearchRes> => {
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

    return data.data
  } catch (error) {
    throw new Error(error)
  }
}