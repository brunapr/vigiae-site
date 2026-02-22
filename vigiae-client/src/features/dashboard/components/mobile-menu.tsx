import Logo from "@/shared/components/logo"
import { Menu } from "lucide-react"

export default function MobileMenu() {
  return (
    <div className="lg:hidden navbar bg-base-100 shadow-sm sticky top-0 z-30">
      <label
        htmlFor="sidebar-drawer"
        className="btn btn-ghost btn-circle drawer-button mr-2"
      >
        <Menu className="h-5 w-5" />
      </label>
      <Logo />
    </div>
  )
}
