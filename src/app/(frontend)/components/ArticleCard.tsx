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
      <article className="bg-card border border-border rounded-xl overflow-hidden hover:border-muted-foreground/30 transition-all duration-300 h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 sm:h-52 overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Content */}
        <div className="p-5 sm:p-6 flex flex-col flex-1">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2 text-balance">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base mb-4 line-clamp-3 flex-1 leading-relaxed">
            {excerpt}
          </p>
          
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground pt-4 border-t border-border">
            <div className="flex items-center gap-1.5">
              <User size={14} className="text-muted-foreground/70" />
              <span>{author?.name ?? 'Unknown Author'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-muted-foreground/70" />
              <span>{new Date(publishedDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
