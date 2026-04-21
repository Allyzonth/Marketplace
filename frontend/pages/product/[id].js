import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import useCartStore from '@/store/cartStore';
import { fetchProductById } from '@/lib/api';
import { formatPrice } from '@/lib/helpers';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Gagal memuat detail produk');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    alert(`${quantity} ${product.name} ditambahkan ke keranjang!`);
    setQuantity(1);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mb-4"></div>
            <p className="text-lg text-gray-600">Memuat detail produk...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl text-red-600 font-semibold mb-4">❌ {error || 'Produk tidak ditemukan'}</p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} - MarketPlace</title>
      </Head>

      <Header />

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800 mb-6 font-semibold flex items-center gap-2 text-lg transition"
          >
            ← Kembali
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Section */}
            <div className="relative h-96 md:h-[500px] bg-gradient-to-br from-gray-200 to-gray-100 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={product.image || 'https://via.placeholder.com/500x500'}
                alt={product.name}
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/500x500?text=No+Image';
                }}
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
              />
              {product.rating && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-white px-3 py-2 rounded-full text-lg font-bold shadow-lg">
                  ⭐ {product.rating}
                </div>
              )}
            </div>

            {/* Details Section */}
            <div>
              {product.category && (
                <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full mb-4">
                  {product.category}
                </span>
              )}

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {product.stock !== undefined && (
                <div className="mb-4">
                  <p className={`text-lg font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `✅ Stok Tersedia (${product.stock})` : '❌ Stok Habis'}
                  </p>
                </div>
              )}

              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Price Section */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl mb-8 border-2 border-blue-200">
                <p className="text-gray-600 text-sm font-medium mb-2">HARGA SPESIAL</p>
                <p className="text-5xl font-bold text-blue-600">
                  {formatPrice(product.price)}
                </p>
              </div>

              {/* Quantity Section */}
              <div className="mb-8">
                <label className="block text-gray-800 font-bold mb-4 text-lg">
                  Jumlah Pembelian
                </label>
                <div className="flex items-center gap-4 bg-gray-100 p-2 rounded-xl w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-3 rounded-lg font-bold text-xl transition-colors"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 px-4 py-3 border-2 border-gray-300 rounded-lg text-center font-bold text-lg focus:border-blue-600 focus:outline-none"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-3 rounded-lg font-bold text-xl transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-xl transition-all duration-200 transform hover:scale-105 shadow-lg mb-4"
              >
                🛒 Tambah ke Keranjang
              </button>

              {product.stock === 0 && (
                <p className="text-center text-red-600 font-semibold">
                  Maaf, produk ini sedang tidak tersedia
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
