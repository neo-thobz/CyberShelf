import type { Media } from '@/shared/types/media'

export function isMedia(value: unknown): value is Media {
  return (
    typeof value === 'object' &&
    value !== null &&
    'url' in value
  )
}
