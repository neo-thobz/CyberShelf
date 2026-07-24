import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User } from 'lucide-react'

interface Author {
  id: string
  name: string
  role?: string
  avatar?: {
    url: string
    alt?: string
  }
}

interface CoverImage {
  url: string
  alt?: string
  sizes?: {
    thumbnail?: { url: string }
    card?: { url: string }
    hero?: { url: string }
  }
}

interface ArticleCardProps {
  title: string
  excerpt: string
  slug: string
  coverImage: CoverImage
  author: Author
  publishedDate: string
}

export default function ArticleCard({
  title,
  excerpt,
  slug,
  coverImage,
  author,
  publishedDate,
}: ArticleCardProps) {

  const imageUrl =
    coverImage?.sizes?.card?.url ??
    coverImage?.url ??
    '/placeholder-image.jpg'

  const imageAlt = coverImage?.alt ?? title

  return (
    <Link href={`/articles/${slug}`} className="group block">
      <article className="border border-border bg-card overflow-hidden transition-all duration-300 hover:border-accent/50 h-full flex flex-col">
        {/* Image */}
        <div className="relative h-44 sm:h-48 overflow-hidden flex-shrink-0">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
          {/* Cyber corner accent */}
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ borderColor: 'var(--color-cyber)' }} />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-mono text-base sm:text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-200 line-clamp-2 uppercase tracking-wide">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1 leading-relaxed font-sans">
            {excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-border font-mono tracking-wider">
            <div className="flex items-center gap-1.5">
              <User size={12} style={{ color: 'var(--color-cyber)' }} />
              <span>{author?.name ?? 'Unknown Author'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={12} style={{ color: 'var(--color-cyber)' }} />
              <span>{new Date(publishedDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
