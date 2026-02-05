import type { CollectionConfig } from 'payload'
import { CONTACT_SUBMISSION_STATUS_OPTIONS } from './constants'

export const ContactSubmissions: CollectionConfig = {
    slug: 'contact-submissions',
    admin: {
        useAsTitle: 'email',
        defaultColumns: ['firstName', 'lastName', 'email', 'createdAt'],
        group: 'Forms',
        description: 'Contact form submissions',
    },
    fields: [
        {
            name: 'firstName',
            type: 'text',
            required: true,
            maxLength: 50,
        },
        {
            name: 'lastName',
            type: 'text',
            required: true,
            maxLength: 50,
        },
        {
            name: 'email',
            type: 'email',
            required: true,
        },
        {
            name: 'message',
            type: 'textarea',
            maxLength: 1000,
        },
        {
            name: 'marketingConsent',
            type: 'checkbox',
            required: true,
            label: 'Consented to marketing communications',
            defaultValue: false,
        },
        {
            name: 'termsAccepted',
            type: 'checkbox',
            required: true,
            label: 'Accepted Terms & Conditions',
            defaultValue: false,
        },
        {
            name: 'status',
            type: 'select',
            options: Object.values(CONTACT_SUBMISSION_STATUS_OPTIONS),
            defaultValue: CONTACT_SUBMISSION_STATUS_OPTIONS.NEW,
            admin: {
                position: 'sidebar',
                readOnly: false,
            },
        },
    ],
    timestamps: true,
}
