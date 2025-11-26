"use client"

import Link from "next/link"

export function Hero() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary/10 via-transparent to-transparent">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">Convert Files Instantly</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
          Fast, secure, and free. Convert images, PDFs, videos, and more. Works offline on your device.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/tools"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition inline-flex items-center justify-center gap-2"
          >
            <span className="text-xl">📤</span>
            Start Converting
          </Link>
          <Link
            href="/about"
            className="px-8 py-3 border border-border hover:bg-secondary rounded-lg font-semibold transition"
          >
            Learn More
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-bold text-primary">50+</div>
            <div className="text-muted-foreground">Conversions</div>
          </div>
          <div>
            <div className="font-bold text-primary">100% Free</div>
            <div className="text-muted-foreground">No limits</div>
          </div>
          <div>
            <div className="font-bold text-primary">Offline</div>
            <div className="text-muted-foreground">Privacy first</div>
          </div>
        </div>
      </div>
    </section>
  )
}
