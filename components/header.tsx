"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggleTheme = () => {
    if (!mounted) return
    const isDarkMode = document.documentElement.classList.toggle("dark")
    localStorage.theme = isDarkMode ? "dark" : "light"
    setIsDark(isDarkMode)
  }

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-primary-foreground font-bold text-sm">
            FC
          </div>
          <span className="text-xl font-bold hidden sm:inline">FileConvert</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/tools" className="hover:text-primary transition">
            Tools
          </Link>
          <Link href="/about" className="hover:text-primary transition">
            About
          </Link>
          <Link href="/blog" className="hover:text-primary transition">
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-secondary rounded transition text-xl"
            aria-label="Toggle theme"
          >
            {mounted && (isDark ? "☀️" : "🌙")}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-secondary rounded transition text-2xl"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="md:hidden px-4 py-4 border-t border-border flex flex-col gap-3">
          <Link href="/tools" className="hover:text-primary transition">
            Tools
          </Link>
          <Link href="/about" className="hover:text-primary transition">
            About
          </Link>
          <Link href="/blog" className="hover:text-primary transition">
            Blog
          </Link>
        </nav>
      )}
    </header>
  )
}
