import React from 'react';
import { Menu, Instagram, Phone, X } from 'lucide-react';
import { categories } from '../data/categories';

export function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-[#f78dca]">
                Jardim das Maravilhas
              </h1>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <nav className="flex space-x-4">
                {categories.slice(0, 5).map((category) => (
                  <a
                    key={category.id}
                    href={`#${category.slug}`}
                    className="text-gray-600 hover:text-[#ff66c4] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {category.name}
                  </a>
                ))}
                {categories.length > 5 && (
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="text-gray-600 hover:text-[#ff66c4] px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Ver Mais
                  </button>
                )}
              </nav>
              
              <div className="flex items-center space-x-4 border-l pl-4 border-gray-200">
                <a
                  href="https://www.instagram.com/floricultura_jardim_maravilhas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#ff66c4] transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="https://wa.me/5567998006714"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#ff66c4] transition-colors"
                >
                  <Phone className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="text-gray-600 hover:text-[#ff66c4] transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl z-50 transform transition-transform">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-600 hover:text-[#ff66c4] transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="px-4 py-6 space-y-2 overflow-y-auto max-h-[calc(100vh-5rem)]">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.slug}`}
                  className="block px-4 py-3 text-gray-600 hover:text-[#ff66c4] hover:bg-pink-50 rounded-lg transition-colors"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {category.name}
                </a>
              ))}
            </nav>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
              <div className="flex justify-center space-x-6">
                <a
                  href="https://www.instagram.com/floricultura_jardim_maravilhas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#ff66c4] transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="https://wa.me/5567998006714"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#ff66c4] transition-colors"
                >
                  <Phone className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}