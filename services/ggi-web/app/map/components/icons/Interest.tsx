'use client'
export default function Interest({ interest }: { interest: string }) {
  return (
    <div
      style={{
        zIndex: 1000,
      }}
    >
      {interest === 'Y' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="22"
          viewBox="0 0 26 22"
          fill="none"
          style={{
            cursor: 'pointer',
          }}
        >
          <path
            d="M13.0075 21.0288L2.82265 11.8033C-2.71261 6.26805 5.42423 -4.35967 13.0075 4.23845C20.5909 -4.35967 28.6908 6.30495 23.1924 11.8033L13.0075 21.0288Z"
            fill="#009873"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="22"
          viewBox="0 0 26 22"
          fill="none"
          style={{
            cursor: 'pointer',
          }}
        >
          <path
            d="M13.0075 21.0288L2.82265 11.8033C-2.71261 6.26805 5.42423 -4.35967 13.0075 4.23845C20.5909 -4.35967 28.6908 6.30495 23.1924 11.8033L13.0075 21.0288Z"
            fill="black"
            fillOpacity="0.45"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  )
}
