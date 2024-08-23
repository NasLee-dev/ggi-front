
import { jusoProps } from '@/models/map/Address'
import { ItemDetail } from '@/models/map/DetailItem'
import { Form } from '@/models/map/Form'
import { MapListResponse } from '@/models/map/ListItem'
import { MapItem } from '@/models/map/MapItem'
import { SelectedItem } from '@/models/map/SelectedItem'
import { atom } from 'recoil'


type Props = {
  position: [number, number]
  type: number[]
  winYn: string
}

export const mapItemsAtom = atom<MapItem[]>({
  key: `mapItems`,
  default: [
    {
      pnu: '',
      x: 0,
      y: 0,
      types: [1],
      ids: [],
      winYn: '',
      usage: '',
      buildingArea: '',
      landArea: '',
      share: '',
      ratio: 0,
      amount: '',
      interest: '',
      count: 0,
      winExist: false,
    },
  ],
})

export const mapListAtom = atom<MapListResponse>({
  key: `mapList`,
  default: {
    contents: [
      {
        type: 1,
        id: '',
        idCode: '',
        caseNo: '',
        appraisalAmt: 0,
        minAmt: 0,
        winAmt: 0,
        ratio: 0,
        buildingArea: '',
        landArea: '',
        path: '',
        status: '',
        startDate: '',
        dividendDate: '',
        claim: 0,
        interest: '',
        x: 0,
        y: 0,
        checkInfo: '',
      },
    ],
    paging: {
      isFirst: false,
      isLast: false,
      pageNumber: 0,
      totalPages: 0,
      isEmpty: false,
      pageSize: 0,
      totalElements: 0,
    },
  },
})

export const markerPositionAtom = atom<Props>({
  key: `markerPosition`,
  default: {
    position: [0, 0],
    type: [1],
    winYn: '',
  },
})

export const formDataAtom = atom<Form>({
  key: `formData`,
  default: {
    ids: [],
    fromAppraisalAmount: 0,
    toAppraisalAmount: 0,
    fromMinimumAmount: 0,
    toMinimumAmount: 0,
    interests: false,
    x1: 1,
    y1: 1,
    x2: 1,
    y2: 1,
    awardedMonths: 0,
    km: true,
    kw: false,
    gm: false,
    gg: false,
    ekm: false,
    egm: false,
    egg: false,
    keyword: '',
    isSubFilterBoxOpen: false,
    lastFilter: 1,
    selectedType: null,
    selectedId: null,
    role: '',
  },
})

export const jusoAtom = atom<jusoProps>({
  key: `juso`,
  default: {
    topSido: '',
    topGungu: '',
    topDong: '',
    bottomSido: '',
    bottomGungu: '',
    bottomDong: '',
  },
})

export const clickedItemAtom = atom<MapItem | null>({
  key: `clicked`,
  default: null,
})

export const listOverItemAtom = atom({
  key: `listOver`,
  default: {
    x: 0,
    y: 0,
    isOver: false,
  },
})

export const selectedItemAtom = atom<SelectedItem | null>({
  key: `selectedItem`,
  default: null,
})

export const isOnlySelectedAtom = atom<boolean>({
  key: `isOnlySelected`,
  default: false,
})

export const isPanoramaVisibleAtom = atom<boolean>({
  key: `isPanoramaVisible`,
  default: false,
})

export const clickedInfoAtom = atom<ItemDetail[]>({
  key: `clickedInfo`,
  default: [],
})

export const pageAtom = atom<number>({
  key: `page`,
  default: 1,
})

export const isPyeongState = atom({
  key: `isPyeongState`,
  default: false,
})

export const isCurrentStateAtom = atom({
  key: `isCurrentState`,
  default: false,
})
