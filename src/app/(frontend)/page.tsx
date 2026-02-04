import ImageCarousel from '@/app/(frontend)/components/ImageCarousel'
import ArticleCard from '@/app/(frontend)/components/ArticleCard'

function NoDataPlaceholder({ message }: { message: string }) {
  return (
    <div className="text-center text-gray-500 py-16">
      <p className="text-xl">{message}</p>
    </div>
  )
}

async function getCarouselImages() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/carousel-images?limit=5&sort=order`,
      { next: { revalidate: 60 } }
    )
    if (!res.ok) return []
    const data = await res.json()
    return data.docs ?? []
  } catch (err) {
    console.error('Error fetching carousel images:', err)
    return []
  }
}

async function getArticles() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/articles?where[status][equals]=published&limit=6&sort=-publishedAt&depth=2`,
      { next: { revalidate: 60 } }
    )
    if (!res.ok) return []
    const data = await res.json()
    return data.docs ?? []
  } catch (err) {
    console.error('Error fetching articles:', err)
    return []
  }
}

export default async function Home() {
  const [carouselImages, articles] = await Promise.all([
    getCarouselImages(),
    getArticles(),
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
