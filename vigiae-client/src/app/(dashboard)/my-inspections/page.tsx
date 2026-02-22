import { getCurrentUser } from "@/features/auth/api/auth-api"
import { redirect } from "next/navigation"
import MyInspectionsClient from "./my-inspections-client"

export default async function MyInspectionsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return <MyInspectionsClient user={user} />
}
