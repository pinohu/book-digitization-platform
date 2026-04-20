import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4 p-8">
      <h2 className="text-2xl font-bold">Not Found</h2>
      <p className="text-muted-foreground">
        Could not find the requested resource.
      </p>
      <Button asChild>
        <Link href="/dashboard">Return to Dashboard</Link>
      </Button>
    </div>
  )
} 