"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginFormData } from "../schemas/auth-schema"
import { login } from "../api/auth-api"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, Loader2 } from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"

export function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setError("")
    const result = await login(data)

    if (result.success) {
      toast.success("Login feito com sucesso!")
      router.push("/my-inspections")
      router.refresh()
    } else {
      toast.error("Erro ao fazer login.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-base-content/50" />
          <input
            type="email"
            placeholder="seu@email.com"
            className="input input-bordered w-full px-4"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.email.message}
            </span>
          </label>
        )}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Senha</span>
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-base-content/50" />
          <input
            type="password"
            placeholder="••••••"
            className="input input-bordered w-full px-4"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.password.message}
            </span>
          </label>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Entrando...
          </>
        ) : (
          "Entrar"
        )}
      </button>

      <div className="text-sm">
        Não tem conta?{" "}
        <Link href="/register" className="link link-primary">
          Cadastre-se
        </Link>
      </div>
    </form>
  )
}
