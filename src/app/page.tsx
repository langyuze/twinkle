import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import NewsletterForm from "@/components/NewsletterForm";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featured = await prisma.product.findMany({
    where: { featured: true },
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  const newArrivals = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-pink-50 via-white to-pink-50 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-7xl font-serif font-bold tracking-tight mb-6" style={{ color: "#333" }}>
            Dress to <span style={{ color: "#E8A0BF" }}>Twinkle</span>
          </h1>
          <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
            Modern essentials for every moment. Thoughtfully designed, beautifully made.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-3 text-white rounded-full text-sm font-medium transition hover:opacity-90"
              style={{ backgroundColor: "#E8A0BF" }}
            >
              Shop Now
            </Link>
            <Link
              href="/products?category=sale"
              className="px-8 py-3 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-pink-300 transition"
            >
              View Sale
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-serif font-bold text-center mb-10">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: "Women", slug: "women", img: "https://images.pexels.com/photos/7752451/pexels-photo-7752451.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop" },
            { name: "Men", slug: "men", img: "https://images.pexels.com/photos/4196884/pexels-photo-4196884.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop" },
            { name: "Accessories", slug: "accessories", img: "https://images.pexels.com/photos/1306262/pexels-photo-1306262.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop" },
            { name: "Sale", slug: "sale", img: "https://images.pexels.com/photos/3616933/pexels-photo-3616933.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop" },
          ].map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="relative overflow-hidden rounded-lg aspect-[3/4] group"
            >
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
              <span className="absolute bottom-4 left-4 text-white text-lg font-serif font-bold">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-serif font-bold">Featured</h2>
            <Link href="/products" className="text-sm text-pink-400 hover:text-pink-500 font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-serif font-bold mb-10">New Arrivals</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="bg-pink-50 py-16 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Stay in the Loop</h2>
          <p className="text-gray-500 text-sm mb-6">Subscribe for new arrivals, exclusive offers, and style inspiration.</p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
