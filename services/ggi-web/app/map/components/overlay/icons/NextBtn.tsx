import { useSwiper } from 'swiper/react'

export default function NextBtn() {
  const swiper = useSwiper()
  return (
    <div
      style={{
        width: '25px',
        height: '25px',
        flexShrink: 0,
        zIndex: 100,
        position: 'absolute',
        right: 5,
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
      }}
      onClick={() => swiper.slideNext()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
      >
        <circle
          cx="12.5"
          cy="12.5"
          r="12.5"
          transform="rotate(-180 12.5 12.5)"
          fill="black"
          fillOpacity="0.44"
        />
        <path
          d="M10 17.5L17.188 12.708C17.3364 12.6091 17.3364 12.3909 17.188 12.292L10 7.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
