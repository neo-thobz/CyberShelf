import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { ARTICLE_STATUS } from '@/shared/constants/article-status'
import { ARTICLE_AUTHOR_ROLE_OPTIONS } from '@/collections/ArticleAuthors/constants'

const sampleAuthors = [
  {
    name: 'Alex Chen',
    role: ARTICLE_AUTHOR_ROLE_OPTIONS.EDITOR,
  },
  {
    name: 'Sarah Mitchell',
    role: ARTICLE_AUTHOR_ROLE_OPTIONS.STAFF_WRITER,
  },
  {
    name: 'James Rodriguez',
    role: ARTICLE_AUTHOR_ROLE_OPTIONS.CONTRIBUTOR,
  },
]

const sampleArticles = [
  {
    title: 'Getting Started with Next.js 15',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Next.js 15 brings exciting new features that revolutionize how we build web applications. From improved performance to better developer experience, this release marks a significant milestone in the React ecosystem.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Key Features' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The App Router has been further optimized with better caching strategies and improved streaming capabilities. Server Components are now more powerful than ever, allowing for seamless data fetching and rendering.' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Additionally, the new Turbopack bundler is now stable, offering significantly faster build times compared to webpack. This means faster development cycles and quicker deployments.' }],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
      },
    },
    status: ARTICLE_STATUS.PUBLISHED,
    publishedAt: new Date().toISOString(),
  },
  {
    title: 'Modern CSS Techniques for 2024',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'CSS has evolved dramatically over the past few years. With new features like container queries, cascade layers, and the :has() selector, building responsive and maintainable stylesheets has never been easier.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Container Queries' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Container queries allow components to adapt based on their parent container size rather than the viewport. This enables truly modular and reusable components that work in any context.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'The :has() Selector' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Often called the "parent selector", :has() finally gives us the ability to style elements based on their descendants. This opens up new possibilities for styling complex UI patterns without JavaScript.' }],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
      },
    },
    status: ARTICLE_STATUS.PUBLISHED,
    publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    title: 'Building Accessible Web Applications',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Web accessibility is not just a nice-to-have feature—it is essential for creating inclusive digital experiences. Understanding WCAG guidelines and implementing them correctly ensures your applications can be used by everyone.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Semantic HTML' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The foundation of accessibility starts with proper HTML semantics. Using the right elements for navigation, headings, and interactive components provides built-in accessibility benefits.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Keyboard Navigation' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Ensuring all interactive elements are keyboard accessible is crucial. Focus management, visible focus indicators, and logical tab order make navigation possible without a mouse.' }],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
      },
    },
    status: ARTICLE_STATUS.PUBLISHED,
    publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
  {
    title: 'Introduction to TypeScript Generics',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'TypeScript generics are one of the most powerful features for creating reusable, type-safe code. They allow you to write functions and classes that work with multiple types while maintaining full type information.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Basic Generic Functions' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'A generic function uses type parameters to capture the types of arguments and return values. This ensures type safety without sacrificing flexibility or requiring type assertions.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Generic Constraints' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Sometimes you need to restrict what types can be used with a generic. Constraints let you specify that a type parameter must have certain properties or extend a particular type.' }],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
      },
    },
    status: ARTICLE_STATUS.DRAFT,
  },
]

// Placeholder image URL for seeding
const PLACEHOLDER_IMAGE_URL = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=800&fit=crop'
const AVATAR_IMAGE_URL = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'

async function seed() {
  console.log('Starting seed process...')
  
  const payload = await getPayload({ config })

  try {
    // Create placeholder media for cover images and avatars
    console.log('Creating media assets...')
    
    const coverImageResponse = await fetch(PLACEHOLDER_IMAGE_URL)
    const coverImageBuffer = Buffer.from(await coverImageResponse.arrayBuffer())
    
    const coverImage = await payload.create({
      collection: 'media',
      data: {
        alt: 'Article cover image',
      },
      file: {
        data: coverImageBuffer,
        name: 'cover-image.jpg',
        mimetype: 'image/jpeg',
        size: coverImageBuffer.length,
      },
    })

    const avatarResponse = await fetch(AVATAR_IMAGE_URL)
    const avatarBuffer = Buffer.from(await avatarResponse.arrayBuffer())
    
    const avatarImage = await payload.create({
      collection: 'media',
      data: {
        alt: 'Author avatar',
      },
      file: {
        data: avatarBuffer,
        name: 'avatar.jpg',
        mimetype: 'image/jpeg',
        size: avatarBuffer.length,
      },
    })

    // Create authors
    console.log('Creating authors...')
    const createdAuthors = []
    
    for (const author of sampleAuthors) {
      const existingAuthor = await payload.find({
        collection: 'article-authors',
        where: { name: { equals: author.name } },
        limit: 1,
      })

      if (existingAuthor.docs.length > 0) {
        console.log(`Author "${author.name}" already exists, skipping...`)
        createdAuthors.push(existingAuthor.docs[0])
      } else {
        const newAuthor = await payload.create({
          collection: 'article-authors',
          data: {
            ...author,
            avatar: avatarImage.id,
          },
        })
        createdAuthors.push(newAuthor)
        console.log(`Created author: ${author.name}`)
      }
    }

    // Create articles
    console.log('Creating articles...')
    
    for (let i = 0; i < sampleArticles.length; i++) {
      const article = sampleArticles[i]
      const author = createdAuthors[i % createdAuthors.length]

      const existingArticle = await payload.find({
        collection: 'articles',
        where: { title: { equals: article.title } },
        limit: 1,
      })

      if (existingArticle.docs.length > 0) {
        console.log(`Article "${article.title}" already exists, skipping...`)
        continue
      }

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
