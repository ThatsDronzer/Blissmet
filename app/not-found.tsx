import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Not Found</h2>
        <p className="mb-4">Could not find the requested vendor</p>
        <Link href="/explore-vendors" className="text-primary hover:underline">
          Return to Explore Vendors
        </Link>
      </div>
    </div>
  )
}

