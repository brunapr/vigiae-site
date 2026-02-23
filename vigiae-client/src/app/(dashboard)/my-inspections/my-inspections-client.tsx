"use client"

import { useState } from "react"
import { useInspections } from "@/features/inspections/hooks/use-inspections"
import { InspectionsList } from "@/features/inspections/components/inspections-list"
import { InspectionModal } from "@/features/inspections/components/inspection-modal"
import { Inspection } from "@/features/inspections/types/inspection.types"
import { InspectionFormData } from "@/features/inspections/schemas/inspection-schema"
import {
  createInspection,
  updateInspection,
  deleteInspection,
} from "@/features/inspections/api/inspections-api"
import { ClipboardList, Plus } from "lucide-react"
import PageHeader from "@/shared/components/page-header"
import { User } from "@/features/auth/types/auth.types"
import toast from "react-hot-toast"

export default function MyInspectionsClient({ user }: { user: User }) {
  const { openInspections, pastInspections, isLoading, error, refetch } =
    useInspections(user.id!)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedInspection, setSelectedInspection] =
    useState<Inspection | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [complete, setComplete] = useState(false)

  const handleCreate = () => {
    setSelectedInspection(null)
    setIsModalOpen(true)
  }

  const handleEdit = (inspection: Inspection) => {
    setSelectedInspection(inspection)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedInspection(null)
    setIsDeleting(false)
  }

  const handleSubmit = async (data: InspectionFormData) => {
    if (!user.id) return null
    setIsSubmitting(true)

    try {
      if (selectedInspection) {
        const updatedInspection: Inspection = {
          ...selectedInspection,
          ...data,
        }

        if (complete) {
          updatedInspection.is_complete = true
          setComplete(false)
        }

        await updateInspection(selectedInspection.id, updatedInspection)

        if (complete) {
          toast.success("Inspeção finalizada com sucesso!")
        } else {
          toast.success("Inspeção editada com sucesso!")
        }
      } else {
        await createInspection(data)
        toast.success("Inspeção criada com sucesso!")
      }

      await refetch()
      handleCloseModal()
    } catch (err) {
      toast.success("Ocorreu um erro ao salvar a inspeção. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedInspection) return

    setIsDeleting(true)

    try {
      await deleteInspection(selectedInspection.id)
      await refetch()
      handleCloseModal()
    } catch (err) {
      alert("Erro ao excluir inspeção")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-8 relative max-sm:mb-20">
      <div className="flex items-start justify-between">
        <PageHeader
          title="Minhas Inspeções"
          subtitle="Gerencie suas inspeções agendadas e histórico"
          Icon={ClipboardList}
        />

        <button
          onClick={handleCreate}
          className="btn btn-primary gap-2 max-sm:hidden"
        >
          <Plus className="h-6 w-6" />
          Nova Inspeção
        </button>
      </div>

      <div className="fixed left-0 bottom-4 w-full z-20 p-4 sm:hidden mb-0!">
        <button
          onClick={handleCreate}
          className="btn btn-primary py-4 gap-2 w-[calc(100%-1rem)]"
        >
          <Plus className="h-6 w-6" />
          Nova Inspeção
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      <InspectionsList
        title="Abertas"
        inspections={openInspections}
        isLoading={isLoading}
        emptyMessage="Nenhuma inspeção em aberto no momento"
        onInspectionClick={handleEdit}
      />

      <InspectionsList
        title="Finalizadas"
        inspections={pastInspections}
        isLoading={isLoading}
        emptyMessage="Nenhuma inspeção finalizada encontrada"
        onInspectionClick={handleEdit}
      />

      <InspectionModal
        setComplete={setComplete}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        inspection={selectedInspection}
        isLoading={isSubmitting}
        handleDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}
