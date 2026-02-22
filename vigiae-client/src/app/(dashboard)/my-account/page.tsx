import PageHeader from "@/features/dashboard/components/page-header"
import { UserCircle } from "lucide-react"

export default function MyAccount() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Minha Conta"
        subtitle="Veja e altere detalhes de sua conta"
        Icon={UserCircle}
      />
    </div>
  )
}
