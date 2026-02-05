import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { ARTICLE_STATUS } from '@/shared/constants/article-status'
import { ARTICLE_AUTHOR_ROLE_OPTIONS } from '@/collections/ArticleAuthors/constants'

const sampleAuthors = [
  { name: 'Alex Chen', role: ARTICLE_AUTHOR_ROLE_OPTIONS.EDITOR },
  { name: 'Sarah Mitchell', role: ARTICLE_AUTHOR_ROLE_OPTIONS.STAFF_WRITER },
  { name: 'James Rodriguez', role: ARTICLE_AUTHOR_ROLE_OPTIONS.CONTRIBUTOR },
]

const createRichText = (text: string) => ({
  root: {
    type: 'root',
    version: 1,
    children: [
      {
        type: 'paragraph',
        version: 1,
        children: [
          {
            type: 'text',
            text,
            version: 1,
          },
        ],
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

const sampleArticles = [
  {
    title: 'Getting Started with Next.js 15',
    content: createRichText(
      'Next.js 15 brings exciting new features that revolutionize how we build web applications. From improved performance to better developer experience, this release marks a significant milestone in the React ecosystem.'
    ),
    contentSummary:
      'Next.js 15 introduces new features, better performance, and improved developer experience.',
    status: ARTICLE_STATUS.PUBLISHED,
    publishedAt: new Date().toISOString(),
  },
  {
    title: 'Modern CSS Techniques for 2024',
    content: createRichText(
      'CSS has evolved dramatically. Container queries, cascade layers, and the :has() selector make responsive and maintainable stylesheets easier.'
    ),
    contentSummary: 'Modern CSS techniques including container queries and :has() selector.',
    status: ARTICLE_STATUS.PUBLISHED,
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    title: 'Building Accessible Web Applications',
    content: createRichText(
      'Web accessibility ensures digital experiences can be used by everyone. WCAG guidelines help implement inclusive design.'
    ),
    contentSummary: 'Creating accessible web apps using WCAG guidelines.',
    status: ARTICLE_STATUS.PUBLISHED,
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    title: 'Introduction to TypeScript Generics',
    content: createRichText(
      'TypeScript generics allow you to write reusable, type-safe code. Functions and classes can work with multiple types while maintaining type information.'
    ),
    contentSummary: 'Learn the basics of TypeScript generics and type-safe code.',
    status: ARTICLE_STATUS.DRAFT,
  },
]

// Placeholder images
const PLACEHOLDER_IMAGE_URL =
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=800&fit=crop'
const AVATAR_IMAGE_URL =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'

async function seed() {
  console.log('Starting seed process...')
  const payload = await getPayload({ config })

  try {
    // Media
    console.log('Creating media assets...')
    const coverImageBuffer = Buffer.from(await (await fetch(PLACEHOLDER_IMAGE_URL)).arrayBuffer())
    const coverImage = await payload.create({
      collection: 'media',
      data: { alt: 'Article cover image' },
      file: {
        data: coverImageBuffer,
        name: 'cover-image.jpg',
        mimetype: 'image/jpeg',
        size: coverImageBuffer.length,
      },
    })

    const avatarBuffer = Buffer.from(await (await fetch(AVATAR_IMAGE_URL)).arrayBuffer())
    const avatarImage = await payload.create({
      collection: 'media',
      data: { alt: 'Author avatar' },
      file: {
        data: avatarBuffer,
        name: 'avatar.jpg',
        mimetype: 'image/jpeg',
        size: avatarBuffer.length,
      },
    })

    // Authors
    console.log('Creating authors...')
    const createdAuthors = []

    for (const author of sampleAuthors) {
      const existing = await payload.find({
        collection: 'article-authors',
        where: { name: { equals: author.name } },
        limit: 1,
      })
      if (existing.docs.length > 0) {
        createdAuthors.push(existing.docs[0])
        continue
      }
      const newAuthor = await payload.create({
        collection: 'article-authors',
        data: { ...author, avatar: avatarImage.id },
      })
      createdAuthors.push(newAuthor)
    }

    // Articles
    console.log('Creating articles...')
    for (let i = 0; i < sampleArticles.length; i++) {
      const article = sampleArticles[i]
      const author = createdAuthors[i % createdAuthors.length]

      const existing = await payload.find({
        collection: 'articles',
        where: { title: { equals: article.title } },
        limit: 1,
      })
      if (existing.docs.length > 0) continue

      await payload.create({
        collection: 'articles',
        data: {
          ...article,
          author: author.id,
          coverImage: coverImage.id,
        },
      })
      console.log(`Created article: ${article.title}`)
    }

    console.log('Seed completed successfully!')
  } catch (error) {
    console.error('Seed failed:', error)
    process.exit(1)
  }

  process.exit(0)
}

seed()
