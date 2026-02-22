import PageHeader from "@/shared/components/page-header"
import { Settings } from "lucide-react"

export default function Configurations() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Configurações"
        subtitle="Acesse as configurações da plataforma"
        Icon={Settings}
      />
    </div>
  )
}
