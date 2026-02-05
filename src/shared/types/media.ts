export interface MediaSize {
  url?: string
  width?: number
  height?: number
}

export interface Media {
  id: number
  url?: string
  alt?: string
  sizes?: {
    thumbnail?: MediaSize
    card?: MediaSize
    hero?: MediaSize
  }
}
