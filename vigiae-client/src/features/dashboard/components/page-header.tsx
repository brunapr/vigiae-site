import { Clipboard } from "lucide-react"

export default function PageHeader({
  title,
  subtitle,
  Icon,
}: {
  title: string
  subtitle: string
  Icon: typeof Clipboard
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="text-sm text-base-content/70">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}
