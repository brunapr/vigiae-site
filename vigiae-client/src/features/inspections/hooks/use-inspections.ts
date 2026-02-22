"use client"

import { useState, useEffect } from "react"
import { Inspection } from "../types/inspection.types"
import { getOpenInspections, getAllInspections } from "../api/inspections-api"

interface UseInspectionsReturn {
  openInspections: Inspection[]
  pastInspections: Inspection[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function useInspections(userId: string): UseInspectionsReturn {
  const [openInspections, setOpenInspections] = useState<Inspection[]>([])
  const [pastInspections, setPastInspections] = useState<Inspection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const [openRes, pastRes] = await Promise.all([
        getOpenInspections(userId),
        getAllInspections(userId),
      ])

      setOpenInspections(openRes.inspections)
      setPastInspections(pastRes.inspections)
    } catch (err) {
      setError("Erro ao carregar inspeções")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [userId])

  return {
    openInspections,
    pastInspections,
    isLoading,
    error,
    refetch: fetchData,
  }
}
