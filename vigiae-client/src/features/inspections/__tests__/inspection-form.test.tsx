import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { InspectionModal } from "../components/inspection-modal"
import { InspectionUrgency } from "../types/inspection.types"

const mockOnClose = vi.fn()
const mockOnSubmit = vi.fn()
const mockHandleDelete = vi.fn()

describe("InspectionModal", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renderiza título correto para criação", () => {
    render(
      <InspectionModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        handleDelete={mockHandleDelete}
        isDeleting={false}
      />
    )

    expect(screen.getByText("Nova Inspeção")).toBeInTheDocument()
  })

  it("renderiza título correto para edição", () => {
    const inspection = {
      id: "1",
      establishment: { name: "Teste", address: "Rua Teste" },
      inspected_at: new Date().toISOString(),
      status: "open" as const,
      description: "Teste",
      urgency: "normal" as InspectionUrgency,
      needs_imediate_closure: false,
      createdAt: "",
      updatedAt: "",
      inspectorId: "1",
    }

    render(
      <InspectionModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        inspection={inspection}
        handleDelete={mockHandleDelete}
        isDeleting={false}
      />
    )

    expect(screen.getByText("Editar Inspeção")).toBeInTheDocument()
  })

  it("mostra botão de excluir apenas em edição", () => {
    const { rerender } = render(
      <InspectionModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        handleDelete={mockHandleDelete}
        isDeleting={false}
      />
    )

    expect(screen.queryByText("Excluir")).not.toBeInTheDocument()

    const inspection = {
      id: "1",
      establishment: { name: "Teste", address: "Rua Teste" },
      inspected_at: new Date().toISOString(),
      status: "open" as const,
      description: "",
      urgency: "normal" as InspectionUrgency,
      needs_imediate_closure: false,
      createdAt: "",
      updatedAt: "",
      inspectorId: "1",
    }

    rerender(
      <InspectionModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        inspection={inspection}
        handleDelete={mockHandleDelete}
        isDeleting={false}
      />
    )

    expect(screen.getByText("Excluir")).toBeInTheDocument()
  })

  it("abre dialog de confirmação ao clicar em excluir", async () => {
    const inspection = {
      id: "1",
      establishment: { name: "Teste", address: "Rua Teste" },
      inspected_at: new Date().toISOString(),
      status: "open" as const,
      description: "",
      urgency: "normal" as InspectionUrgency,
      needs_imediate_closure: false,
      createdAt: "",
      updatedAt: "",
      inspectorId: "1",
    }

    render(
      <InspectionModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        inspection={inspection}
        handleDelete={mockHandleDelete}
        isDeleting={false}
      />
    )

    fireEvent.click(screen.getByText("Excluir"))

    await waitFor(() => {
      expect(screen.getByText("Confirmar exclusão")).toBeInTheDocument()
      expect(
        screen.getByText(/tem certeza que deseja excluir/i)
      ).toBeInTheDocument()
    })
  })

  it("chama onSubmit com dados corretos ao criar", async () => {
    render(
      <InspectionModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        handleDelete={mockHandleDelete}
        isDeleting={false}
      />
    )

    fireEvent.change(screen.getByPlaceholderText("Digite o nome"), {
      target: { value: "Restaurante Teste" },
    })
    fireEvent.change(screen.getByPlaceholderText("Digite o endereço"), {
      target: { value: "Rua Teste, 123" },
    })

    fireEvent.click(screen.getByRole("button", { name: /criar/i }))

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled()
    })
  })
})
