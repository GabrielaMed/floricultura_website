import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { categories } from './data/categories';
import type { Product } from './types';
import { ProductModal } from './components/ProductModal';
import { useInstagramPosts } from './hooks/useInstagram';

const queryClient = new QueryClient();

function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {categories.map((category) => {
        const {
          data: products,
          isLoading,
          isError,
        } = useInstagramPosts(category.slug);

        return (
          <section key={category.id} id={category.slug} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              {category.name}
            </h2>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-200 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : isError ? (
              <p className="text-red-500 text-center py-8">
                Ocorreu um erro ao carregar os produtos.
              </p>
            ) : products?.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                  >
                    <img
                      src={product.images[0]} // Ensure that product.images is an array with valid URLs
                      alt={product.name || 'Product Image'}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                Nenhum produto encontrado nesta categoria.
              </p>
            )}
          </section>
        );
      })}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </main>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white">
        <Header />
        <Hero />
        <ProductGrid />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
