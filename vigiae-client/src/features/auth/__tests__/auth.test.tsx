import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { LoginForm } from "../components/login-form"
import toast from "react-hot-toast"

vi.mock("../api/auth-api", () => ({
  login: vi.fn(),
}))

vi.mock("react-hot-toast", () => ({
  default: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))

import { login } from "../api/auth-api"

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renderiza campos de email e senha", () => {
    render(<LoginForm />)

    expect(screen.getByPlaceholderText("seu@email.com")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("••••••")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument()
  })

  it("chama login com dados corretos ao submeter", async () => {
    vi.mocked(login).mockResolvedValue({
      success: true,
      user: { id: "1", email: "test@test.com", name: "Test", is_active: true },
    })

    render(<LoginForm />)

    fireEvent.change(screen.getByPlaceholderText("seu@email.com"), {
      target: { value: "test@test.com" },
    })
    fireEvent.change(screen.getByPlaceholderText("••••••"), {
      target: { value: "123456" },
    })

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }))

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: "test@test.com",
        password: "123456",
      })
    })
  })

  it("mostra loading state durante submissão", async () => {
    vi.mocked(login).mockImplementation(
      () =>
        new Promise(resolve =>
          setTimeout(
            () =>
              resolve({
                success: true,
                user: { id: "1", email: "", name: "", is_active: true },
              }),
            100
          )
        )
    )

    render(<LoginForm />)

    fireEvent.change(screen.getByPlaceholderText("seu@email.com"), {
      target: { value: "test@test.com" },
    })
    fireEvent.change(screen.getByPlaceholderText("••••••"), {
      target: { value: "123456" },
    })

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }))

    await waitFor(() => {
      expect(screen.getByText(/entrando/i)).toBeInTheDocument()
    })
  })

  it("mostra toast de erro quando login falha", async () => {
    vi.mocked(login).mockResolvedValue({
      success: false,
      error: "Erro ao fazer login",
    })

    render(<LoginForm />)

    fireEvent.change(screen.getByPlaceholderText("seu@email.com"), {
      target: { value: "test@test.com" },
    })
    fireEvent.change(screen.getByPlaceholderText("••••••"), {
      target: { value: "senha-errada" },
    })

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Erro ao fazer login")
    })
  })
})
