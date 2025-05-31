import { cn } from "../../lib/utils/utils"

export function Card({ className, ...props }) {
  return <div className={cn("bg-white rounded-lg shadow p-6", className)} {...props} />
}

export function CardHeader({ className, ...props }) {
  return <div className={cn("mb-4", className)} {...props} />
}

export function CardTitle({ className, ...props }) {
  return <h2 className={cn("text-xl font-semibold", className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn("", className)} {...props} />
} 