"use server"

import { api } from "@/shared/lib/axios"
import { LoginFormData, RegisterFormData } from "../schemas/auth-schema"
import {
  AuthResponse,
  User,
  LoginResponse,
  RegisterResponse,
} from "../types/auth.types"
import { cookies } from "next/headers"

export async function login(data: LoginFormData): Promise<LoginResponse> {
  try {
    const formData = new URLSearchParams()
    formData.append("username", data.email)
    formData.append("password", data.password)

    const response = await api.post<AuthResponse>("/auth/login", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    ;(await cookies()).set("auth-token", response.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    })

    const token = response.data.access_token

    const userResponse = await api.get<User>("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return { success: true, user: userResponse.data }
  } catch (error: any) {
    const message = error.response?.data?.detail || "Credenciais inválidas"
    return { success: false, error: message }
  }
}
export async function register(
  data: RegisterFormData
): Promise<RegisterResponse> {
  try {
    const userResponse = await api.post<User>("/auth/register", {
      email: data.email,
      name: data.name,
      password: data.password,
    })

    const loginResult = await login({
      email: data.email,
      password: data.password,
    })

    if (!loginResult.success) {
      return { success: true, user: userResponse.data }
    }

    return { success: true, user: loginResult.user }
  } catch (error: any) {
    const message = error.response?.data?.detail || "Erro ao criar conta"
    return { success: false, error: message }
  }
}

export async function logout(): Promise<{ success: boolean }> {
  ;(await cookies()).delete("auth-token")
  return { success: true }
}

export async function getCurrentUser() {
  const token = (await cookies()).get("auth-token")?.value
  if (!token) return null

  try {
    const response = await api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch {
    return null
  }
}
