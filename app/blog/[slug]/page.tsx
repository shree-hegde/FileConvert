import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SchemaMarkup } from "@/components/schema-markup"
import { getBlogPost, getRelatedPosts } from "@/lib/blog-posts"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | FileConvert Blog`,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    alternates: {
      canonical: `https://fileconvert.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author],
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(params.slug)

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://fileconvert.com",
    },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SchemaMarkup data={articleSchema} />
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <a href="/" className="hover:text-foreground transition">
              Home
            </a>
            <span>/</span>
            <a href="/blog" className="hover:text-foreground transition">
              Blog
            </a>
            <span>/</span>
            <span>{post.title}</span>
          </nav>

          <article>
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-secondary rounded text-sm">{post.category}</span>
                <span className="text-muted-foreground text-sm">{post.readingTime} min read</span>
              </div>
              <h1 className="text-4xl font-bold mb-3">{post.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground text-sm">
                <span>By {post.author}</span>
                <span>•</span>
                <span>
                  {post.publishedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </span>
              </div>
            </header>

            <div className="prose prose-invert max-w-none mb-8">
              {post.content.split("\n\n").map((paragraph, i) => {
                if (paragraph.startsWith("-")) {
                  const items = paragraph.split("\n").filter((line) => line.startsWith("-"))
                  return (
                    <ul key={i} className="list-disc list-inside space-y-2 text-muted-foreground">
                      {items.map((item, j) => (
                        <li key={j}>{item.replace("-", "").trim()}</li>
                      ))}
                    </ul>
                  )
                }
                return (
                  <p key={i} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                )
              })}
            </div>

            <div className="flex gap-2 mb-8">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${tag}`}
                  className="px-3 py-1 bg-secondary hover:bg-secondary/80 rounded text-sm transition"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </article>

          {relatedPosts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group p-4 border border-border rounded-lg hover:bg-secondary transition"
                  >
                    <h3 className="font-semibold group-hover:text-primary transition mb-2">{relatedPost.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{relatedPost.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
