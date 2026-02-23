"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  inspectionSchema,
  InspectionFormData,
} from "../schemas/inspection-schema"
import { Inspection, InspectionStatus } from "../types/inspection.types"
import {
  X,
  MapPin,
  AlertTriangle,
  Flame,
  FileText,
  Info,
  Trash2,
  Home,
  LoaderIcon,
} from "lucide-react"

interface InspectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: InspectionFormData) => void
  inspection?: Inspection | null
  isLoading?: boolean
  handleDelete: () => Promise<void>
  isDeleting: boolean
}

const statusOptions: { value: InspectionStatus; label: string }[] = [
  { value: "open", label: "Em aberto" },
  { value: "pending", label: "Pendente" },
  { value: "in_accordance", label: "Em conformidade" },
  { value: "total_closure", label: "Interdição total" },
  { value: "partial_closure", label: "Interdição parcial" },
]

const urgencyOptions = [
  { value: "low", label: "Baixa", color: "text-base-content" },
  { value: "normal", label: "Normal", color: "text-primary" },
  { value: "high", label: "Alta", color: "text-warning" },
  { value: "critical", label: "Crítica", color: "text-error" },
]

export function InspectionModal({
  isOpen,
  onClose,
  onSubmit,
  inspection,
  isLoading,
  handleDelete,
  isDeleting,
}: InspectionModalProps) {
  const isEditing = !!inspection

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InspectionFormData>({
    resolver: zodResolver(inspectionSchema),
    defaultValues: {
      establishment: { name: "", address: "" },
      status: "open",
      description: "",
      urgency: "normal",
      needs_imediate_closure: false,
    },
  })

  useEffect(() => {
    if (inspection) {
      reset({
        establishment: inspection.establishment,
        status: inspection.status,
        description: inspection.description || "",
        urgency: inspection.urgency || "normal",
        needs_imediate_closure: inspection.needs_imediate_closure,
      })
    } else {
      reset({
        establishment: { name: "", address: "" },
        status: "open",
        description: "",
        urgency: "normal",
        needs_imediate_closure: false,
      })
    }
  }, [inspection, reset, isOpen])

  const handleClose = () => {
    reset()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal modal-open p-0 lg:p-4">
      <div className="modal-box w-full h-full lg:h-auto lg:max-h-[90dvh] lg:max-w-2xl lg:rounded-2xl rounded-none m-0 max-lg:p-0 lg:m-auto relative flex flex-col">
        <div className="flex items-center justify-between p-4 lg:p-0 lg:mb-6 border-b lg:border-0 border-base-200">
          <h3 className="font-bold text-lg flex items-center gap-2">
            {isEditing ? "Editar Inspeção" : "Nova Inspeção"}
          </h3>
          <button
            onClick={handleClose}
            className="btn btn-ghost btn-circle btn-sm"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-0">
          <form
            id="inspection-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control space-y-1">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <Home className="h-4 w-4" /> Nome do Estabelecimento
                  </span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered w-full ${errors.establishment?.name ? "input-error" : ""}`}
                  placeholder="Ex: Restaurante Bom Sabor"
                  {...register("establishment.name")}
                />
                {errors.establishment?.name && (
                  <span className="text-error text-xs mt-1">
                    {errors.establishment.name.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Endereço
                  </span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered w-full ${errors.establishment?.address ? "input-error" : ""}`}
                  placeholder="Ex: Rua das Flores, 123"
                  {...register("establishment.address")}
                />
                {errors.establishment?.address && (
                  <span className="text-error text-xs mt-1">
                    {errors.establishment.address.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <Info className="h-4 w-4" /> Status
                  </span>
                </label>
                <select
                  className="select select-bordered w-full"
                  {...register("status")}
                >
                  {statusOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" /> Urgência
                  </span>
                </label>
                <select
                  className="select select-bordered w-full"
                  {...register("urgency")}
                >
                  {urgencyOptions.map(opt => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      className={opt.color}
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Descrição
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered h-32 lg:h-20 w-full resize-none"
                placeholder="Observações sobre a inspeção..."
                {...register("description")}
              />
            </div>

            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-error"
                  {...register("needs_imediate_closure")}
                />
                <span className="label-text flex items-center gap-2 text-error font-medium">
                  <Flame className="h-5 w-5" />
                  Fechamento Imediato
                </span>
              </label>
            </div>
          </form>
        </div>

        <div
          className={`${inspection ? "justify-between" : "justify-end"} flex items-center p-4 lg:p-0 lg:pt-4 border-t lg:border-0 border-base-200 mt-auto`}
        >
          <button
            onClick={handleDelete}
            disabled={isDeleting || !inspection}
            className={`btn btn-error btn-circle shadow-lg 
              ${!inspection ? "hidden" : ""} 
              ${isDeleting ? "loading" : ""}`}
            title="Excluir inspeção"
          >
            {!isDeleting && <Trash2 className="h-5 w-5" />}
          </button>

          <div className="flex space-x-3 items-center">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-ghost"
            >
              Cancelar
            </button>
            <button
              type="submit"
              form="inspection-form"
              className={`btn btn-primary min-w-40`}
              disabled={isLoading}
            >
              {isLoading ? (
                <LoaderIcon className="animate-spin" />
              ) : isEditing ? (
                "Salvar"
              ) : (
                "Criar"
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="modal-backdrop hidden lg:block" onClick={handleClose} />
    </div>
  )
}
