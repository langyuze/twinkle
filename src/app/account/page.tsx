"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (session) {
      fetch("/api/orders").then((r) => r.json()).then(setOrders).catch(() => {});
    }
  }, [session]);

  if (status === "loading") return <div className="py-20 text-center text-gray-400">Loading...</div>;

  if (!session) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-serif font-bold mb-4">Sign in to view your account</h1>
        <Link href="/auth/signin" className="text-pink-400 hover:text-pink-500 font-medium">
          Sign In →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-serif font-bold mb-8">My Account</h1>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="flex items-center gap-4">
          {session.user?.image && (
            <img src={session.user.image} alt="" className="w-12 h-12 rounded-full" />
          )}
          <div>
            <p className="font-medium text-gray-800">{session.user?.name}</p>
            <p className="text-sm text-gray-500">{session.user?.email}</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-serif font-bold mb-4">Order History</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Order #{order.id.slice(0, 8)}</span>
                <span className={`text-sm font-medium px-2 py-0.5 rounded ${
                  order.status === "delivered" ? "bg-green-100 text-green-700" :
                  order.status === "shipped" ? "bg-blue-100 text-blue-700" :
                  order.status === "cancelled" ? "bg-red-100 text-red-700" :
                  "bg-yellow-100 text-yellow-700"
                }`}>
                  {order.status}
                </span>
              </div>
              <p className="font-medium">${order.total.toFixed(2)}</p>
              <p className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
