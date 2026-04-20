"use client"

import { Error as ErrorComponent } from "@/components/error"
import { useEffect } from "react"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <ErrorComponent
      message="Something went wrong while loading the venture details."
      onRetry={reset}
    />
  )
} 