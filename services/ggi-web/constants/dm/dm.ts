
export const SAVETITLE = `나의조건을 설정합니다`
export const VIEWSUBTITLE = `나의조건은 10개까지만 설정할 수 있습니다`
export const SAVESUBTITLE = `사용하실 조건 이름을 적어주세요.\r\n조건은 10개까지만 저장할 수 있습니다.`

export const CONFIRMCONTENTS: any = {
  SAVE: {
    TITLE: '조건이 저장되었습니다',
    SUBTITLE: '',
    LEFTBTN: '조건목록 보기',
    RIGHTBTN: '확인'
  },
  CANCEL: {
    TITLE: '나의조건으로 저장하지 않습니다',
    SUBTITLE: '',
    LEFTBTN: '돌아가기',
    RIGHTBTN: '확인'
  },
  DELETE: {
    TITLE: '조건을 삭제하시겠습니까?',
    SUBTITLE: '삭제된 조건은 복구할 수 없습니다',
    LEFTBTN: '아니오',
    RIGHTBTN: '조건삭제'
  },
  OVER: {
    TITLE: '저장 갯수를 초과했습니다',
    SUBTITLE: '기존 조건을 삭제한 후 다시 설정해주세요',
    LEFTBTN: '확인',
    RIGHTBTN: ''
  }
}

export const HELPCONTENTS: any = {
  '소재지': {
    SUB1: '경매사건의',
    SUB2: '물건지 주소'
  },
  '소유자': {
    SUB1: '해당 경매물건의 등기상',
    SUB2: '소유자 주소'
  },
  '채무자': {
    SUB1: '해당 경매물건의 등기상',
    SUB2: '채무자 주소'
  },
  '채권자': {
    SUB1: '해당 경매물건의 등기상',
    SUB2: '채권자 주소'
  }
}

export const BASEDATE = [
  '신건등록일',
  '경매개시일',
  '배당종기일'
]

export const STATUSCODE = {
  '진행(구건)': 'A1',
  '신건': '01',
  '유찰': '02',
  '매각': '03',
  '종결': '99',
  '취소': '11',
  '취하': '04',
  '기각': '15',
  '각하': '16',
  '미진': '05',
  '납부': '06',
  '변경': '07',
  '분할': '08',
  '정지': '10',
  '항고': '18'
}

export const FAILCOUNT = {
  '0회': 0,
  '1회': 1,
  '2회': 2,
  '3회': 3,
  '4회': 4,
  '5회': 5,
  '6회': 6,
  '7회': 7,
  '8회': 8,
  '9회': 9,
  '10회': 10,
  '10회 이상': 99,
}

export const USAGE = [
  {status : true, name: '아파트'},
  {status : false, name: '다세대'},
  {status : false, name: '업무(오피스텔)'},
  {status : false, name: '주택'},
  {status : false, name: '연립'},
  {status : false, name: '다가구주택'},
  {status : false, name: '상가·상업시설'},
  {status : false, name: '공장'},
  {status : false, name: '기타건물'},
]

export const USAGECODE = {
  '아파트': 1,
  '다세대': 2,
  '업무(오피스텔)': 3,
  '주택': 4,
  '연립': 5,
  '다가구주택': 6,
  '상가·상업시설': 7,
  '공장': 8,
  '기타건물': 9
}

export const SPECIFIC = [
  {status : false, name: '선순위전세권'},
  {status : false, name: '선순위임차권'},
  {status : false, name: '선순위가등기'},
  {status : false, name: '선순위가처분'},
  {status : false, name: '유치권'},
  {status : false, name: '법정지상권'},
  {status : false, name: '분묘기지권'},
  {status : false, name: '지분매각'},
  {status : false, name: '입찰외포함'},
  {status : false, name: '예고등기'},
  {status : false, name: '대지권 미등기'},
  {status : false, name: '맹지'},
  {status : false, name: '건물만 입찰'},
  {status : false, name: '토지만 입찰'},
  {status : false, name: '토지별도등기'},
  {status : false, name: '재매각'},
]

export const SPECIFICCODE = {
  '선순위전세권': 1,
  '선순위임차권': 2,
  '선순위가등기': 3,
  '선순위가처분': 4,
  '유치권': 5,
  '법정지상권': 6,
  '분묘기지권': 7,
  '지분매각': 8,
  '입찰외포함': 9,
  '예고등기': 10,
  '대지권 미등기': 11,
  '맹지': 12,
  '건물만 입찰': 13,
  '토지만 입찰': 14,
  '토지별도등기': 15,
  '재매각': 16
}

export const SENDTO = [
  {status : true, name: '소재지'},
  {status : false, name: '소유자'},
  {status : false, name: '채무자'},
  {status : false, name: '채권자'}
]

export const SENDTOCODE = {
  '소재지': 'isTenant',
  '소유자': 'isOwner',
  '채무자': 'isDebtor',
  '채권자': 'isCreditor'
}

export const rentConditions = [
  {status : true, name: '임차인 없는 물건'},
  {status : false, name: 'HUG인수조건 변경'},
]

export const MINPRICE = [
  '최소',
  '0원',
  '3천만',
  '5천만',
  '1억',
  '2억',
  '3억',
  '5억',
  '10억',
  '20억',
  '50억',
  '50억 이상'
]

export const MAXPRICE = [
  '최대',
  '3천만',
  '5천만',
  '1억',
  '2억',
  '3억',
  '5억',
  '10억',
  '20억',
  '50억'
]

export const PAGENUMS = [
  '20개씩 보기',
  '30개씩 보기',
  '40개씩 보기',
  '50개씩 보기',
  '70개씩 보기',
  '80개씩 보기',
  '100개씩 보기'
]

export const sidos = {
  '서울특별시': '서울', 
  '경기도': '경기',
  '인천광역시': '인천',
  '부산광역시': '부산',
  '대구광역시': '대구',
  '광주광역시': '광주',
  '대전광역시': '대전',
  '울산광역시': '울산',
  '강원도': '강원',
  '경상남도': '경남',
  '경상북도': '경북',
  '전라남도': '전남',
  '전라북도': '전북',
  '충청남도': '충남',
  '충청북도': '충북',
  '세종특별자치시': '세종',
  '제주도': '제주'
}

export const listHeaders = (expected: boolean) => ({
  chk: {
    name: '',
    width: 3
  },
  idx: {
    name: '순번',
    width: 5
  },
  download: {
    name: '다운이력',
    width: 7
  },
  court: {
    name: '법원 또는 계',
    width: 10
  },
  caseNum: {
    name: '사건번호',
    width: 15
  },
  openingDate: {
    name: expected ? '개시결정일' : '현재상태',
    width: 7
  },
  usage: {
    name: '용도',
    width: 13
  },
  sendTo: {
    name: '수신인',
    width: 10
  },
  address: {
    name: '주소',
    width: 20
  },
  postCode: {
    name: '우편번호',
    width: 10
  }
})

export const myDmHeaders = {
  chk: {
    name: '',
    width: 3
  },
  type: {
    name: '분류',
    width: 7
  },
  filters: {
    name: '검색조건',
    width: 66
  },
  download: {
    name: '다운로드 수',
    width: 7
  },
  reDownload: {
    name: '재 다운로드',
    width: 7
  },
  expired: {
    name: '유효기한',
    width: 10
  }
}