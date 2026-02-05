export const ARTICLE_STATUS = {
    DRAFT: 'draft',
    PUBLISHED: 'published',
} as const

export type ArticleStatus = (typeof ARTICLE_STATUS)[keyof typeof ARTICLE_STATUS]