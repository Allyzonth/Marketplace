import React from 'react';
import useCartStore from '@/store/cartStore';
import { formatPrice } from '@/lib/helpers';

export default function CartItem({ item }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 flex gap-6 items-start border border-gray-200">
      {/* Image */}
      <div className="relative h-28 w-28 bg-gradient-to-br from-gray-200 to-gray-100 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
        <img
          src={item.image || 'https://via.placeholder.com/100x100'}
          alt={item.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/100x100?text=No+Image';
          }}
          className="h-full w-full object-cover rounded-xl hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition">
          {item.name}
        </h3>
        <p className="text-gray-600 mt-1 text-sm">
          {formatPrice(item.price)} x {item.quantity}
        </p>

        {/* Quantity Control */}
        <div className="flex items-center gap-2 mt-4 bg-gray-100 p-2 rounded-lg w-fit">
          <button
            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-md font-bold transition"
          >
            −
          </button>
          <span className="px-4 py-1 font-semibold text-gray-800 min-w-max">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-md font-bold transition"
          >
            +
          </button>
        </div>
      </div>

      {/* Price and Remove */}
      <div className="text-right flex flex-col items-end justify-between h-full">
        <div>
          <p className="text-sm text-gray-600">Subtotal</p>
          <p className="text-2xl font-bold text-blue-600">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-600 hover:text-red-800 hover:bg-red-50 px-4 py-2 rounded-lg font-semibold text-sm transition"
        >
          🗑️ Hapus
        </button>
      </div>
    </div>
  );
}
