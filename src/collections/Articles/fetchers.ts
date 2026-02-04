import { getPayloadClient } from '@/lib/payload/client'
import { STATUS_OPTIONS } from './constants'

export async function getPublishedArticles() {
    const payload = await getPayloadClient()
    try {
        const { docs: articles } = await payload.find({
            collection: 'articles',
            where: { status: { equals: STATUS_OPTIONS.PUBLISHED } },
            select: {
                slug: true,
                title: true,
                contentSummary: true,
                author: true,
                coverImage: true,
                status: true,
                readTimeInMins: true,
                publishedAt: true,
            },
        })
        return articles ?? []
    } catch (error) {
        console.error('Failed to fetch articles', error)
        return []
    }
}

export async function getArticleBySlug(slug: string) {
    const payload = await getPayloadClient()
    try {
        const { docs: articles } = await payload.find({
            collection: 'articles',
            limit: 1,
            where: { slug: { equals: slug } },
        })
        const [firstArticle] = articles ?? []
        return firstArticle ?? null
    } catch (error) {
        console.error('Failed to fetch articles', error)
        return null
    }
}