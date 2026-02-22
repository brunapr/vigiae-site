"use client"

import { Settings, LogOut, UserCircle, ClipboardList } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "@/shared/components/logo"
import { ThemeToggle } from "@/shared/components/theme-toggle"
import { useUser } from "../hooks/use-user"

const menuItems = [
  { href: "/my-inspections", label: "Minhas Inspeções", icon: ClipboardList },
  { href: "/my-account", label: "Minha Conta", icon: UserCircle },
  { href: "/configurations", label: "Configurações", icon: Settings },
]

export function Sidebar() {
  const { user } = useUser()
  const pathname = usePathname()

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" })
    window.location.href = "/login"
  }

  if (!user) {
    window.location.href = "/login"
    return
  }

  return (
    <div className="drawer w-fit lg:drawer-open">
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-side z-40">
        <label htmlFor="sidebar-drawer" className="drawer-overlay lg:hidden" />

        <aside className="w-64 min-h-full bg-base-100 flex flex-col">
          <div className="p-4 border-b border-base-300 flex items-center justify-between">
            <Logo />
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map(item => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${
                      isActive
                        ? "bg-primary text-primary-content"
                        : "hover:bg-base-300"
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-base-300 space-y-3">
            <div className="lg:hidden">
              <ThemeToggle />
            </div>

            <div className="flex items-center gap-3 p-2 pr-0 rounded-lg">
              <div className="avatar">
                <div className="w-6 rounded-full ring-2 ring-primary ring-offset-base-200 ring-offset-2">
                  <img src="/user.png" alt={user.name} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{user.name}</p>
                <p className="text-xs text-base-content/70 truncate">
                  {user.email}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-ghost btn-circle hover:bg-primary/10"
                title="Sair"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
