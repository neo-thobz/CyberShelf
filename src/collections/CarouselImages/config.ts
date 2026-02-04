import type { CollectionConfig } from 'payload'

export const CarouselImages: CollectionConfig = {
    slug: 'carousel-images',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'order'],
        group: 'Content',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            admin: {
                description: 'Internal title for this carousel slide',
            },
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
            admin: {
                description: 'Hero image for carousel (recommended: 1920x1080)',
            },
        },
        {
            name: 'caption',
            type: 'text',
            maxLength: 100,
            admin: {
                description: 'Text overlay on the carousel image',
            },
        },
        {
            name: 'link',
            type: 'text',
            admin: {
                description: 'Optional URL to navigate when clicked',
            },
        },
        {
            name: 'order',
            type: 'number',
            required: true,
            defaultValue: 0,
            admin: {
                description: 'Display order (0 = first)',
                step: 1,
            },
        },
        {
            name: 'active',
            type: 'checkbox',
            defaultValue: true,
            admin: {
                description: 'Show this slide in the carousel',
            },
        },
    ],
    timestamps: true,
}