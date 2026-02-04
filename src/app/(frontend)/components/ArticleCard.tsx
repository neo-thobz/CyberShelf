import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User } from 'lucide-react'

interface Author {
  id: string
  name: string
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
    <Link href={`/articles/${slug}`} className="group">
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-display font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <div className="flex items-center">
              <User size={16} className="mr-1" />
              <span>{author?.name ?? 'Unknown Author'}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>{new Date(publishedDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
