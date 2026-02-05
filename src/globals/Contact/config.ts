import { GlobalConfig } from 'payload'
import { addressField } from './types/address.field'
import { validatePhone } from '@/utils/validators'

export const ContactUsGlobal: GlobalConfig = {
    slug: 'about',
    label: 'Contact Us Page Content',
    fields: [
        {
            name: 'email',
            type: 'email',
            required: true,
        },
        {
            name: 'phone',
            type: 'text',
            label: 'Phone Number',
            admin: {
                placeholder: '+27 82 123 4567',
                description: 'Include country code (e.g. +27)',
            },
            validate: validatePhone,
        },
        addressField,
    ],
}