import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import { adminLogout, createProduct, deleteProduct, fetchProducts, isAdminLoggedIn, updateProduct } from '@/lib/api';

const initialForm = {
  name: '',
  price: '',
  image: '',
  description: ''
};

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const submitLabel = useMemo(() => (editingId ? 'Update Produk' : 'Tambah Produk'), [editingId]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError('Gagal memuat daftar produk');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      router.replace('/admin/login');
      return;
    }
    loadProducts();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name || '',
      price: String(product.price || ''),
      image: product.image || '',
      description: product.description || ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image || !form.description) {
      setError('Semua field wajib diisi');
      return;
    }

    try {
      setSaving(true);
      setError('');
      const payload = {
        name: form.name.trim(),
        price: Number(form.price),
        image: form.image.trim(),
        description: form.description.trim()
      };

      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }

      resetForm();
      await loadProducts();
    } catch (err) {
      setError(err?.response?.data?.message || 'Gagal menyimpan produk');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm('Yakin ingin menghapus produk ini?');
    if (!shouldDelete) return;

    try {
      setError('');
      await deleteProduct(id);
      await loadProducts();
    } catch (err) {
      setError(err?.response?.data?.message || 'Gagal menghapus produk');
      console.error(err);
    }
  };

  const handleLogout = () => {
    adminLogout();
    router.push('/admin/login');
  };

  return (
    <>
      <Head>
        <title>Admin Produk - MarketPlace</title>
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Produk</h1>
          <div className="mb-4">
            <button
              onClick={handleLogout}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Logout Admin
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-300 bg-red-50 text-red-700 px-4 py-3">
              {error}
            </div>
          )}

          <section className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nama produk"
                className="border rounded-lg px-4 py-2"
              />
              <input
                name="price"
                type="number"
                min="0"
                value={form.price}
                onChange={handleChange}
                placeholder="Harga"
                className="border rounded-lg px-4 py-2"
              />
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="URL gambar langsung (jpg/png/webp)"
                className="border rounded-lg px-4 py-2 md:col-span-2"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Deskripsi produk"
                rows={4}
                className="border rounded-lg px-4 py-2 md:col-span-2"
              />
              <div className="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
                >
                  {saving ? 'Menyimpan...' : submitLabel}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300"
                  >
                    Batal Edit
                  </button>
                )}
              </div>
            </form>
          </section>

          <section className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Daftar Produk</h2>
            {loading ? (
              <p className="text-gray-600">Memuat produk...</p>
            ) : products.length === 0 ? (
              <p className="text-gray-600">Belum ada produk.</p>
            ) : (
              <div className="space-y-3">
                {products.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4 flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600">Rp {Number(product.price || 0).toLocaleString('id-ID')}</p>
                      <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
