import { useSwiper } from 'swiper/react'

export default function PrevBtn() {
  const swiper = useSwiper()
  return (
    <div
      style={{
        width: '25px',
        height: '25px',
        flexShrink: 0,
        zIndex: 100,
        position: 'absolute',
        left: 5,
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
      }}
      onClick={() => swiper.slidePrev()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
      >
        <circle cx="12.5" cy="12.5" r="12.5" fill="black" fillOpacity="0.44" />
        <path
          d="M15 7.5L7.81202 12.292C7.66359 12.3909 7.66359 12.6091 7.81202 12.708L15 17.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
