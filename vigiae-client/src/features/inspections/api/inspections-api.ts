"use server"

import { InspectionFormData } from "../schemas/inspection-schema"
import {
  Inspection,
  InspectionsResponse,
  InspectionStatus,
} from "../types/inspection.types"
import { mockInspections } from "./mock-data"

export type InspectionData = Omit<
  Inspection,
  "id" | "inspectedAt" | "createdAt" | "updatedAt"
>

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Simula banco de dados em memória
let inspectionsDb = [...mockInspections]

const OPEN_STATUSES: InspectionStatus[] = ["open"]
const CLOSED_STATUSES: InspectionStatus[] = [
  "in_accordance",
  "pending",
  "total_closure",
  "partial_closure",
]

export async function getOpenInspections(
  userId: string
): Promise<InspectionsResponse> {
  await delay(300)

  const inspections = inspectionsDb.filter(
    i => i.inspectorId === userId && OPEN_STATUSES.includes(i.status)
  )

  return {
    inspections,
    total: inspections.length,
  }
}

export async function getAllInspections(
  userId: string
): Promise<InspectionsResponse> {
  await delay(300)

  const inspections = inspectionsDb.filter(
    i => i.inspectorId === userId && CLOSED_STATUSES.includes(i.status)
  )

  return {
    inspections,
    total: inspections.length,
  }
}

export async function createInspection(
  userId: string,
  data: InspectionData
): Promise<Inspection> {
  await delay(500)

  const newInspection: Inspection = {
    id: `ins-${Date.now()}`,
    establishment: data.establishment,
    inspectedAt: new Date(),
    status: data.status,
    description: data.description,
    urgency: data.urgency,
    needs_imediate_closure: data.needs_imediate_closure,
    inspectorId: userId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  inspectionsDb.push(newInspection)
  return newInspection
}

export async function updateInspection(
  id: string,
  data: InspectionData
): Promise<Inspection | null> {
  await delay(400)

  const index = inspectionsDb.findIndex(i => i.id === id)
  if (index === -1) return null

  const updated: Inspection = {
    ...inspectionsDb[index],
    establishment: data.establishment,
    status: data.status,
    description: data.description,
    urgency: data.urgency,
    needs_imediate_closure: data.needs_imediate_closure,
  }

  inspectionsDb[index] = updated
  return updated
}

export async function deleteInspection(id: string): Promise<boolean> {
  await delay(300)

  const index = inspectionsDb.findIndex(i => i.id === id)
  if (index === -1) return false

  inspectionsDb.splice(index, 1)
  return true
}

export async function getInspectionById(
  id: string
): Promise<Inspection | null> {
  await delay(200)
  return inspectionsDb.find(i => i.id === id) || null
}
