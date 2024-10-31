import React from 'react';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative h-[80vh] flex items-center justify-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1502977249166-824b3a8a4d6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8a7d6]/30 to-white/90" />
      </div>
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Floricultura Jardim das Maravilhas
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Transformando momentos especiais com a beleza das flores
        </p>
        <a
          href="#buques"
          className="inline-flex items-center gap-2 bg-[#ff66c4] text-white px-8 py-3 rounded-full hover:bg-[#fb7ac7] transition-colors"
        >
          Ver Catálogo
          <ArrowDown className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}