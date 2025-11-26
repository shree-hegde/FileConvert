"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-destructive mb-4">⚠️</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Something Went Wrong</h2>
        <p className="text-muted-foreground mb-2">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        {error.digest && <p className="text-sm text-muted-foreground mb-8">Error ID: {error.digest}</p>}
        <div className="flex flex-col gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-3 font-semibold hover:opacity-90 transition"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-background text-foreground px-6 py-3 font-semibold hover:bg-secondary transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
