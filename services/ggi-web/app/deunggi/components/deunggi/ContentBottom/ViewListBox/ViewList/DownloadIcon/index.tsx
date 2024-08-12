export default function DownloadIcon({ disabled }: { disabled: boolean }) {
  return (
    <svg
      width="13"
      height="15"
      viewBox="0 0 13 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 13.8571H0.5H12.5Z"
        fill={disabled ? '#D1D5DB' : '#6B7280'}
      />
      <path
        d="M12.5 13.8571H0.5"
        stroke={disabled ? '#D1D5DB' : '#6B7280'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.07143 1V6.14286H12.5L6.5 12.1429L0.5 6.14286H3.92857V1H9.07143Z"
        fill={disabled ? '#D1D5DB' : '#6B7280'}
        stroke={disabled ? '#D1D5DB' : '#6B7280'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
