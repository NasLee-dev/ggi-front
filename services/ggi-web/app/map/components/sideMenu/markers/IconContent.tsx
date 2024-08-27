import { MapItem } from 'app/map/models/map/MapItem'

import {
  AmountIcon,
  InterestIcon,
  PnuCountIcon,
  ShareIcon,
  UsageIcon,
} from './icon/Marker1'
import { AmountBottomIcon, UsageTopIcon } from './icon/Marker2'

interface IconContentProps {
  item: MapItem
  handleItemUsage: (usage?: string) => string
  index: number
  zoomLevel: number
  winExist: boolean
  isPyeong: boolean
}

export default function IconContent({
  item,
  handleItemUsage,
  index,
  zoomLevel,
  winExist,
  isPyeong,
}: IconContentProps) {
  const commonStyle1 = `
    <div id="target_${index}" style="flex-direction: row; display: flex; margin-top: -30px;">
      ${
        item.interest === 'Y' && item.count < 2
          ? InterestIcon(item, item.types[0])
          : ''
      }
      ${
        item.share === 'Y' && item.count < 2
          ? ShareIcon(item, item.types[0])
          : ''
      }
      ${
        item.count > 1
          ? PnuCountIcon(item, item.count, item.types[0], winExist)
          : ''
      }
      ${UsageIcon(item, handleItemUsage, item.types[0])}
      ${AmountIcon(item, item.types[0])}
    </div>
  `
  const commonStyle2 = `
    <div id="target_${index}" style="display: flex; flex-direction: column; justify-content: center; align-items: center; align-content: center; flex-shrink: 0; position: absolute; margin-left: 0px; margin-top: -100px;">
      ${UsageTopIcon(item, item.count, item.types[0], winExist)}
      ${AmountBottomIcon(item, item.types[0], isPyeong)}
    </div>
  `

  if (item.winYn !== 'Y') {
    if (
      (item.types[0] === 1 || item.types[0] === 2 || item.types[0] === 3) &&
      zoomLevel === 15
    ) {
      return commonStyle1
    } else if (
      (item.types[0] === 1 || item.types[0] === 2 || item.types[0] === 3) &&
      zoomLevel > 15
    ) {
      return commonStyle2
    } else if (item.types[0] === 4 && zoomLevel > 15) {
      return commonStyle1
    } else if (item.types[0] === 4 && zoomLevel === 15) {
      return `
          <div id="target_${index}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <g filter="url(#filter0_d_905_254)">
                <circle cx="8" cy="6" r="6" fill="#1C8D00"/>
                <circle cx="8" cy="6" r="5.75" stroke="white" stroke-width="0.5"/>
              </g>
              <defs>
                <filter id="filter0_d_905_254" x="0" y="0" width="16" height="16" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" types="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dy="2"/>
                  <feGaussianBlur stdDeviation="1"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix types="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_905_254"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_905_254" result="shape"/>
                </filter>
              </defs>
            </svg>
          </div>`
    }
  } else if (item.winYn === 'Y') {
    if (zoomLevel === 15) {
      return `
          <div id="target_${index}" style="z-index: 75;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <g filter="url(#filter0_d_905_256)">
                <circle cx="8" cy="6" r="6" fill="#FF4D00"/>
                <circle cx="8" cy="6" r="5.75" stroke="white" stroke-width="0.5"/>
              </g>
              <defs>
                <filter id="filter0_d_905_256" x="0" y="0" width="16" height="16" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" types="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dy="2"/>
                  <feGaussianBlur stdDeviation="1"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix types="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_905_256"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_905_256" result="shape"/>
                </filter>
              </defs>
            </svg>
          </div>`
    } else if (zoomLevel === 16) {
      return commonStyle1
    } else {
      return commonStyle2
    }
  }
}
