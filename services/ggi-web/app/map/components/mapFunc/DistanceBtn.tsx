import { TextStyle } from './styled/MeasureStyle'

interface DistanceBtnProps {
  mode: string
  clickedMapType: {
    distance: boolean
  }
}

export const DistanceBtn = ({ mode, clickedMapType }: DistanceBtnProps) => {
  const isActive = mode === 'distance' && clickedMapType.distance
  const strokeColor = isActive ? 'white' : '#000001'

  return (
    <div id="distance">
      <div style={{ width: '20px', height: '20px' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5.92578 6.62109L8.04729 4.49959"
            stroke={strokeColor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.60547 6.54688L14.0303 18.9718"
            stroke={strokeColor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.84766 2.30469L18.2725 14.7296"
            stroke={strokeColor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.60156 9.29688L10.7231 7.17537"
            stroke={strokeColor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.2773 11.9766L13.3989 9.85506"
            stroke={strokeColor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.9531 14.6523L16.0746 12.5308"
            stroke={strokeColor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M1.79688 6.73828L6.03989 2.49527" stroke={strokeColor} />
          <path d="M13.8398 18.7812L18.0829 14.5382" stroke={strokeColor} />
        </svg>
      </div>
      <TextStyle mode={isActive ? 'distance' : ''}>거리</TextStyle>
    </div>
  )
}
