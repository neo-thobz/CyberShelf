import { Address } from "@/shared/types/Address.model"


export function formatAddress(address?: Address | null): string {
  if (!address) return ''

  return [
    address.line1,
    address.line2,
    address.suburb,
    address.city,
    address.province,
    address.postalCode,
    address.country,
  ]
    .filter((part): part is string => Boolean(part?.trim()))
    .join(', ')
}
