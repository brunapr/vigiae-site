import axios from "axios"
import { cookies } from "next/headers"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
})

export async function get<T>(url: string) {
  const token = (await cookies()).get("auth-token")?.value
  if (!token) throw new Error("Não autenticado")

  return api.get<T>(url, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function post<T>(url: string, data: any) {
  const token = (await cookies()).get("auth-token")?.value
  if (!token) throw new Error("Não autenticado")

  return api.post<T>(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function put<T>(url: string, data: any) {
  const token = (await cookies()).get("auth-token")?.value
  if (!token) throw new Error("Não autenticado")

  return api.put<T>(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function destroy<T>(url: string) {
  const token = (await cookies()).get("auth-token")?.value
  if (!token) throw new Error("Não autenticado")

  return api.delete<T>(url, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
