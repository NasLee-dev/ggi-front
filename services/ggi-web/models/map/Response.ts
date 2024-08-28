export interface ResponseType {
  success: boolean
  code: number
  message: string
  data: any
}

export type mapCounts = {
  x: number
  y: number
  sd: string
  sgg: string
  umd: string
  count: number
}

export interface MapCountsResponse {
  success: boolean
  code: number
  message: string
  data: {
    count: number
    mapCounts: mapCounts[]
  }
}