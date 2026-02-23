"use server"

import { destroy, get, post, put } from "@/shared/lib/axios"
import { Inspection, InspectionsResponse } from "../types/inspection.types"

export type InspectionData = Omit<
  Inspection,
  "id" | "inspected_at" | "createdAt" | "updatedAt" | "inspectorId"
>

export async function getOpenInspections(
  userId: string
): Promise<InspectionsResponse> {
  const response = await get<InspectionsResponse>("/inspections/open")
  const inspections = response.data.inspections

  return {
    inspections,
    total: inspections.length,
  }
}

export async function getAllInspections(
  userId: string
): Promise<InspectionsResponse> {
  const response = await get<InspectionsResponse>("/inspections/all")
  const inspections = response.data.inspections

  return {
    inspections,
    total: inspections.length,
  }
}

export async function createInspection(
  data: InspectionData
): Promise<Inspection> {
  const payload = {
    establishment: data.establishment,
    status: data.status,
    description: data.description,
    urgency: data.urgency,
    needs_imediate_closure: data.needs_imediate_closure,
  }

  const response = await post<Inspection>("/inspections/", payload)
  return response.data
}

export async function updateInspection(
  id: string,
  data: InspectionData
): Promise<Inspection | null> {
  const response = await put<Inspection>(`/inspections/${id}`, data)
  return response.data
}

export async function deleteInspection(id: string): Promise<void> {
  await destroy(`/inspections/${id}`)
}
