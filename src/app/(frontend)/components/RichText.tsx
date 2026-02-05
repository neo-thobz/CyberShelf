import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'

export default function RichText({ content }: { content: any }) {
  if (!content) return null

  return (
    <LexicalRichText
      data={content}
      className="prose prose-invert prose-lg max-w-none 
        prose-headings:text-foreground prose-headings:font-semibold
        prose-p:text-muted-foreground prose-p:leading-relaxed
        prose-a:text-accent prose-a:no-underline hover:prose-a:underline
        prose-strong:text-foreground
        prose-code:text-foreground prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-muted prose-pre:border prose-pre:border-border
        prose-blockquote:border-l-accent prose-blockquote:text-muted-foreground
        prose-li:text-muted-foreground
        prose-hr:border-border"
    />
  )
}
