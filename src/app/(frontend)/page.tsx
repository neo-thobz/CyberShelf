import HeroCarousel from '@/app/(frontend)/components/HeroCarousel'
import ArticleCard from '@/app/(frontend)/components/ArticleCard'
import NoDataPlaceholder from '@/app/(frontend)/components/NoDataPlaceholder'
import { fetchCarouselImages } from '@/app/(frontend)/services/api'
import { getPublishedArticles } from '@/collections/Articles/fetchers'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [carouselImages, articles] = await Promise.all([
    fetchCarouselImages(),
    getPublishedArticles(),
  ])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {carouselImages.length === 0 ? (
        <div className="pt-20">
          <NoDataPlaceholder
            message="No carousel images yet."
            imageSrc='/images/no_sliders.jpg'
          />
        </div>
      ) : (
        <HeroCarousel images={carouselImages as any} />
      )}

      {/* Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
        {/* Section header */}
        <div className="mb-10 sm:mb-14">
          <p className="font-mono text-xs tracking-widest mb-3 uppercase" style={{ color: 'var(--color-cyber)' }}>
            // latest_articles.log
          </p>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground uppercase tracking-wide">
              Latest Articles
            </h2>
            <span className="font-mono text-xs text-muted-foreground tracking-widest">
              {articles.length} ENTRIES FOUND
            </span>
          </div>
          <div className="mt-4 h-px w-full" style={{ backgroundColor: 'var(--color-border)' }} />
        </div>

        {articles.length === 0 ? (
          <NoDataPlaceholder
            message="No articles published yet. Check back soon!"
            imageSrc='/images/no_articles.jpg'
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {articles.map((article: any) => (
              <div key={article.id} className="bg-background">
                <ArticleCard
                  title={article.title}
                  excerpt={article.contentSummary}
                  slug={article.slug}
                  coverImage={article.coverImage}
                  author={article.author}
                  publishedDate={article.publishedAt}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
