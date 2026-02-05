import ImageCarousel from '@/app/(frontend)/components/ImageCarousel'
import ArticleCard from '@/app/(frontend)/components/ArticleCard'
import NoDataPlaceholder from '@/app/(frontend)/components/NoDataPlaceholder'
import { fetchCarouselImages } from '@/app/(frontend)/services/api'
import { getPublishedArticles } from '@/collections/Articles/fetchers'

export default async function Home() {
  const [carouselImages, articles] = await Promise.all([
    fetchCarouselImages(),
    getPublishedArticles(),
  ])

  return (
    <div className="min-h-screen">
      {/* Hero/Carousel Section */}
      {carouselImages.length === 0 ? (
        <NoDataPlaceholder 
          message="No carousel images yet."
          imageSrc='/images/no_sliders.jpg' 
        />
      ) : (
        <ImageCarousel images={carouselImages} />
      )}

      {/* Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-xs sm:text-sm tracking-widest uppercase text-muted-foreground mb-4">
            Explore
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4 text-balance">
            Latest Articles
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore our newest insights and stories on technology, business, and design.
          </p>
        </div>

        {articles.length === 0 ? (
          <NoDataPlaceholder 
            message="No articles published yet. Check back soon!" 
            imageSrc='/images/no_articles.jpg'
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {articles.map((article: any) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                excerpt={article.contentSummary}
                slug={article.slug}
                coverImage={article.coverImage}
                author={article.author}
                publishedDate={article.publishedAt}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
