import { RegisterForm } from "@/features/auth/components/register-form"
import { AuthCard } from "@/features/auth/components/auth-card"

export default function RegisterPage() {
  return (
    <AuthCard title="Cadastro">
      <RegisterForm />
    </AuthCard>
  )
}
