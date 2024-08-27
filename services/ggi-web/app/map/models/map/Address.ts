export interface jusoProps {
  topSido: string
  topGungu: string
  topDong: string
  bottomSido: string
  bottomGungu: string
  bottomDong: string
}

export interface SidoProps {
  sd: string
  x: number
  y: number
}

export interface GunguProps {
  sgg: string
  x: number
  y: number
}

export interface DongProps {
  umd: string
  x: number
  y: number
}

export interface KakaoAddrProps {
  address: {
    address_name: string
    b_code: string
    h_code: string
    main_address_no: string
    mountain_yn: string
    region_1depth_name: string
    region_2depth_name: string
    region_3depth_h_name: string
    region_3depth_name: string
    sub_address_no: string
    x: string
    y: string
  }
  address_name: string
  address_type: string
  road_address: string | null
  x: string
  y: string
}

export interface KakaoSubwayProps {
  address_name: string
  category_group_code: string
  category_group_name: string
  category_name: string
  distance: string
  id: string
  phone: string
  place_name: string
  place_url: string
  road_address_name: string
  x: string
  y: string
}
