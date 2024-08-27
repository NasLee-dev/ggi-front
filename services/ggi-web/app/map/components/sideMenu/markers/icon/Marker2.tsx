import { MapItem } from 'app/map/models/map/MapItem'
import { PnuCountIcon, ShareIcon } from './Marker1'
import { colors } from 'app/styles/colorPallette'
import { NumToHan } from 'utils/map/NumToHan'
import { fromSquareMetersToText } from 'utils/map/MeterToText'
import { removeCommas } from 'utils/map/RemoveCommas'

const handleGetColor = (type: number) => {
  switch (type) {
    case 1:
      return colors.kmBlue
    case 2:
      return colors.gmBlue
    case 3:
      return colors.ggPurple
    case 4:
      return colors.kwGreen
  }
}

const handleGetBorderColor = (item: MapItem) => {
  if (item.winYn === 'Y') return `1px solid ${colors.winOrange}`
  if (item.types[0] === 1) return `1px solid ${colors.kmBlue}`
  if (item.types[0] === 2) return `1px solid ${colors.gmBlue}`
  if (item.types[0] === 3) return `1px solid ${colors.ggPurple}`
  if (item.types[0] === 4) return `1px solid ${colors.kwGreen}`
}

export const WinIcon = () => {
  return `
    <div style="display: flex; width: 15px; height: 16px; flex-direction: column; justify-content: center; flex-shrink: 0; background: #FF4D00;">
      <span style="color: #FFF; text-align: center; font-family: SUIT; font-size: 10px; font-style: normal; font-weight: 700; line-height: 135%; letter-spacing: -0.1px;">
        낙
      </span>
    </div>
  `
}

export const InterestIcon = () => {
  return `
    <div style="display: flex; width: 15px; height: 16px; flex-direction: column; justify-content: center; flex-shrink: 0; background: #00A980; margin-right: 2.5px;">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M0 2C0 0.895431 0.895431 0 2 0H14C15.1046 0 16 0.895431 16 2V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V2Z" fill="#00A980"/>
        <path d="M8.00251 11L4.60755 7.60143C2.76246 5.75635 5.47474 2.6341 8.00251 5.50014C10.5303 2.6341 13.2303 5.76865 11.3975 7.60143L8.00251 11Z" fill="white" stroke="white" strokeLinecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  `
}

export const UsageTopIcon = (
  item: MapItem,
  count: number,
  type: number,
  winExist: boolean,
) => {
  return `
      <div style="flex-direction: row; display: flex; width: 100px; height: 27px; justify-content: center; align-items: center; gap: 2px; border-radius: 11px 11px 0px 0px; border-top: ${handleGetBorderColor(
        item,
      )}; border-right: ${handleGetBorderColor(
        item,
      )}; border-left: ${handleGetBorderColor(
        item,
      )}; background: ${handleGetColor(type)};">
        ${item.winYn === 'Y' ? WinIcon() : ''}
        ${item.interest === 'Y' ? InterestIcon() : ''}
        ${
          item.share === 'Y' && item.count < 2
            ? ShareIcon(item, type, '-10')
            : ''
        }
        ${
          count > 1 ? PnuCountIcon(item, item.count, type, winExist, '-10') : ''
        }
        <span style="color: #FFF; text-align: center; font-family: SUIT; font-size: 14px; font-style: normal; font-weight: 700; line-height: 135%; letter-spacing: -0.14px;">
          ${
            item.usage === '단독,다가구'
              ? '다가구'
              : item.usage === '연립.다세대'
                ? '다세대'
                : item.usage
          }
        </span>
      </div>
  `
}

export const AmountBottomIcon = (
  item: MapItem,
  type: number,
  isPyeong: boolean,
) => {
  const buildingAreaPyeong = fromSquareMetersToText(
    removeCommas(item.buildingArea.split('㎡')[0]),
  )[1]
  const landAreaPyeong = fromSquareMetersToText(
    removeCommas(item.landArea.split('㎡')[0]),
  )[1]
  return `
      <div style="flex-direction: column; display: flex; width: 100px; height: 59px;  align-items: start; justify-content: start; align-content: center; gap: 1px 4px; flex-wrap: wrap; background: #FFF; border-radius: 0px 0px 11px 0px; border-right: ${handleGetBorderColor(
        item,
      )}; border-left: ${handleGetBorderColor(
        item,
      )}; border-bottom: ${handleGetBorderColor(item)};">
        <div style="display: flex; width: 95%; margin-top: 5px; flex-direction: row; gap: 5px; margin-left: 6px;">
          <span style="color: #000001; font-family: SUIT; font-size: 13px; font-style: normal; font-weight: 700; line-height: 135%; letter-spacing: -0.26px;">
            ${
              NumToHan(parseInt(item.amount)) === '0만'
                ? '취재중'
                : NumToHan(parseInt(item.amount))
            }
          </span>
          <span style="color: #676767; font-family: SUIT; font-size: 10px; font-style: normal; font-weight: 600; line-height: 135%; letter-spacing: -0.5px; margin-top: 2px;">
              ${item.ratio > 0 ? '(' + String(item.ratio) + '%)' : '(-)'}
          </span>
        </div> 
        <div style="display: flex; flex-direction: row; gap: 5px; margin-left: 6px;">
          <span style="color: #676767; font-family: SUIT; font-size: 11.5px; font-style: normal; font-weight: 600; line-height: 120%; letter-spacing: -0.115px;">
            건물
          </span>
          <span style="color: #000001; font-family: SUIT; font-size: 11.5px; font-style: normal; font-weight: 600; line-height: 120%; letter-spacing: -0.115px;">
            ${
              item.buildingArea === ''
                ? '-'
                : isPyeong
                  ? `${buildingAreaPyeong}`
                  : item.buildingArea
            }
          </span>
        </div>
        <div style="display: flex; flex-direction: row; gap: 5px; margin-left: 6px;">
          <span style="color: #676767; font-family: SUIT; font-size: 11.5px; font-style: normal; font-weight: 600; line-height: 120%; letter-spacing: -0.115px;">
            토지
          </span>
          <span style="color: #000001; font-family: SUIT; font-size: 11.5px; font-style: normal; font-weight: 600; line-height: 120%; letter-spacing: -0.115px;">
            ${
              item.landArea === ''
                ? '-'
                : isPyeong
                  ? `${landAreaPyeong}`
                  : item.landArea
            }
          </span>
        </div>
      </div>
      <div style="position: absolute; bottom: -14px; left: 0px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="13" viewBox="0 0 8 13" fill="none">
          <path d="M0 11.8821V0.25C0 0.111929 0.111929 0 0.25 0H7.54802C7.74457 0 7.86425 0.21637 7.75979 0.382866L0.46177 12.015C0.328402 12.2275 0 12.133 0 11.8821Z" fill=${
            item.winYn === 'Y'
              ? `${colors.winOrange}`
              : type === 1
                ? `${colors.kmBlue}`
                : type === 3
                  ? `${colors.ggPurple}`
                  : type === 2
                    ? `${colors.gmBlue}`
                    : `${colors.kwGreen}`
          } />
          <path d="M1 9.56322V0H7L1 9.56322Z" fill="white"/>
        </svg>
      </div>
    `
}
