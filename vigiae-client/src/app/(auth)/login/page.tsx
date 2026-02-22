import { LoginForm } from "@/features/auth/components/login-form"
import { AuthCard } from "@/features/auth/components/auth-card"

export default function LoginPage() {
  return (
    <AuthCard title="Login">
      <LoginForm />
    </AuthCard>
  )
}
