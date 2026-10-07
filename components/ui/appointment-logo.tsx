import { APP_NAME } from '@/lib/brand'

interface AppointmentLogoProps {
  height?: number
  className?: string
  variant?: 'dark' | 'light'
  compact?: boolean
}

export function AppointmentLogo({ height = 32, className = '', variant = 'dark', compact = false }: AppointmentLogoProps) {
  return (
    <span role="img" aria-label={APP_NAME} className={`inline-flex items-center shrink-0 ${className}`}
      style={{ gap: height * 0.25, color: variant === 'dark' ? '#ffffff' : '#171321', height }}>
      <svg aria-hidden="true" width={height} height={height} viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="14" fill="#7c3aed" />
        <rect x="11" y="13" width="26" height="25" rx="5" stroke="white" strokeWidth="2.5" />
        <path d="M11 21h26M18 10v7M30 10v7M18 29l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {!compact && (
        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: height * 0.5, fontWeight: 750, letterSpacing: '-0.04em' }}>Mickerting</span>
          <span style={{ fontSize: height * 0.28, fontWeight: 500, letterSpacing: '0.08em', marginTop: height * 0.06 }}>Appointment</span>
        </span>
      )}
    </span>
  )
}
