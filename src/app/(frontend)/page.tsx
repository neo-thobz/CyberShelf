import ImageCarousel from '@/app/(frontend)/components/ImageCarousel'
import ArticleCard from '@/app/(frontend)/components/ArticleCard'
import NoDataPlaceholder from '@/app/(frontend)/components/NoDataPlaceholder'
import { fetchCarouselImages, fetchArticles } from '@/app/(frontend)/services/api'

export default async function Home() {
  const [carouselImages, articles] = await Promise.all([
    fetchCarouselImages(),
    fetchArticles(),
  ])

  return (
    <main>
      {carouselImages.length === 0 ? (
        <NoDataPlaceholder message="No carousel images yet." />
      ) : (
        <ImageCarousel images={carouselImages} />
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Latest Articles
          </h2>
          <p className="text-xl text-gray-600">
            Explore our newest insights and stories
          </p>
        </div>

        {articles.length === 0 ? (
          <NoDataPlaceholder message="No articles published yet. Check back soon!" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </main>
  )
}
