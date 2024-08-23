import { AreaTextStyle } from './styled/MeasureStyle'

interface AreaBtnProps {
  mode: string
  clickedMapType: {
    area: boolean
  }
}

export const AreaBtn = ({ mode, clickedMapType }: AreaBtnProps) => {
  const isActive = mode === 'area' && clickedMapType.area
  const color = isActive ? 'white' : '#000001'

  return (
    <div id="area">
      <div style={{ width: '20px', height: '20px' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <rect x="3.5" y="3.5" width="13" height="13" stroke={color} />
          <rect
            x="2.5"
            y="2.5"
            width="3"
            height="3"
            rx="1.5"
            fill={color}
            stroke={color}
          />
          <rect
            x="14.5"
            y="2.5"
            width="3"
            height="3"
            rx="1.5"
            fill={color}
            stroke={color}
          />
          <rect
            x="2.5"
            y="14.5"
            width="3"
            height="3"
            rx="1.5"
            fill={color}
            stroke={color}
          />
          <rect
            x="14.5"
            y="14.5"
            width="3"
            height="3"
            rx="1.5"
            fill={color}
            stroke={color}
          />
        </svg>
      </div>
      <AreaTextStyle area={isActive}>면적</AreaTextStyle>
    </div>
  )
}
