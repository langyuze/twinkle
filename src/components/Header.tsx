"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { ShoppingBag, User, Search, Menu, X, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { getCart, getCartCount } from "@/lib/cart";

export default function Header() {
  const { data: session } = useSession();
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const update = () => setCartCount(getCartCount(getCart()));
    update();
    window.addEventListener("cart-updated", update);
    return () => window.removeEventListener("cart-updated", update);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button className="sm:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="text-2xl font-serif font-bold tracking-wide" style={{ color: "#E8A0BF" }}>
            ✦ TWINKLE
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-8 text-sm font-medium text-gray-700">
            <Link href="/products" className="hover:text-pink-400 transition">All</Link>
            <Link href="/products?category=women" className="hover:text-pink-400 transition">Women</Link>
            <Link href="/products?category=men" className="hover:text-pink-400 transition">Men</Link>
            <Link href="/products?category=accessories" className="hover:text-pink-400 transition">Accessories</Link>
            <Link href="/products?category=sale" className="hover:text-pink-400 transition">Sale</Link>
            <Link href="/membership" className="hover:text-pink-400 transition font-semibold">Membership</Link>
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <button onClick={() => setSearchOpen(!searchOpen)} className="text-gray-600 hover:text-pink-400">
              <Search size={20} />
            </button>

            {session ? (
              <div className="flex items-center gap-3">
                <Link href="/account" className="text-gray-600 hover:text-pink-400">
                  <User size={20} />
                </Link>
                <button onClick={() => signOut()} className="text-gray-400 hover:text-pink-400" title="Sign out">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button onClick={() => signIn("google")} className="text-sm text-gray-600 hover:text-pink-400 font-medium">
                Sign In
              </button>
            )}

            <Link href="/cart" className="relative text-gray-600 hover:text-pink-400">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-400 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <form onSubmit={handleSearch} className="pb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-300"
              autoFocus
            />
          </form>
        )}

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="sm:hidden pb-4 flex flex-col gap-3 text-sm font-medium text-gray-700">
            <Link href="/products" onClick={() => setMenuOpen(false)}>All Products</Link>
            <Link href="/products?category=women" onClick={() => setMenuOpen(false)}>Women</Link>
            <Link href="/products?category=men" onClick={() => setMenuOpen(false)}>Men</Link>
            <Link href="/products?category=accessories" onClick={() => setMenuOpen(false)}>Accessories</Link>
            <Link href="/products?category=sale" onClick={() => setMenuOpen(false)}>Sale</Link>
            <Link href="/membership" onClick={() => setMenuOpen(false)} className="text-pink-500 font-semibold">Membership</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
