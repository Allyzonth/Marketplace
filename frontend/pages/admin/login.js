import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import { adminLogin } from '@/lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Username dan password wajib diisi');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await adminLogin(username, password);
      router.push('/admin/products');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login admin gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login Admin - MarketPlace</title>
      </Head>
      <Header />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white shadow rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-4">Login Admin</h1>
          {error && <div className="mb-4 text-red-700 bg-red-50 border border-red-200 rounded p-3">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username admin"
              className="w-full border rounded-lg px-4 py-2"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password admin"
              className="w-full border rounded-lg px-4 py-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? 'Memproses...' : 'Login'}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
