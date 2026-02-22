export type USER_ROLE = "ADMIN" | "OPERATOR"

export interface User {
  id: string
  email: string
  name: string
  is_active: boolean
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData extends LoginData {
  name: string
  confirmPassword: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface RegisterFormData extends LoginData {
  password: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
}

export interface LoginResponse {
  success: boolean
  user?: User
  error?: string
}

export interface RegisterResponse {
  success: boolean
  user?: User
  error?: string
}
