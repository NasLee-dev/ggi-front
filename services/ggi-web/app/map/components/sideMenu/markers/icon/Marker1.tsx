import { MapItem } from '@/models/map/MapItem'
import { colors } from 'app/styles/colorPallette'
import { NumToHan } from 'utils/map/NumToHan'

const getColor = (item: MapItem, types: number): string => {
  if (item.winYn === 'Y') {
    return colors.winOrange
  } else {
    switch (types) {
      case 1:
        return colors.kmBlue
      case 2:
        return colors.gmBlue
      case 3:
        return colors.ggPurple
      case 4:
        return colors.kwGreen
      default:
        return colors.black
    }
  }
}

const getCountColor = (item: MapItem, winExist: boolean) => {
  if (item.winYn === 'Y' && winExist) {
    return colors.black
  } else if (item.winYn !== 'Y' && winExist) {
    return colors.winOrange
  } else {
    return colors.black
  }
}

const getBorderColor = (item: MapItem, type: number): string => {
  if (item.winYn === 'Y') {
    return `1px solid ${colors.winOrange}`
  } else {
    switch (type) {
      case 1:
        return `1px solid ${colors.kmBlue}`
      case 2:
        return `1px solid ${colors.gmBlue}`
      case 3:
        return `1px solid ${colors.ggPurple}`
      case 4:
        return `1px solid ${colors.kwGreen}`
      default:
        return `1px solid ${colors.black}`
    }
  }
}

export const PnuCountIcon = (
  item: MapItem,
  count: number,
  type: number,
  winExist: boolean,
  top?: string,
) => {
  return `
  <div style="position: absolute; right: 0px; top: ${
    top ? `${top}px` : '-42px'
  };">
    <div style="display: inline-flex; width: 22px; height: 15px; justify-content: center; align-items: center; border-radius: 100px; border: ${getBorderColor(
      item,
      type,
    )}; background: #FFF;">
      <span style="color: ${getCountColor(
        item,
        winExist,
      )}; text-align: center; font-family: SUIT; font-size: 10px; font-style: normal; font-weight: 700; line-height: 135%; letter-spacing: -0.1px;">
        ${count > 99 ? '99+' : count}
      </span>
    </div>
  </div>
  `
}

export const UsageIcon = (
  item: MapItem,
  handleItemUsage: () => string,
  type: number,
) => {
  return `
  <div style="display: inline-flex; width: 45px; height: 32px; justify-content: center; align-items: center;border-radius: 17.5px 0px 0px 0px; border-left: ${getBorderColor(
    item,
    type,
  )}; border-top: ${getBorderColor(
    item,
    type,
  )}; border-bottom: ${getBorderColor(item, type)}; background: #FFF;">
    <span style="color: ${getColor(
      item,
      type,
    )}; text-align: center; font-family: SUIT; font-size: 11px; font-style: normal; font-weight: 800; line-height: 110%; letter-spacing: -0.22px;">
      ${item.winYn === 'Y' ? '낙찰' : handleItemUsage()}
    </span>
  </div>
  `
}

export const AmountIcon = (item: MapItem, type: number) => {
  return `
  <div style="display: flex; width: 56px; height: 32px;  justify-content: center; align-items: center; gap: 10px; flex-shrink: 0; border-radius: 0px 100px 100px 0px; background: ${
    type === 1
      ? `${colors.kmBlue}`
      : type === 3
        ? `${colors.ggPurple}`
        : type === 2
          ? `${colors.gmBlue}`
          : `${colors.kwGreen}`
  }; border-right: ${
    item.winYn === 'Y'
      ? `1px solid ${colors.winOrange}`
      : type === 1
        ? `1px solid ${colors.kmBlue}`
        : type === 3
          ? `1px solid ${colors.ggPurple}`
          : type === 2
            ? `1px solid ${colors.gmBlue}`
            : `1px solid ${colors.kwGreen}`
  }; border-top:${
    item.winYn === 'Y'
      ? `1px solid ${colors.winOrange}`
      : type === 1
        ? `1px solid ${colors.kmBlue}`
        : type === 3
          ? `1px solid ${colors.ggPurple}`
          : type === 2
            ? `1px solid ${colors.gmBlue}`
            : `1px solid ${colors.kwGreen}`
  }; border-bottom: ${
    item.winYn === 'Y'
      ? `1px solid ${colors.winOrange}`
      : type === 1
        ? `1px solid ${colors.kmBlue}`
        : type === 3
          ? `1px solid ${colors.ggPurple}`
          : type === 2
            ? `1px solid ${colors.gmBlue}`
            : `1px solid ${colors.kwGreen}`
  };">
    <span style="color: #FFF; text-align: right; font-family: SUIT; font-size: 12px; font-style: normal; font-weight: 800; line-height: 110%; letter-spacing: -0.24px;">
      ${
        type === 4
          ? '예정물건'
          : NumToHan(parseInt(item.amount)) === '0만'
            ? '취재중'
            : NumToHan(parseInt(item.amount))
      }
    </span>
  </div>
  `
}

export const ShareIcon = (item: MapItem, type: number, top?: string) => {
  return `
  <div style="position: absolute; z-index: 90; right: 0px; top: ${
    top ? `${top}px` : '-42px'
  };">
    <div style="display: inline-flex; z-index: 90; height: 15px; width: 32px; justify-content: center; align-items: center; border-radius: 100px; border: ${getBorderColor(
      item,
      type,
    )}; background: #FFF;">
      <span style="color: #000001; text-align: center; font-family: SUIT; font-size: 10px; font-style: normal; font-weight: 700; line-height: 135%; letter-spacing: -0.1px;">
        지분
      </span>
    </div>
  </div>
  `
}

export const InterestIcon = (item: MapItem, types: number) => {
  return `
  <div style="flex-direction: row; display: flex;">
    <div style="position: absolute; right: ${
      item.share === 'Y' ? '32px' : '0px'
    };
    top: -38px;
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none">
        <rect x="0.5" y="0.5" width="16" height="14" rx="7" fill="white"/>
        <rect x="0.5" y="0.5" width="16" height="14" rx="7" stroke=${getColor(
          item,
          types,
        )} />
        <path d="M8.50283 11.5108L4.6835 8.05124C2.60777 5.97552 5.65909 1.99013 8.50283 5.21442C11.3466 1.99013 14.3841 5.98936 12.3222 8.05124L8.50283 11.5108Z" fill=${getColor(
          item,
          types,
        )} stroke=${getColor(
          item,
          types,
        )} stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  `
}
