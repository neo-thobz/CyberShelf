import { ZA_POSTAL_CODE_REGEX } from '@/utils/regex'
import { validatePostalCode, ValidatorValue } from '@/utils/validators'
import type { Field } from 'payload'

export const addressField: Field = {
  name: 'address',
  type: 'group',
  label: 'Address',
  fields: [
    {
      name: 'line1',
      type: 'text',
      label: 'Street Address',
      required: true,
      admin: {
        placeholder: '123 Main Street',
      },
    },
    {
      name: 'line2',
      type: 'text',
      label: 'Apartment / Unit (optional)',
      admin: {
        placeholder: 'Apartment, suite, unit, etc.',
      },
    },
    {
      name: 'city',
      type: 'text',
      required: true,
    },
    {
      name: 'state',
      type: 'text',
      label: 'Province / State',
      required: true,
    },
    {
      name: 'postalCode',
      type: 'text',
      label: 'Postal Code',
      required: true,
      validate: (value : ValidatorValue) => validatePostalCode(value, ZA_POSTAL_CODE_REGEX),
    },
    {
      name: 'country',
      type: 'text',
      required: true,
      defaultValue: 'ZA',
    },
  ],
}
