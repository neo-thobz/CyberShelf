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
      className={`flex flex-col items-center justify-center text-center py-16 sm:py-20 px-4 ${className}`}
    >
      {imageSrc && (
        <div className="mb-6 w-48 h-48 sm:w-64 sm:h-64 relative opacity-70">
          <Image
            src={imageSrc}
            alt="No data illustration"
            fill
            className="object-contain"
          />
        </div>
      )}
      <p className="text-lg sm:text-xl text-muted-foreground">{message}</p>
    </div>
  )
}
