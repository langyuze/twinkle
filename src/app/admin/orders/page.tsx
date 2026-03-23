"use client";

import { useEffect, useState } from "react";

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  user: { name: string | null; email: string | null };
  items: { quantity: number; price: number; productVariant: { size: string; color: string; product: { name: string } } }[];
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = () => fetch("/api/admin/orders").then((r) => r.json()).then(setOrders);
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/admin/orders", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold mb-6">Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border rounded-xl overflow-hidden">
            <div
              className="flex items-center justify-between px-4 py-4 cursor-pointer hover:bg-gray-50"
              onClick={() => setExpanded(expanded === order.id ? null : order.id)}
            >
              <div>
                <span className="text-sm text-gray-500">#{order.id.slice(0, 8)}</span>
                <span className="ml-3 font-medium">{order.user?.name || order.user?.email || "Guest"}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium">${order.total.toFixed(2)}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded ${STATUS_COLORS[order.status] || "bg-gray-100"}`}>
                  {order.status}
                </span>
                <span className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {expanded === order.id && (
              <div className="border-t px-4 py-4 bg-gray-50">
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">Items</h4>
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm py-1">
                      <span>{item.productVariant.product.name} ({item.productVariant.size}/{item.productVariant.color}) × {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  {["pending", "shipped", "delivered", "cancelled"].map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(order.id, s)}
                      disabled={order.status === s}
                      className={`px-3 py-1 rounded text-xs font-medium transition ${
                        order.status === s ? "opacity-50 cursor-default" : "hover:opacity-80"
                      } ${STATUS_COLORS[s]}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        {orders.length === 0 && <p className="text-center text-gray-400 py-8">No orders yet</p>}
      </div>
    </div>
  );
}
