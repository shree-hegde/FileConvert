export interface SchemaProps {
  type: string
  [key: string]: any
}

export function generateFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateSoftwareApplicationSchema(app: {
  name: string
  description: string
  url: string
  rating?: number
  reviewCount?: number
  applicationCategory?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.description,
    url: app.url,
    applicationCategory: app.applicationCategory || "Utility",
    ...(app.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: app.rating,
        reviewCount: app.reviewCount,
      },
    }),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }
}

export function generateArticleSchema(article: {
  headline: string
  description: string
  image?: string
  datePublished: string
  dateModified: string
  author: string
  articleBody?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    ...(article.articleBody && { articleBody: article.articleBody }),
  }
}

export function generateProductSchema(product: {
  name: string
  description: string
  url: string
  image?: string
  rating?: number
  reviewCount?: number
  price?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url: product.url,
    image: product.image,
    ...(product.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewCount,
      },
    }),
    ...(product.price && {
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "USD",
      },
    }),
  }
}

export function generateLocalBusinessSchema(business: {
  name: string
  description: string
  url: string
  telephone?: string
  email?: string
  address?: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
  }
  sameAs?: string[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description,
    url: business.url,
    telephone: business.telephone,
    email: business.email,
    ...(business.address && { address: business.address }),
    ...(business.sameAs && { sameAs: business.sameAs }),
  }
}
