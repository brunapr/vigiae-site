export type USER_ROLE = "ADMIN" | "OPERATOR"

export interface User {
  id: string
  email: string
  name: string
  role: USER_ROLE
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
