"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getCart, updateCartQuantity, removeFromCart, getCartTotal, clearCart, CartItem } from "@/lib/cart";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { data: session } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [promoSent, setPromoSent] = useState(false);
  const [promoBanner, setPromoBanner] = useState<{ code: string; percent: number; expiresAt: string } | null>(null);
  const [autoEnrollMembership, setAutoEnrollMembership] = useState(true);

  useEffect(() => {
    setCart(getCart());
    const update = () => setCart(getCart());
    window.addEventListener("cart-updated", update);
    return () => window.removeEventListener("cart-updated", update);
  }, []);

  // Auto-trigger cart abandonment promo after 8 seconds
  useEffect(() => {
    const email = session?.user?.email || guestEmail;
    if (!email || cart.length === 0 || promoSent) return;
    // Check if we already sent a promo this session
    const sentKey = `twinkle-promo-sent-${email}`;
    if (sessionStorage.getItem(sentKey)) { setPromoSent(true); return; }

    const timer = setTimeout(async () => {
      try {
        const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const res = await fetch("/api/issuer/offer-promo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerName: session?.user?.name || guestEmail?.split("@")[0] || "there",
            customerEmail: email,
            cartItems: cart.map((item) => ({
              name: item.name,
              size: item.size,
              color: item.color,
              price: item.price,
              image: item.image,
            })),
            cartTotal,
            discountPercent: 20,
            expiresInHours: 1,
            headline: `20% off your cart — just for you!`,
            message: `Still thinking it over? We get it. Here's 20% off your entire cart to sweeten the deal. But hurry — this offer expires in 1 hour!`,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          setPromoSent(true);
          sessionStorage.setItem(sentKey, "1");
          setPromoBanner({ code: data.promoCode, percent: data.discountPercent, expiresAt: data.expiresAt });
        }
      } catch {}
    }, 8000);
    return () => clearTimeout(timer);
  }, [session, guestEmail, cart, promoSent]);

  const handleCheckout = async () => {
    // If not signed in, require guest email
    if (!session && !guestEmail) {
      setEmailError("Enter your email to checkout");
      return;
    }

    if (!session && guestEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(guestEmail)) {
        setEmailError("Please enter a valid email");
        return;
      }
    }

    setEmailError("");
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          guestEmail: session ? undefined : guestEmail,
          autoEnrollMembership,
        }),
      });
      const data = await res.json();
      if (data.url) {
        clearCart();
        window.location.href = data.url;
      } else {
        alert(data.error || "Checkout failed");
      }
    } catch {
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
        <h1 className="text-2xl font-serif font-bold mb-3">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
        <Link
          href="/products"
          className="inline-block px-8 py-3 text-white rounded-full text-sm font-medium hover:opacity-90 transition"
          style={{ backgroundColor: "#E8A0BF" }}
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-serif font-bold mb-8">Shopping Cart</h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div key={item.variantId} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-20 h-24 rounded overflow-hidden bg-gray-200 flex-shrink-0">
              {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.size} / {item.color}</p>
              <p className="text-sm font-semibold mt-1">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex flex-col items-end justify-between">
              <button onClick={() => removeFromCart(item.variantId)} className="text-gray-400 hover:text-red-400">
                <Trash2 size={16} />
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateCartQuantity(item.variantId, item.quantity - 1)}
                  className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateCartQuantity(item.variantId, item.quantity + 1)}
                  className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-10 border-t pt-6">
        <div className="flex justify-between text-lg font-bold mb-6">
          <span>Total</span>
          <span>${getCartTotal(cart).toFixed(2)}</span>
        </div>

        {/* Guest email input — only show if not signed in */}
        {!session && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email for order confirmation</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={guestEmail}
              onChange={(e) => { setGuestEmail(e.target.value); setEmailError(""); }}
              className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:border-pink-300 ${
                emailError ? "border-red-300" : "border-gray-200"
              }`}
            />
            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
            <p className="text-xs text-gray-400 mt-1">No account needed — we'll use this for your order receipt.</p>
          </div>
        )}

        {/* Promo banner */}
        {promoBanner && (
          <div className="mb-4 p-4 rounded-2xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-red-600">🎉 {promoBanner.percent}% OFF — Limited Time!</span>
              <span className="text-xs text-orange-500 font-medium">Sent to your wallet</span>
            </div>
            <p className="text-xs text-gray-600 mb-2">
              A personalized discount has been sent to your digital wallet. Open your wallet to claim it!
            </p>
            <div className="flex items-center gap-2">
              <code className="text-xs bg-white px-2 py-1 rounded font-mono font-bold text-gray-800">{promoBanner.code}</code>
              <a
                href={process.env.NEXT_PUBLIC_WALLET_URL || "http://localhost:3001"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:text-blue-600 font-medium"
              >
                Open Wallet →
              </a>
            </div>
          </div>
        )}

        {/* Auto-enroll membership toggle */}
        <label className="flex items-start gap-3 mb-5 p-4 rounded-2xl border border-pink-100 bg-gradient-to-r from-pink-50 to-purple-50 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={autoEnrollMembership}
            onChange={(e) => setAutoEnrollMembership(e.target.checked)}
            className="mt-0.5 w-5 h-5 rounded accent-pink-400 flex-shrink-0"
          />
          <div>
            <span className="text-sm font-semibold text-gray-800">✦ Auto-enroll in Twinkle Membership</span>
            <p className="text-xs text-gray-500 mt-0.5">
              Your Gold membership pass will be automatically saved to your Google Wallet after purchase
            </p>
          </div>
        </label>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-4 rounded-full text-white font-medium hover:opacity-90 transition disabled:opacity-50"
          style={{ backgroundColor: "#E8A0BF" }}
        >
          {loading ? "Processing..." : "Checkout with Stripe"}
        </button>

        {!session && (
          <p className="text-center text-xs text-gray-400 mt-3">
            Or <a href="/auth/signin" className="text-pink-400 hover:text-pink-500">sign in</a> for order history & faster checkout
          </p>
        )}
      </div>
    </div>
  );
}
