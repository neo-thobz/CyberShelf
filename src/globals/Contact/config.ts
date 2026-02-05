import { GlobalConfig } from 'payload'
import { addressField } from './types/address.field'
import { validatePhone } from '@/utils/validators'

export const ContactUsGlobal: GlobalConfig = {
    slug: 'contact',
    label: 'Contact Us Page Content',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'email',
            type: 'email',
            required: true,
            admin: {
                placeholder: 'example@mail.com',
            },
        },
        {
            name: 'phone',
            type: 'text',
            label: 'Phone Number',
            required: true,
            admin: {
                placeholder: '+27 82 123 4567',
            },
            validate: validatePhone,
        },
        addressField,
    ],
}