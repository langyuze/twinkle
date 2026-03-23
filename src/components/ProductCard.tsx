"use client";

import Link from "next/link";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compareAtPrice?: number | null;
    images: string;
    category: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const images = JSON.parse(product.images);
  const mainImage = images[0] || "https://picsum.photos/400/500";
  const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[3/4] mb-3">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {isOnSale && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded font-medium">
            SALE
          </span>
        )}
        {product.category === "sale" && !isOnSale && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded font-medium">
            SALE
          </span>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-800 group-hover:text-pink-400 transition">{product.name}</h3>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-sm font-semibold text-gray-900">${product.price.toFixed(2)}</span>
        {isOnSale && (
          <span className="text-sm text-gray-400 line-through">${product.compareAtPrice!.toFixed(2)}</span>
        )}
      </div>
    </Link>
  );
}
