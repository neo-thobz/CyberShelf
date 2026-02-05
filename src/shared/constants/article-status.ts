export const ARTICLE_STATUS = {
    DRAFT: 'Draft',
    PUBLISHED: 'Published',
} as const

export type ArticleStatus = (typeof ARTICLE_STATUS)[keyof typeof ARTICLE_STATUS]