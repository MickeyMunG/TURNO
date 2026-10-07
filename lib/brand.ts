export const APP_NAME = 'Mickerting Appointment'
export const APP_DESCRIPTION = 'Tu agenda y recepcionista digital: reservas, confirmaciones y recordatorios por WhatsApp.'

/** Usa el dominio de esta instalación, sin enviar clientes al proyecto original. */
export function getAppUrl(): string {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim()
  if (configured) return configured.replace(/\/+$/, '')
  if (typeof window !== 'undefined') return window.location.origin
  return 'http://localhost:3000'
}
