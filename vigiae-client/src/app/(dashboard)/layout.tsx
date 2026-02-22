import { getCurrentUser } from "@/features/auth/api/auth-api"
import MobileMenu from "@/shared/components/mobile-menu"
import { Sidebar } from "@/shared/components/sidebar"
import { ReactNode } from "react"

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await getCurrentUser()

  return (
    <div className="min-h-screen bg-base-100 flex overflow-hidden">
      <Sidebar user={user} />
      <main className="min-h-screen max-h-screen bg-primary/5 h-full overflow-y-auto w-full drawer-content flex flex-col">
        <MobileMenu user={user} />
        <div className="w-full h-full p-4">{children}</div>
      </main>
    </div>
  )
}
