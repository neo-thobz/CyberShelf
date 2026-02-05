'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 border border-border transition-all duration-200"
    >
      <ArrowLeft size={18} />
      <span className="text-sm">Back</span>
    </button>
  )
}
