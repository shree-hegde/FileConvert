"use client"

import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Sorry, the page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-3 font-semibold hover:opacity-90 transition"
          >
            Back to Home
          </Link>
          <Link
            href="/tools"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-background text-foreground px-6 py-3 font-semibold hover:bg-secondary transition"
          >
            View All Tools
          </Link>
        </div>
      </div>
    </div>
  )
}
