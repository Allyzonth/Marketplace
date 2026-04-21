import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useCartStore from '@/store/cartStore';

export default function Header() {
  const cartCount = useCartStore((state) => state.getCartCount());
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer group">
            <span className="text-3xl">🛒</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-blue-100 transition-colors">
              MarketPlace
            </h1>
          </div>
        </Link>

        <nav className="flex gap-6 sm:gap-8 items-center">
          <Link href="/">
            <span className="text-white hover:text-blue-100 cursor-pointer font-medium transition-colors text-sm sm:text-base">
              🏠 Home
            </span>
          </Link>

          <Link href="/admin/products">
            <span className="text-white hover:text-blue-100 cursor-pointer font-medium transition-colors text-sm sm:text-base">
              🛠️ Admin
            </span>
          </Link>
          
          <Link href="/cart">
            <div className="relative cursor-pointer group">
              <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">
                🛍️
              </span>
              {isHydrated && cartCount > 0 && (
                <span className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
}
