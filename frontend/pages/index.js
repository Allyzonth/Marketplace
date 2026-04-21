import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { fetchProducts } from '@/lib/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError('Gagal memuat produk');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      <Head>
        <title>MarketPlace - Belanja Online Terpercaya</title>
        <meta name="description" content="Belanja produk favorit Anda dengan harga terbaik" />
      </Head>

      <Header />

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              🏪 Selamat Datang di MarketPlace
            </h1>
            <p className="text-lg sm:text-xl text-blue-100">
              Belanja produk berkualitas dengan harga terbaik dan pengiriman cepat
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="mb-8">
            <input
              type="text"
              placeholder="🔍 Cari produk impian Anda..."
              value={search}
              onChange={handleSearch}
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 text-lg shadow-lg transition-all duration-300"
            />
          </div>

          {error && (
            <div className="bg-red-100 border-2 border-red-400 text-red-700 px-6 py-4 rounded-lg mb-8 font-medium">
              ⚠️ {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
              </div>
              <p className="text-lg text-gray-600 mt-4">Memuat produk terbaik untuk Anda...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <div className="mb-6">
                <p className="text-gray-600 text-sm sm:text-base">
                  📦 Menampilkan <span className="font-bold text-blue-600">{filteredProducts.length}</span> produk
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <span className="text-6xl mb-4">🔍</span>
              <p className="text-xl text-gray-600 mt-4">
                {search ? '❌ Produk tidak ditemukan' : '📭 Tidak ada produk tersedia'}
              </p>
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Hapus Filter
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
