import { GlobalConfig } from 'payload'

export const AboutGlobal: GlobalConfig = {
    slug: 'about',
    label: 'About Page Content',
    fields: [
        {
            name: 'ourStory',
            type: 'richText',
            required: true,
            label: 'Our Story Content',
        },
    ],
}