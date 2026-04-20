import Link from "next/link"

export default function NotFound() {
  return (
    <div className="text-center py-8">
      <h2 className="text-2xl font-bold mb-4">Venture Not Found</h2>
      <p className="text-gray-600 mb-4">
        The venture you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Link
        href="/"
        className="text-blue-600 hover:text-blue-800"
      >
        ← Back to Ventures
      </Link>
    </div>
  )
} 