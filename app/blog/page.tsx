import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { blogPosts } from "@/lib/blog-posts"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - FileConvert | File Conversion Tips & Guides",
  description:
    "Read expert guides on file conversion, image optimization, PDF management, and digital best practices. Learn how to work with files more efficiently.",
  keywords: "blog, file conversion guide, image optimization, pdf guide, file management",
  openGraph: {
    title: "FileConvert Blog - File Conversion Guides & Tips",
    description: "Expert guides on file conversion and digital file management.",
    type: "website",
  },
  alternates: {
    canonical: "https://fileconvert.com/blog",
  },
}

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <a href="/" className="hover:text-foreground transition">
              Home
            </a>
            <span>/</span>
            <span>Blog</span>
          </nav>

          <h1 className="text-4xl font-bold mb-3">FileConvert Blog</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Expert guides on file conversion, optimization, and digital best practices.
          </p>

          <div className="grid grid-cols-1 gap-6">
            {blogPosts.map((post) => (
              <article key={post.id} className="border border-border rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary transition">
                        {post.title}
                      </Link>
                    </h2>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.publishedAt.toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{post.readingTime} min read</span>
                      <span>•</span>
                      <span className="px-2 py-1 bg-secondary rounded text-xs">{post.category}</span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-secondary rounded text-muted-foreground">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary hover:text-primary/80 font-semibold text-sm transition"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
