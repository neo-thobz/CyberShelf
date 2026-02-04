interface NoDataPlaceholderProps {
  message: string
  className?: string
}

export default function NoDataPlaceholder({
  message,
  className = '',
}: NoDataPlaceholderProps) {
  return (
    <div className={`text-center text-gray-500 py-16 ${className}`}>
      <p className="text-xl">{message}</p>
    </div>
  )
}
