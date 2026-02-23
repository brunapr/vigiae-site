export type InspectionStatus =
  | "open" // Em aberto
  | "in_accordance" // Em conformidade
  | "pending" // Pendente
  | "total_closure" // Interdição total
  | "partial_closure" // Interdição parcial

export type InspectionUrgency = "low" | "normal" | "high" | "critical"

export interface Establishment {
  name: string
  address: string
}

export interface Inspection {
  id: string
  establishment: Establishment
  inspected_at: string
  status: InspectionStatus
  createdAt: string
  updatedAt: string
  inspectorId: string
  description?: string
  urgency?: InspectionUrgency
  needs_imediate_closure: boolean
  is_complete: boolean
}

export interface InspectionsResponse {
  inspections: Inspection[]
  total: number
}

export interface InspectionFilters {
  userId: string
  status?: InspectionStatus[]
}
