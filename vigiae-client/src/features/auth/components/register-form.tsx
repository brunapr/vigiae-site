"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, RegisterFormData } from "../schemas/auth-schema"
import { register as registerUser } from "../api/auth-api"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Mail, Lock, Loader2 } from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"

export function RegisterForm() {
  const router = useRouter()
  const [error, setError] = useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setError("")

    const result = await registerUser(data)

    if (result.success) {
      toast.success("Cadastro feito com sucesso! Você será logado.")
      router.push("/my-inspections")
      router.refresh()
    } else {
      toast.error("Erro ao criar conta.")
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
          <span className="label-text">Nome</span>
        </label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-base-content/50" />
          <input
            type="text"
            placeholder="Seu nome"
            className="input input-bordered w-full px-4"
            {...register("name")}
          />
        </div>
        {errors.name && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.name.message}
            </span>
          </label>
        )}
      </div>

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

      <div className="form-control">
        <label className="label">
          <span className="label-text">Confirmar Senha</span>
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-base-content/50" />
          <input
            type="password"
            placeholder="••••••"
            className="input input-bordered w-full px-4"
            {...register("confirmPassword")}
          />
        </div>
        {errors.confirmPassword && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.confirmPassword.message}
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
            Criando conta...
          </>
        ) : (
          "Criar Conta"
        )}
      </button>

      <div className="text-sm">
        Já tem conta?{" "}
        <Link href="/login" className="link link-primary">
          Faça login
        </Link>
      </div>
    </form>
  )
}
