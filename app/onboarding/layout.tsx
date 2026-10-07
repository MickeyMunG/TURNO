// El onboarding consulta la sesión; no debe prerenderizarse durante el build.
export const dynamic = 'force-dynamic'

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return children
}
