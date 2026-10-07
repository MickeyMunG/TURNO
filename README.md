# Mickerting Appointment

Plataforma de citas y recepcionista digital para negocios de servicios. Adaptación de [Turno, de AxelSandovalH](https://github.com/AxelSandovalH/Turno), con identidad de Mickerting Appointment.

## Funciones incluidas

- Agenda por profesional, servicios, disponibilidad y bloqueos de horario.
- Página pública de reservas y código QR por negocio.
- Clientes, conversaciones y confirmaciones por WhatsApp.
- Asistente con Claude y conexión UltraMsg por organización.
- Suscripciones y anticipos con Stripe.
- Recordatorios, portal de pacientes y módulos según el giro del negocio.

## Desarrollo local

Requiere Node.js 20.9 o posterior. El proyecto usa Next.js 16.2.6, React 19, TypeScript y Tailwind CSS 4.

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

También puedes usar `pnpm install --frozen-lockfile` y `pnpm dev` con el lockfile incluido.

Abre http://localhost:3000. La portada se puede revisar sin credenciales. El acceso al servicio de citas responde 503 hasta configurar Supabase; no utiliza una base de datos de demostración ni datos del autor original.

## Configuración de tu instalación

Rellena `.env.local` con las credenciales de tus propios servicios:

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_APP_URL` | URL de esta instalación, sin `/` final. En producción, usa el dominio HTTPS real. |
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu proyecto Supabase. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública compatible con los clientes existentes. |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave de servidor; nunca se envía al navegador. |
| `ANTHROPIC_API_KEY` | Asistente de reservas. |
| `ULTRAMSG_INSTANCE`, `ULTRAMSG_TOKEN` | Conexión WhatsApp de respaldo; las organizaciones también pueden configurar su propia instancia. |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Pagos y verificación de eventos. Comienza con credenciales de prueba. |
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL` | Correos y remitente de un dominio verificado. Sin remitente propio se usa el remitente de pruebas de Resend. |
| `CRON_SECRET` | Secreto aleatorio para autorizar las tareas programadas. |

No publiques `.env.local` ni las claves privadas en GitHub. `.env.example` contiene únicamente campos vacíos.

### Base de datos

En un proyecto Supabase propio y vacío, aplica las migraciones SQL de `supabase/migrations` en orden, desde `001_initial_schema.sql` hasta `022_tours_vertical.sql`. Configura también los buckets y políticas de Storage que requieran las cargas de archivos. Los scripts y seeds heredados contienen identidades de demostración del proyecto original: revísalos antes de usarlos y ejecútalos únicamente contra una base de datos de pruebas.

Configura la URL del sitio y la redirección de autenticación a `${NEXT_PUBLIC_APP_URL}/auth/callback` en Supabase. El inicio de sesión con Google requiere habilitar el proveedor en Supabase.

### Webhooks y recordatorios

- WhatsApp: `${NEXT_PUBLIC_APP_URL}/api/whatsapp`.
- Stripe: `${NEXT_PUBLIC_APP_URL}/api/stripe-webhook`.
- En GitHub Actions, configura los secrets `APP_URL` y `CRON_SECRET` para el workflow de recordatorios.
- Los endpoints adicionales `/api/cron/confirmation-check` y `/api/cron/deposit-timeout` necesitan programación externa según su frecuencia operativa.

### Planes

Los precios heredados están centralizados en `lib/plans.ts`: Agenda ($1,500 MXN/mes) y Agenda + Asistente ($2,000 MXN/mes). Cambia esa configuración antes de comercializar planes distintos.

## Comprobaciones

```powershell
npx tsc --noEmit
npm run build
npm run lint
```

La comprobación de tipos y el build deben realizarse antes del despliegue. Los servicios externos requieren credenciales propias para probar el flujo completo de registro, citas, WhatsApp y pagos.

## Identidad

`lib/brand.ts` define el nombre, descripción y resolución de URL. `components/ui/appointment-logo.tsx` contiene el logotipo adaptable a fondos claros y oscuros. Los iconos de la aplicación usan el mismo símbolo de calendario.

## Procedencia

Se conserva el historial Git del repositorio original y su atribución. El README original indicaba: “Privado. Todos los derechos reservados.” Esta adaptación no añade ni cambia la licencia del código original.
