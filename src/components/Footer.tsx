import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-serif font-bold mb-4" style={{ color: "#E8A0BF" }}>✦ TWINKLE</h3>
            <p className="text-sm text-gray-500">Modern clothing for every occasion. Designed with love, crafted with care.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-3">Shop</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <Link href="/products?category=women" className="hover:text-pink-400">Women</Link>
              <Link href="/products?category=men" className="hover:text-pink-400">Men</Link>
              <Link href="/products?category=accessories" className="hover:text-pink-400">Accessories</Link>
              <Link href="/products?category=sale" className="hover:text-pink-400">Sale</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-3">Support</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <span>Contact Us</span>
              <span>Shipping & Returns</span>
              <span>Size Guide</span>
              <span>FAQ</span>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Twinkle. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
