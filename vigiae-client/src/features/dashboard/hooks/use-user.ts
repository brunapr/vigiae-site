"use client"

import { useState, useEffect } from "react"
import { api } from "@/shared/lib/axios"
import { User } from "@/features/auth/types/auth.types"

interface UseUserReturn {
  user: User | null
  userId: string | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
  refetch: () => void
}

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUser = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await api.get<User>("/auth/me")
      setUser(response.data)
    } catch (err: any) {
      setUser(null)
      setError(err.response?.data?.detail || "Erro ao carregar usuário")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return {
    user,
    userId: user?.id ?? null,
    isLoading,
    isAuthenticated: !!user,
    error,
    refetch: fetchUser,
  }
}
