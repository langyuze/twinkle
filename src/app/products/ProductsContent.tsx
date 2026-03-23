"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (search) params.set("search", search);
    fetch(`/api/products?${params}`)
      .then((r) => r.json())
      .then((data) => { setProducts(data); setLoading(false); });
  }, [category, search]);

  const title = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : search
    ? `Search: "${search}"`
    : "All Products";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold mb-8">{title}</h1>

      <div className="flex gap-3 mb-8 flex-wrap">
        {["all", "women", "men", "accessories", "sale"].map((cat) => (
          <a
            key={cat}
            href={cat === "all" ? "/products" : `/products?category=${cat}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              (cat === "all" && !category) || category === cat
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={
              (cat === "all" && !category) || category === cat
                ? { backgroundColor: "#E8A0BF" }
                : {}
            }
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </a>
        ))}
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-20">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-400 py-20">No products found</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
