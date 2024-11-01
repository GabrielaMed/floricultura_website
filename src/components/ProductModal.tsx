import React from 'react';
import { X, ChevronLeft, ChevronRight, MessageCircle, Instagram } from 'lucide-react';
import type { Product } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Olá! Vi esse produto no site e gostaria de mais informações. Ele está disponível? Qual o valor?\n\n${product.images[currentImageIndex]}`
    );
    window.open(`https://wa.me/5567998006714?text=${message}`, '_blank');
  };

  const handleInstagramClick = () => {
    window.open(product.permalink, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="grid md:grid-cols-2 h-full">
          <div className="relative aspect-square">
            <img
              src={product.thumbnail_url || product.images[currentImageIndex]}
              alt=""
              className="w-full h-full object-cover"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex((i) => (i === 0 ? product.images.length - 1 : i - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex((i) => (i === product.images.length - 1 ? 0 : i + 1))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
          <div className="p-6 flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <p className="text-gray-700 whitespace-pre-wrap">
                {product.caption.length > 130 ? `${product.caption.slice(0, 100)}...` : product.caption}
              </p>
            </div>
            <button
              onClick={handleWhatsAppClick}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-[#ff66c4] text-white px-4 py-3 rounded-lg hover:bg-[#fb7ac7] transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Solicitar informações
            </button>
            <button
              onClick={handleInstagramClick}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-[#E1306C] text-white px-4 py-3 rounded-lg hover:bg-[#fb7ac7] transition-colors"
            >
              <Instagram className="h-5 w-5" />
              Ver no Instagram
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
