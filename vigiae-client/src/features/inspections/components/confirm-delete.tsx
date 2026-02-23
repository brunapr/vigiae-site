import { AlertTriangle } from "lucide-react"

export default function ConfirmDelete({
  setShowConfirmDelete,
  onConfirmDelete,
  isDeleting,
}: {
  setShowConfirmDelete: (showConfirmDelete: boolean) => void
  onConfirmDelete: () => Promise<void>
  isDeleting: boolean
}) {
  return (
    <div className="modal modal-open z-50">
      <div className="modal-box max-w-sm">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="font-semibold">Confirmar exclusão</h3>
        </div>

        <p className="text-base-content/70 mb-6 text-sm">
          Tem certeza que deseja excluir esta inspeção? Esta ação não pode ser
          desfeita.
        </p>

        <div className="modal-action">
          <button
            onClick={() => setShowConfirmDelete(false)}
            className="btn btn-ghost"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmDelete}
            disabled={isDeleting}
            className={`btn btn-error ${isDeleting ? "loading" : ""}`}
          >
            {isDeleting ? "Excluindo..." : "Sim, excluir"}
          </button>
        </div>
      </div>
      <div
        className="modal-backdrop"
        onClick={() => setShowConfirmDelete(false)}
      />
    </div>
  )
}
