import { Inspection, InspectionStatus } from "../types/inspection.types"
import { Calendar, MapPin, AlertTriangle, Flame } from "lucide-react"

interface InspectionCardProps {
  inspection: Inspection
  onClick?: () => void
}

const statusConfig: Record<
  InspectionStatus,
  {
    label: string
    color: string
    bgColor: string
  }
> = {
  open: {
    label: "Em aberto",
    color: "badge-info",
    bgColor: "bg-info/20",
  },
  pending: {
    label: "Pendente",
    color: "badge-warning",
    bgColor: "bg-warning/20",
  },
  in_accordance: {
    label: "Em conformidade",
    color: "badge-success",
    bgColor: "bg-success/20",
  },
  total_closure: {
    label: "Interdição total",
    color: "badge-error",
    bgColor: "bg-error/20",
  },
  partial_closure: {
    label: "Interdição parcial",
    color: "badge-error",
    bgColor: "bg-error/20",
  },
}

const urgencyConfig: Record<string, { color: string }> = {
  normal: { color: "text-base-content/70" },
  high: { color: "text-warning" },
  critical: { color: "text-error" },
}

function formatDate(date: string): string {
  const newDate = new Date(date)
  return newDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function InspectionCard({ inspection, onClick }: InspectionCardProps) {
  const {
    establishment,
    inspected_at,
    status,
    description,
    urgency,
    needs_imediate_closure,
  } = inspection
  const config = statusConfig[status]
  const urgencyStyle = urgency ? urgencyConfig[urgency] : null

  return (
    <div
      onClick={onClick}
      className={`
        card bg-base-100 shadow-md hover:shadow-lg transition-all cursor-pointer
        ${needs_imediate_closure ? "border-2 border-error" : ""}
        ${onClick ? "hover:scale-[1.02]" : ""}
      `}
    >
      <div className="card-body p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-base truncate">
              {establishment.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-base-content/70">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate text-xs">{establishment.address}</span>
            </div>
          </div>

          <div className={`badge ${config.bgColor} gap-1 shrink-0 text-xs`}>
            {config.label}
          </div>
        </div>

        <p className="text-sm text-base-content/70 line-clamp-2 min-h-5">
          {description}
        </p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm">{formatDate(inspected_at)}</span>
          </div>

          <div className="flex items-center gap-2">
            {needs_imediate_closure && <Flame className="h-4 w-4 text-error" />}
            {urgencyStyle && urgency !== "normal" && (
              <AlertTriangle className={`h-4 w-4 ${urgencyStyle.color}`} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
