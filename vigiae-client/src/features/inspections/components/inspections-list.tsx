"use client"

import { Inspection } from "../types/inspection.types"
import { InspectionCard } from "./inspection-card"
import { AlertCircle, Loader2 } from "lucide-react"

interface InspectionsListProps {
  title: string
  inspections: Inspection[]
  isLoading?: boolean
  emptyMessage: string
  onInspectionClick?: (inspection: Inspection) => void
}

export function InspectionsList({
  title,
  inspections,
  isLoading,
  emptyMessage,
  onInspectionClick,
}: InspectionsListProps) {
  if (isLoading) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-bold">{title}</h2>
        {!isLoading && inspections.length > 0 && (
          <span className="badge badge-ghost">{inspections.length}</span>
        )}
      </div>

      {inspections.length === 0 ? (
        <div className="card bg-base-200">
          <div className="card-body items-center text-center py-12">
            <AlertCircle className="h-12 w-12 text-base-content/30 mb-2" />
            <p className="text-base-content/70">{emptyMessage}</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {inspections.map(inspection => (
            <InspectionCard
              key={inspection.id}
              inspection={inspection}
              onClick={() => onInspectionClick?.(inspection)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
