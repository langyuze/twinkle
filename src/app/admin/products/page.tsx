"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Variant {
  id: string;
  size: string;
  color: string;
  sku: string;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  featured: boolean;
  variants: Variant[];
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    compareAtPrice: "",
    category: "women",
    images: "",
    featured: false,
    variants: [{ size: "S", color: "Black", sku: "", stock: "10" }],
  });

  const load = () => fetch("/api/admin/products").then((r) => r.json()).then(setProducts);

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        compareAtPrice: form.compareAtPrice ? parseFloat(form.compareAtPrice) : null,
        images: form.images.split(",").map((s) => s.trim()).filter(Boolean),
        variants: form.variants.map((v) => ({ ...v, stock: parseInt(v.stock) || 0 })),
      }),
    });
    setShowForm(false);
    setForm({ name: "", description: "", price: "", compareAtPrice: "", category: "women", images: "", featured: false, variants: [{ size: "S", color: "Black", sku: "", stock: "10" }] });
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch("/api/admin/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  };

  const addVariant = () => {
    setForm({ ...form, variants: [...form.variants, { size: "M", color: "White", sku: "", stock: "10" }] });
  };

  const updateVariant = (i: number, key: string, value: string) => {
    const variants = [...form.variants];
    (variants[i] as any)[key] = value;
    setForm({ ...form, variants });
  };

  const removeVariant = (i: number) => {
    setForm({ ...form, variants: form.variants.filter((_, j) => j !== i) });
  };

  const totalStock = (v: Variant[]) => v.reduce((sum, x) => sum + x.stock, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold">Products</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm font-medium hover:opacity-90"
          style={{ backgroundColor: "#E8A0BF" }}
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-6 mb-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Product name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-3 py-2 border rounded-lg text-sm" required />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="px-3 py-2 border rounded-lg text-sm">
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="accessories">Accessories</option>
              <option value="sale">Sale</option>
            </select>
          </div>
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" rows={3} required />
          <div className="grid grid-cols-3 gap-4">
            <input placeholder="Price" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="px-3 py-2 border rounded-lg text-sm" required />
            <input placeholder="Compare at price (optional)" type="number" step="0.01" value={form.compareAtPrice} onChange={(e) => setForm({ ...form, compareAtPrice: e.target.value })} className="px-3 py-2 border rounded-lg text-sm" />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured
            </label>
          </div>
          <input placeholder="Image URLs (comma separated)" value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold">Variants</h4>
              <button type="button" onClick={addVariant} className="text-xs text-pink-500 font-medium">+ Add Variant</button>
            </div>
            {form.variants.map((v, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input placeholder="Size" value={v.size} onChange={(e) => updateVariant(i, "size", e.target.value)} className="px-2 py-1 border rounded text-sm w-20" />
                <input placeholder="Color" value={v.color} onChange={(e) => updateVariant(i, "color", e.target.value)} className="px-2 py-1 border rounded text-sm w-24" />
                <input placeholder="SKU (auto)" value={v.sku} onChange={(e) => updateVariant(i, "sku", e.target.value)} className="px-2 py-1 border rounded text-sm w-32" />
                <input placeholder="Stock" type="number" value={v.stock} onChange={(e) => updateVariant(i, "stock", e.target.value)} className="px-2 py-1 border rounded text-sm w-20" />
                {form.variants.length > 1 && (
                  <button type="button" onClick={() => removeVariant(i)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                )}
              </div>
            ))}
          </div>

          <button type="submit" className="px-6 py-2 text-white rounded-lg text-sm font-medium hover:opacity-90" style={{ backgroundColor: "#E8A0BF" }}>
            Create Product
          </button>
        </form>
      )}

      {/* Product table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Variants</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{p.name} {p.featured && <span className="text-pink-400 text-xs">★</span>}</td>
                <td className="px-4 py-3 text-gray-500 capitalize">{p.category}</td>
                <td className="px-4 py-3">${p.price.toFixed(2)}</td>
                <td className="px-4 py-3">{totalStock(p.variants)}</td>
                <td className="px-4 py-3 text-gray-500">{p.variants.length}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(p.id)} className="text-gray-400 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && <p className="text-center text-gray-400 py-8">No products yet</p>}
      </div>
    </div>
  );
}
