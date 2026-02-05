import Image from 'next/image'

interface NoDataPlaceholderProps {
  message: string
  imageSrc?: string
  className?: string
}

export default function NoDataPlaceholder({
  message,
  imageSrc,
  className = '',
}: NoDataPlaceholderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center text-gray-500 py-16 ${className}`}
    >
      {imageSrc && (
        <div className="mb-6 w-64 h-64 relative">
          <Image
            src={imageSrc}
            alt="No data illustration"
            fill
            className="object-contain"
          />
        </div>
      )}
      <p className="text-xl">{message}</p>
    </div>
  )
}
