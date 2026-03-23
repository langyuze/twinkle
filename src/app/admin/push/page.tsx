"use client";

import { useState } from "react";
import { Send, Receipt, Tag, ExternalLink } from "lucide-react";

export default function PushPage() {
  const [promoResult, setPromoResult] = useState<any>(null);
  const [receiptResult, setReceiptResult] = useState<any>(null);
  const [loading, setLoading] = useState("");

  // Demo promo push
  const [promoForm, setPromoForm] = useState({
    customerName: "Kenny Lang",
    customerEmail: "langyuze@hotmail.com",
    discountPercent: 20,
    expiresInHours: 2,
    headline: "",
    message: "",
  });

  const sampleCartItems = [
    { name: "Seoul Nights Crop Tee", size: "M", color: "Black", price: 34.00, image: "https://images.pexels.com/photos/7124122/pexels-photo-7124122.jpeg?auto=compress&cs=tinysrgb&w=100" },
    { name: "Debut Bomber Jacket", size: "L", color: "Navy", price: 128.00, image: "https://images.pexels.com/photos/3205757/pexels-photo-3205757.jpeg?auto=compress&cs=tinysrgb&w=100" },
    { name: "Idol Chain Necklace", size: "One Size", color: "Silver", price: 38.00, image: "https://images.pexels.com/photos/7130033/pexels-photo-7130033.jpeg?auto=compress&cs=tinysrgb&w=100" },
  ];

  const handlePushPromo = async () => {
    setLoading("promo");
    const cartTotal = sampleCartItems.reduce((s, i) => s + i.price, 0);
    try {
      const res = await fetch("/api/issuer/offer-promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...promoForm,
          cartItems: sampleCartItems,
          cartTotal,
        }),
      });
      const data = await res.json();
      setPromoResult(data);
    } catch (e: any) {
      alert("Failed: " + e.message);
    } finally {
      setLoading("");
    }
  };

  const handlePushReceipt = async () => {
    setLoading("receipt");
    try {
      const res = await fetch("/api/issuer/offer-receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: `ORD-${Date.now().toString(36).toUpperCase()}`,
          customerName: "Kenny Lang",
          customerEmail: "langyuze@hotmail.com",
          items: [
            { name: "Cashmere Turtleneck", size: "M", color: "Camel", qty: 1, price: 195.00 },
            { name: "High-Waist Tailored Trousers", size: "S", color: "Black", qty: 1, price: 110.00 },
          ],
          subtotal: 305.00,
          tax: 26.69,
          total: 331.69,
          paymentMethod: "Stripe (Visa ****4242)",
          purchasedAt: new Date().toISOString(),
        }),
      });
      const data = await res.json();
      setReceiptResult(data);
    } catch (e: any) {
      alert("Failed: " + e.message);
    } finally {
      setLoading("");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold mb-2">Push Credentials</h1>
      <p className="text-sm text-gray-500 mb-8">Issue receipts and promotions to customer wallets via OpenID4VCI</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Promo Push */}
        <div className="bg-white border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Tag size={20} className="text-red-500" />
            <h2 className="font-bold">Cart Abandonment Promo</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">Push a personalized discount to a customer who left items in their cart</p>

          <div className="space-y-3 mb-4">
            <input
              placeholder="Customer name"
              value={promoForm.customerName}
              onChange={(e) => setPromoForm({ ...promoForm, customerName: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
            <input
              placeholder="Customer email (wallet ID)"
              value={promoForm.customerEmail}
              onChange={(e) => setPromoForm({ ...promoForm, customerEmail: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Discount %"
                value={promoForm.discountPercent}
                onChange={(e) => setPromoForm({ ...promoForm, discountPercent: parseInt(e.target.value) || 0 })}
                className="w-1/2 px-3 py-2 border rounded-lg text-sm"
              />
              <input
                type="number"
                placeholder="Expires in hours"
                value={promoForm.expiresInHours}
                onChange={(e) => setPromoForm({ ...promoForm, expiresInHours: parseInt(e.target.value) || 1 })}
                className="w-1/2 px-3 py-2 border rounded-lg text-sm"
              />
            </div>
            <input
              placeholder="Headline (optional)"
              value={promoForm.headline}
              onChange={(e) => setPromoForm({ ...promoForm, headline: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
            <textarea
              placeholder="Custom message (optional)"
              value={promoForm.message}
              onChange={(e) => setPromoForm({ ...promoForm, message: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-sm"
              rows={2}
            />
          </div>

          {/* Cart preview */}
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="text-xs font-medium text-gray-500 mb-2">Cart items to include:</p>
            {sampleCartItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-gray-600 py-1">
                <img src={item.image} alt="" className="w-8 h-8 rounded object-cover" />
                <span className="flex-1">{item.name} ({item.size}/{item.color})</span>
                <span className="font-medium">${item.price}</span>
              </div>
            ))}
            <div className="flex justify-between text-xs font-bold mt-2 pt-2 border-t">
              <span>Cart total</span>
              <span>${sampleCartItems.reduce((s, i) => s + i.price, 0).toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handlePushPromo}
            disabled={!!loading}
            className="w-full py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send size={16} />
            {loading === "promo" ? "Pushing..." : "Push Promo to Wallet"}
          </button>

          {promoResult && (
            <div className="mt-4 space-y-2">
              <div className="bg-green-50 text-green-700 text-xs p-3 rounded-lg">
                ✓ Promo pushed! Code: <strong>{promoResult.promoCode}</strong> · {promoResult.discountPercent}% off · Expires: {new Date(promoResult.expiresAt).toLocaleTimeString()}
              </div>
              <a
                href={promoResult.webWalletUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600"
              >
                Open in Wallet <ExternalLink size={12} />
              </a>
            </div>
          )}
        </div>

        {/* Receipt Push */}
        <div className="bg-white border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Receipt size={20} className="text-gray-700" />
            <h2 className="font-bold">Push Receipt</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">Send a verifiable purchase receipt to a customer's wallet</p>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-xs font-medium text-gray-500 mb-3">Sample order:</p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Cashmere Turtleneck (M/Camel)</span><span>$195.00</span></div>
              <div className="flex justify-between"><span className="text-gray-500">High-Waist Tailored Trousers (S/Black)</span><span>$110.00</span></div>
              <div className="flex justify-between pt-2 border-t mt-2"><span className="text-gray-500">Subtotal</span><span>$305.00</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Tax</span><span>$26.69</span></div>
              <div className="flex justify-between font-bold"><span>Total</span><span>$331.69</span></div>
            </div>
          </div>

          <button
            onClick={handlePushReceipt}
            disabled={!!loading}
            className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send size={16} />
            {loading === "receipt" ? "Pushing..." : "Push Receipt to Wallet"}
          </button>

          {receiptResult && (
            <div className="mt-4 space-y-2">
              <div className="bg-green-50 text-green-700 text-xs p-3 rounded-lg">
                ✓ Receipt pushed! Order: <strong>{receiptResult.orderId}</strong>
              </div>
              <a
                href={receiptResult.webWalletUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600"
              >
                Open in Wallet <ExternalLink size={12} />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* How it works */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6">
        <h3 className="font-bold text-sm mb-3">How it works</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs text-gray-600">
          <div><span className="text-pink-400 font-bold">1.</span> Twinkle creates a credential offer (receipt or promo) with embedded payload</div>
          <div><span className="text-pink-400 font-bold">2.</span> Offer is pushed to the wallet's notification queue via OID4VCI</div>
          <div><span className="text-pink-400 font-bold">3.</span> Wallet fetches issuer metadata & exchanges pre-auth code for access token</div>
          <div><span className="text-pink-400 font-bold">4.</span> Wallet receives the signed VC (sd-jwt) with full payload — receipt details, promo code, cart items</div>
        </div>
      </div>
    </div>
  );
}
