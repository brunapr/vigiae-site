import { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col space-y-4 items-center justify-center p-4">
      {children}
    </div>
  )
}
