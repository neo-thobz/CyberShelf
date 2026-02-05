import { PHONE_REGEX, POSTAL_CODE_REGEX } from './regex'


export type ValidatorValue = string | null | undefined

export const validatePhone = (value: ValidatorValue): true | string => {
  if (!value) return true
  return PHONE_REGEX.test(value) || 'Please enter a valid phone number'
}

export const validatePostalCode = (value: ValidatorValue, regex = POSTAL_CODE_REGEX): true | string => {
  if (!value) return true
  return regex.test(value) || 'Invalid postal code'
}
