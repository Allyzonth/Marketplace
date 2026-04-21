import React from 'react';
import Link from 'next/link';
import useCartStore from '@/store/cartStore';
import { formatPrice } from '@/lib/helpers';

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    alert('Produk ditambahkan ke keranjang!');
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer group">
        {/* Image Container */}
        <div className="relative h-56 w-full bg-gradient-to-br from-gray-200 to-gray-100 overflow-hidden">
          <img
            src={product.image || 'https://via.placeholder.com/300x200'}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Image';
            }}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {product.stock && product.stock > 0 && (
            <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              Stok: {product.stock}
            </div>
          )}
          {product.rating && (
            <div className="absolute top-3 left-3 bg-yellow-400 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
              ⭐ {product.rating}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {product.category && (
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
              {product.category}
            </span>
          )}
          <h3 className="text-lg font-bold text-gray-900 truncate mt-2 group-hover:text-blue-600">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mt-2 h-10">
            {product.description}
          </p>

          {/* Price and Button */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 font-semibold text-sm shadow-md"
            >
              + Keranjang
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
