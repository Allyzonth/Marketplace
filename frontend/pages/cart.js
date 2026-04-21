import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import CartItem from '@/components/CartItem';
import CheckoutSummary from '@/components/CheckoutSummary';
import useCartStore from '@/store/cartStore';
import { formatPrice } from '@/lib/helpers';

export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const total = useCartStore((state) => state.getTotal());

  // Ensure cart is hydrated from localStorage
  useEffect(() => {
    // Component has mounted, zustand should have loaded from localStorage
  }, []);

  return (
    <>
      <Head>
        <title>Keranjang Belanja - MarketPlace</title>
      </Head>

      <Header />

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            🛍️ Keranjang Belanja
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            {cart.length > 0 ? `${cart.length} item dalam keranjang Anda` : 'Mulai belanja sekarang'}
          </p>

          {cart.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-dashed border-gray-300">
              <span className="text-6xl mb-4 block">📦</span>
              <p className="text-2xl text-gray-600 mb-8 font-semibold">Keranjang Anda kosong</p>
              <p className="text-gray-500 mb-8 text-lg">Jelajahi produk-produk menarik kami dan mulai berbelanja</p>
              <Link href="/">
                <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-900 transition font-bold text-lg shadow-lg">
                  ← Lanjut Belanja
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              <div className="sticky top-24">
                <CheckoutSummary />
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
