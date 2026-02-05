import Image from 'next/image'
import { Calendar, User } from 'lucide-react'
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

// ✅ Next.js App Router Page
export default async function ArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  // Correct usage: await params before using slug
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
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <BackButton />
      <article>
        <header className="mb-8">
          <h1 className="text-5xl font-display font-bold text-gray-900 mb-6">
            {article.title}
          </h1>

          <div className="flex items-center text-gray-600 space-x-6">
            <div className="flex items-center">
              <User size={20} className="mr-2" />
              <span>{authorName}</span>
            </div>

            {article.publishedAt && (
              <div className="flex items-center">
                <Calendar size={20} className="mr-2" />
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
              <span className="text-sm text-gray-500">
                {article.readTimeInMins} min read
              </span>
            )}
          </div>
        </header>

        {coverImageUrl && (
          <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={coverImageUrl}
              alt={article.coverImage?.alt ?? article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            {article.contentSummary ?? article.content.slice(0, 200) + '...'}
          </p>
          <RichText content={article.content} />
        </div>
      </article>
    </main>
  )
}


// import Image from 'next/image'
// import { Calendar, User } from 'lucide-react'
// import { notFound } from 'next/navigation'
// import { getArticle } from '@/app/(frontend)/services/api'
// import RichText from '../../components/RichText'

// export default async function ArticlePage({
//   params,
// }: {
//   params: { slug: string }
// }) {
//   const article = await getArticle(params.slug)

//   if (!article) {
//     notFound()
//   }

//   const authorName =
//     typeof article.author === 'object'
//       ? article.author.name ?? article.author.email
//       : 'Unknown author'

//   const coverImageUrl =
//     article.coverImage?.sizes?.hero?.url ??
//     article.coverImage?.url

//   return (
//     <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//       <article>
//         {/* Header */}
//         <header className="mb-8">
//           <h1 className="text-5xl font-display font-bold text-gray-900 mb-6">
//             {article.title}
//           </h1>

//           <div className="flex items-center text-gray-600 space-x-6">
//             <div className="flex items-center">
//               <User size={20} className="mr-2" />
//               <span>{authorName}</span>
//             </div>

//             {article.publishedAt && (
//               <div className="flex items-center">
//                 <Calendar size={20} className="mr-2" />
//                 <span>
//                   {new Date(article.publishedAt).toLocaleDateString('en-US', {
//                     year: 'numeric',
//                     month: 'long',
//                     day: 'numeric',
//                   })}
//                 </span>
//               </div>
//             )}

//             {article.readTimeInMins && (
//               <span className="text-sm text-gray-500">
//                 {article.readTimeInMins} min read
//               </span>
//             )}
//           </div>
//         </header>

//         {/* Cover Image */}
//         {coverImageUrl && (
//           <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
//             <Image
//               src={coverImageUrl}
//               alt={article.coverImage?.alt ?? article.title}
//               fill
//               className="object-cover"
//               priority
//             />
//           </div>
//         )}

//         {/* Content */}
//         <div className="prose prose-lg max-w-none">
//           <p className="text-xl text-gray-600 mb-8">
//             {article.contentSummary}
//           </p>

//           <RichText content={article.content} />
//         </div>
//       </article>
//     </main>
//   )
// }
