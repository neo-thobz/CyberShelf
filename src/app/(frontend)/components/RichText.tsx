import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'

export default function RichText({ content }: { content: any }) {
  if (!content) return null

  return (
    <LexicalRichText
      data={content}
      className="prose prose-slate max-w-none"
    />
  )
}
