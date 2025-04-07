import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"

export default function FavoritesEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-white max-w-md mx-auto my-10">
      <div className="bg-[#F3FFEE] p-4 rounded-full mb-6">
        <FontAwesomeIcon icon={faHeart} className="w-6 h-8 text-rose-500" />
      </div>

      <h1 className="text-xl md:text-2xl font-medium text-gray-800 mb-3 text-center">No favorites yet</h1>

      <p className="text-sm md:text-base text-gray-500 mb-6 text-center">
        You&apos;ll find your favorite restaurants and stores here. Add favorites by tapping the heart icon.
      </p>

      <Link
        href="/store"
        className="inline-flex items-center justify-center px-6 py-3 bg-[#F3FFEE]  text-black hover:text-white font-medium rounded-full transition-colors hover:bg-[#5AC12F] focus:outline-none focus:ring-2 focus:ring-[#5AC12F] focus:ring-offset-2"
      >
        Explore Store
      </Link>
    </div>
  )
}