import { z } from "zod"

export const inspectionSchema = z.object({
  establishment: z.object({
    name: z.string().min(2, "Nome do estabelecimento é obrigatório"),
    address: z.string().min(5, "Endereço é obrigatório"),
  }),
  status: z.enum([
    "open",
    "pending",
    "in_accordance",
    "total_closure",
    "partial_closure",
  ]),
  description: z.string().optional(),
  urgency: z.enum(["low", "normal", "high", "critical"]).optional(),
  needs_imediate_closure: z.boolean().default(false),
})

export type InspectionFormData = z.infer<typeof inspectionSchema>
