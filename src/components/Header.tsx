import React from 'react';
import { Menu, Instagram, Phone } from 'lucide-react';
import { categories } from '../data/categories';

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-[#f78dca]">
              Jardim das Maravilhas
            </h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.slug}`}
                className="text-gray-600 hover:text-[#ff66c4] px-3 py-2 rounded-md text-sm font-medium"
              >
                {category.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <a
              href="https://www.instagram.com/floricultura_jardim_maravilhas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#ff66c4]"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://wa.me/5567998006714"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#ff66c4]"
            >
              <Phone className="h-6 w-6" />
            </a>
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.slug}`}
                className="text-gray-600 hover:text-[#ff66c4] block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}