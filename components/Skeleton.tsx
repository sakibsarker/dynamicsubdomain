export function HeaderSkeleton() {
  return (
    <header className="bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          </nav>
          <div className="md:hidden w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </header>
  );
}

export function FooterSkeleton() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-16 grid md:grid-cols-4 gap-8">
        <div>
          <div className="w-12 h-12 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex space-x-4 mt-4">
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div>
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse mb-4"></div>
          <ul className="space-y-2">
            {[...Array(4)].map((_, index) => (
              <li key={index}><div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse mb-4"></div>
          <ul className="space-y-2">
            {[...Array(7)].map((_, index) => (
              <li key={index}><div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse mb-4"></div>
          <ul className="space-y-2">
            <li><div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div></li>
            <li><div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div></li>
            <li><div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div></li>
          </ul>
        </div>
      </div>
      <div className="bg-black py-4">
        <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mx-auto"></div>
      </div>
    </footer>
  );
}
