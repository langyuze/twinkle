"use client";

import { useState } from "react";
import { addToCart } from "@/lib/cart";
import { ShoppingBag, Check } from "lucide-react";

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
  description: string;
  price: number;
  compareAtPrice: number | null;
  category: string;
  images: string;
  variants: Variant[];
}

export default function ProductDetail({ product }: { product: Product }) {
  const images = JSON.parse(product.images);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [added, setAdded] = useState(false);

  const sizes = [...new Set(product.variants.map((v) => v.size))];
  const colors = [...new Set(product.variants.map((v) => v.color))];

  const selectedVariant = product.variants.find(
    (v) => v.size === selectedSize && v.color === selectedColor
  );

  const handleAdd = () => {
    if (!selectedVariant) return;
    addToCart({
      variantId: selectedVariant.id,
      productId: product.id,
      name: product.name,
      size: selectedVariant.size,
      color: selectedVariant.color,
      price: product.price,
      quantity: 1,
      image: images[0] || "",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 mb-4">
            <img
              src={images[selectedImage] || "https://picsum.photos/600/800"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-20 rounded overflow-hidden border-2 ${
                    selectedImage === i ? "border-pink-400" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-sm text-pink-400 font-medium mb-2 uppercase">{product.category}</p>
          <h1 className="text-3xl font-serif font-bold mb-4">{product.name}</h1>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            {product.compareAtPrice && (
              <span className="text-lg text-gray-400 line-through">${product.compareAtPrice.toFixed(2)}</span>
            )}
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>

          {/* Size */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3">Size</h3>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded text-sm font-medium transition ${
                    selectedSize === size
                      ? "border-pink-400 bg-pink-50 text-pink-600"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-3">Color</h3>
            <div className="flex gap-2 flex-wrap">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded text-sm font-medium transition ${
                    selectedColor === color
                      ? "border-pink-400 bg-pink-50 text-pink-600"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Stock info */}
          {selectedVariant && (
            <p className="text-sm text-gray-500 mb-4">
              {selectedVariant.stock > 0
                ? `${selectedVariant.stock} in stock · SKU: ${selectedVariant.sku}`
                : "Out of stock"}
            </p>
          )}

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            disabled={!selectedVariant || selectedVariant.stock === 0}
            className="w-full py-4 rounded-full text-white font-medium flex items-center justify-center gap-2 transition disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
            style={{ backgroundColor: added ? "#22c55e" : "#E8A0BF" }}
          >
            {added ? (
              <>
                <Check size={20} /> Added to Cart
              </>
            ) : (
              <>
                <ShoppingBag size={20} /> Add to Cart
              </>
            )}
          </button>

          {!selectedSize && !selectedColor && (
            <p className="text-sm text-gray-400 mt-3 text-center">Select size and color</p>
          )}
        </div>
      </div>
    </div>
  );
}
