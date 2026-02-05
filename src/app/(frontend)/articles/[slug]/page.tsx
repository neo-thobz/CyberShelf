import Image from 'next/image'
import { Calendar, User, Clock } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getArticle } from '@/app/(frontend)/services/api'
import RichText from '../../components/RichText'
import BackButton from '@/app/(frontend)/components/BackButton'

interface Author {
  firstName?: string
  lastName?: string
  email?: string
}

interface ImageType {
  url: string
  alt?: string
  sizes?: {
    hero?: { url: string }
    card?: { url: string }
  }
}

interface Article {
  title: string
  content: any
  contentSummary?: string
  author?: Author | null
  publishedAt?: string
  readTimeInMins?: number
  coverImage?: ImageType | null
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = await params

  const article: Article | null = await getArticle(slug)

  if (!article) {
    notFound()
  }

  const authorName =
    article.author?.firstName || article.author?.lastName
      ? `${article.author.firstName ?? ''} ${article.author.lastName ?? ''}`.trim()
      : article.author?.email ?? 'Unknown author'

  const coverImageUrl =
    article.coverImage?.sizes?.hero?.url ?? article.coverImage?.url

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <BackButton />
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        {/* Header */}
        <header className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-6 text-balance leading-tight">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User size={18} className="text-muted-foreground/70" />
              <span>{authorName}</span>
            </div>

            {article.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-muted-foreground/70" />
                <span>
                  {new Date(article.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            )}

            {article.readTimeInMins && (
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-muted-foreground/70" />
                <span>{article.readTimeInMins} min read</span>
              </div>
            )}
          </div>
        </header>

        {/* Cover Image */}
        {coverImageUrl && (
          <div className="relative aspect-video sm:aspect-[2/1] mb-8 sm:mb-12 rounded-xl overflow-hidden border border-border">
            <Image
              src={coverImageUrl}
              alt={article.coverImage?.alt ?? article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {article.contentSummary && (
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed border-l-2 border-accent pl-4 sm:pl-6">
              {article.contentSummary}
            </p>
          )}
          <RichText content={article.content} />
        </div>
      </article>
    </div>
  )
}
