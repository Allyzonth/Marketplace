import React, { useState } from 'react';
import useCartStore from '@/store/cartStore';
import { generateWhatsAppMessage, redirectToWhatsApp, formatPrice } from '@/lib/helpers';

export default function CheckoutSummary() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = useCartStore((state) => state.getTotal());
  const [customerName, setCustomerName] = useState('');

  const handleCheckout = () => {
    if (!customerName.trim()) {
      alert('Silakan masukkan nama Anda');
      return;
    }

    if (cart.length === 0) {
      alert('Keranjang Anda kosong');
      return;
    }

    const message = generateWhatsAppMessage(cart, customerName);
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;

    redirectToWhatsApp(message, phoneNumber);
    clearCart();
    setCustomerName('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-100">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
        📋 Ringkasan Order
      </h2>

      {/* Customer Name Input */}
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-3 text-lg">
          Nama Penerima
        </label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Masukkan nama lengkap Anda"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 transition text-lg"
        />
      </div>

      {/* Order Summary */}
      <div className="border-t-2 border-gray-200 pt-6 mb-6">
        <h3 className="font-bold text-gray-900 mb-4 text-lg">Detail Produk</h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center text-gray-700 pb-2 border-b border-gray-100">
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
              </div>
              <p className="font-bold text-blue-600">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-6 border-2 border-blue-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700 font-semibold">Subtotal:</span>
          <span className="text-gray-800">{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between items-center text-2xl font-bold text-blue-600 border-t-2 border-blue-200 pt-3">
          <span>Total:</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={cart.length === 0}
        className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
      >
        💬 Lanjut ke WhatsApp
      </button>

      <p className="text-center text-gray-600 text-xs mt-4">
        ✅ Pembayaran dilakukan setelah konfirmasi pesanan
      </p>
    </div>
  );
}
