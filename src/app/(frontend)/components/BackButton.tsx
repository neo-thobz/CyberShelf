'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  top?: number // optional prop to adjust distance from top
}

export default function BackButton({ top = 4 }: BackButtonProps) {
  const router = useRouter()

  return (
    <div className={`sticky top-${top} z-50`}>
      <button
        onClick={() => router.back()}
        className="flex items-center text-primary-600 hover:text-primary-800 font-semibold px-4 py-2 rounded-lg bg-white shadow-md hover:shadow-lg transition"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back
      </button>
    </div>
  )
}
