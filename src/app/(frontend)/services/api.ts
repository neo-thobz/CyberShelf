import { ARTICLE_STATUS } from "@/shared/constants/article-status"
import { Address } from "@/shared/types/Address.model"

export async function fetchCarouselImages(limit = 5) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/carousel-images?limit=${limit}&sort=order`,
      { next: { revalidate: 60 } }
    )

    if (!res.ok) {
      return []
    }

    const data = await res.json()
    return data.docs ?? []
  } catch (err) {
    return []
  }
}

export async function fetchArticles(limit = 5) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/articles?where[status][equals]=${ARTICLE_STATUS.PUBLISHED}&limit=${limit}&sort=-publishedAt&depth=2`,
      { next: { revalidate: 60 } }
    )

    if (!res.ok) {
      return []
    }

    const data = await res.json()
    return data.docs ?? []
  } catch (err) {
    return []
  }
}

export async function getArticle(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/articles?where[slug][equals]=${slug}&where[status][equals]=${ARTICLE_STATUS.PUBLISHED}&depth=2`,
    { next: { revalidate: 60 } }
  )

  if (!res.ok) {
    return null
  }

  const data = await res.json()
  return data.docs?.[0] ?? null
}

interface ContactGlobal {
  email?: string
  phone?: string
  address?: Address
}

export async function getContactInfo(): Promise<ContactGlobal | null>  {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/contact`,
      { next: { revalidate: 60 } }
    )

    if (!res.ok) return null

    const data = await res.json()
    return data ?? null
  } catch (err) {
    return null
  }
}
