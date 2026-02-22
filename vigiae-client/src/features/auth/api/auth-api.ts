"use server"

import { api } from "@/shared/lib/axios"
import { LoginFormData, RegisterFormData } from "../schemas/auth-schema"
import { AuthResponse } from "../types/auth.types"
import { cookies } from "next/headers"

export async function login(data: LoginFormData) {
  try {
    ;(await cookies()).set("auth-token", "my-cookie", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    })

    // const response = await api.post<AuthResponse>('/auth/login', data);

    // (await cookies()).set('auth-token', response.data.token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'strict',
    //   maxAge: 60 * 60 * 24 * 7, // 7 dias
    // })

    return { success: true, user: "response.data.user" }
  } catch (error) {
    return { success: false, error: "Credenciais inválidas" }
  }
}

export async function register(data: RegisterFormData) {
  try {
    const response = await api.post<AuthResponse>("/auth/register", data)

    ;(await cookies()).set("auth-token", response.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    })

    return { success: true, user: response.data.user }
  } catch (error) {
    return { success: false, error: "Erro ao criar conta" }
  }
}

export async function logout() {
  ;(await cookies()).delete("auth-token")
  return { success: true }
}
