import { ScanEye } from "lucide-react"

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <ScanEye className="text-primary size-6" />
      <h1 className="text-2xl">
        Vigi
        <span className="text-primary">aê</span>
      </h1>
    </div>
  )
}
