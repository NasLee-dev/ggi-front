export type OptionValue = {
  value: string
  label: string
}

export interface SearchCondition {
  keyword: string
  address: {
    sido: boolean
    sigungu: boolean
    eupmyeondong: boolean
  }
  usage: {
    main: OptionValue
    compare1: OptionValue
    compare2: OptionValue
  }
}