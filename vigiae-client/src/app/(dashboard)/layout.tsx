import MobileMenu from "@/features/dashboard/components/mobile-menu"
import { Sidebar } from "@/features/dashboard/components/sidebar"
import { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-base-100 flex overflow-hidden">
      <Sidebar />
      <main className="min-h-screen max-h-screen bg-primary/5 h-full overflow-y-auto w-full drawer-content flex flex-col">
        <MobileMenu />
        <div className="w-full h-full p-4">{children}</div>
      </main>
    </div>
  )
}
