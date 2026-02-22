import Logo from "@/shared/components/logo"
import { ThemeToggle } from "@/shared/components/theme-toggle"
import { ReactNode } from "react"

interface AuthCardProps {
  children: ReactNode
  title: string
}

export function AuthCard({ children, title }: AuthCardProps) {
  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-lg">
      <div className="card-body">
        <div className="flex items-center mb-1 justify-between">
          <Logo />
          <ThemeToggle />
        </div>
        <h1 className="text-lg">{title}</h1>
        {children}
      </div>
    </div>
  )
}
