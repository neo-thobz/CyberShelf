import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import type { CollectionConfig } from 'payload'
import { generateContentSummaryHook } from './hooks/generate-content-summary.hook'
import { generateSlugHook } from './hooks/generate-slug.hook'
import { ARTICLE_STATUS } from '@/shared/constants/article-status'

export const Articles: CollectionConfig = {
    slug: 'articles',
    access: {
    read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            hooks: { beforeValidate: [generateSlugHook] },
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        {
            name: 'contentSummary',
            type: 'textarea',
            required: true,
            hooks: { beforeValidate: [generateContentSummaryHook] },
        },
        {
            name: 'readTimeInMins',
            type: 'number',
            defaultValue: 0,
            admin: {
                readOnly: true,
            },
            hooks: {
                beforeChange: [
                    ({ siblingData }) => {
                        delete siblingData.readTimeInMins
                    },
                ],
                afterRead: [
                    ({ data }) => {
                        const text = convertLexicalToPlaintext({ data: data?.content })
                        const wordsPerMinute = 200
                        const words = text.trim().split(/\s+/).length
                        return Math.max(1, Math.ceil(words / wordsPerMinute))
                    },
                ],
            },
        },
        {
            name: 'coverImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'article-authors',
            required: true,
        },
        {
            name: 'status',
            type: 'select',
            required: true,
            options: Object.values(ARTICLE_STATUS),
            defaultValue: ARTICLE_STATUS.DRAFT,
        },
        {
            name: 'publishedAt',
            type: 'date',
            required: true,
            admin: {
                condition: (data) => data?.status === ARTICLE_STATUS.PUBLISHED,
                date: { pickerAppearance: 'dayAndTime' },
            },
        },
    ]
}