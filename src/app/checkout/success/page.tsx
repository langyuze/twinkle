"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { CheckCircle, Wallet, ExternalLink } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const [receiptOffer, setReceiptOffer] = useState<any>(null);
  const [membershipOffer, setMembershipOffer] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (orderId) {
      generateReceipt(orderId);
    }
  }, [orderId]);

  async function generateMembership(name: string, email: string) {
    try {
      const res = await fetch("/api/issuer/offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberName: name, memberEmail: email, pushToWallet: true }),
      });
      if (res.ok) {
        const data = await res.json();
        setMembershipOffer(data);
      }
    } catch {}
  }

  async function generateReceipt(oid: string) {
    setLoading(true);
    try {
      // Fetch order details
      const orderRes = await fetch(`/api/orders/${oid}`);
      if (!orderRes.ok) {
        // Fallback demo receipt
        const res = await fetch("/api/issuer/offer-receipt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: oid,
            customerName: "Guest",
            customerEmail: "guest@twinkle.shop",
            items: [{ name: "Twinkle Item", size: "M", color: "Black", qty: 1, price: 49.99 }],
            subtotal: 49.99,
            tax: 4.50,
            total: 54.49,
            paymentMethod: "Stripe (Test)",
            purchasedAt: new Date().toISOString(),
          }),
        });
        const data = await res.json();
        setReceiptOffer(data);
      } else {
        const order = await orderRes.json();
        const res = await fetch("/api/issuer/offer-receipt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: order.id,
            customerName: order.user?.name || "Customer",
            customerEmail: order.user?.email || "customer@twinkle.shop",
            items: order.items.map((i: any) => ({
              name: i.productVariant?.product?.name || "Item",
              size: i.productVariant?.size || "",
              color: i.productVariant?.color || "",
              qty: i.quantity,
              price: i.price,
            })),
            subtotal: order.total,
            tax: Math.round(order.total * 0.0875 * 100) / 100,
            total: Math.round(order.total * 1.0875 * 100) / 100,
            paymentMethod: "Stripe (Visa ****4242)",
            purchasedAt: order.createdAt,
          }),
        });
        const data = await res.json();
        setReceiptOffer(data);

        // Auto-enroll membership if opted in
        if (order.autoEnrollMembership) {
          const customerName = order.user?.name || "Member";
          const customerEmail = order.user?.email || "customer@twinkle.shop";
          generateMembership(customerName, customerEmail);
        }
      }
    } catch {
      // Silent fail — receipt is optional
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />
      <h1 className="text-3xl font-serif font-bold mb-4">Order Confirmed!</h1>
      <p className="text-gray-500 mb-8">
        Thank you for your purchase. We'll send you an email with your order details shortly.
      </p>

      {/* Receipt sent to wallet */}
      {receiptOffer && (
        <div className="mb-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🧾</span>
            <p className="text-sm font-bold text-gray-800">Digital receipt sent to your wallet!</p>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            A verifiable receipt credential has been pushed to your digital wallet. Open it to accept.
          </p>
          <div className="flex gap-3 justify-center">
            <a
              href={process.env.NEXT_PUBLIC_WALLET_URL || "http://localhost:3001"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition"
            >
              <Wallet size={18} />
              Open Wallet
              <ExternalLink size={14} />
            </a>
            <a
              href={receiptOffer.webWalletUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-full font-medium hover:bg-gray-50 transition border border-gray-200"
            >
              Accept Directly
            </a>
          </div>
          <p className="text-[10px] text-gray-400 mt-3">Verifiable credential (SD-JWT VC) via OpenID4VCI</p>
        </div>
      )}

      {/* Membership auto-enrolled */}
      {membershipOffer && (
        <div className="mb-8">
          {/* Membership card preview */}
          <div className="rounded-2xl overflow-hidden shadow-lg mb-4" style={{ background: "linear-gradient(135deg, #E8A0BF 0%, #c77dba 50%, #a855a0 100%)" }}>
            <div className="p-6 text-white">
              <div className="flex items-center justify-between mb-5">
                <span className="text-base font-serif font-bold tracking-wide">✦ TWINKLE</span>
                <span className="text-xs font-medium px-3 py-1 bg-white/20 rounded-full">{membershipOffer.tier} Member</span>
              </div>
              <div className="mb-4">
                <p className="text-white/70 text-[10px] uppercase tracking-wider mb-0.5">Member</p>
                <p className="text-lg font-bold">{membershipOffer.memberName || "Member"}</p>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-white/70 text-[10px] uppercase tracking-wider mb-0.5">Member ID</p>
                  <p className="font-mono text-xs">{membershipOffer.memberId}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/70 text-[10px] uppercase tracking-wider mb-0.5">Points</p>
                  <p className="text-xl font-bold">{membershipOffer.points}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl border border-pink-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">✦</span>
              <p className="text-sm font-bold text-gray-800">Membership auto-enrolled!</p>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Your Gold membership pass has been sent to your digital wallet. Open it to save your pass.
            </p>
            <div className="flex gap-3 justify-center">
              <a
                href={process.env.NEXT_PUBLIC_WALLET_URL || "http://localhost:3001"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition"
              >
                <Wallet size={16} />
                Open Wallet
                <ExternalLink size={14} />
              </a>
              <a
                href={membershipOffer.webWalletUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 transition border border-gray-200"
              >
                Save Pass Directly
              </a>
            </div>
          </div>
        </div>
      )}

      {loading && !receiptOffer && (
        <div className="mb-8 p-4 bg-gray-50 rounded-2xl">
          <p className="text-sm text-gray-500 animate-pulse">Generating your digital receipt...</p>
        </div>
      )}

      <Link
        href="/products"
        className="inline-block px-8 py-3 text-white rounded-full text-sm font-medium hover:opacity-90 transition"
        style={{ backgroundColor: "#E8A0BF" }}
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-400">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
