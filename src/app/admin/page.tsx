"use client";

import { useEffect, useState } from "react";
import { Package, Users, ShoppingCart, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, customers: 0, orders: 0, revenue: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/products").then((r) => r.json()),
      fetch("/api/admin/customers").then((r) => r.json()),
      fetch("/api/admin/orders").then((r) => r.json()),
    ]).then(([products, customers, orders]) => {
      setStats({
        products: products.length || 0,
        customers: customers.length || 0,
        orders: orders.length || 0,
        revenue: (orders || []).reduce((sum: number, o: any) => sum + o.total, 0),
      });
    });
  }, []);

  const cards = [
    { label: "Products", value: stats.products, icon: Package, color: "bg-blue-50 text-blue-600" },
    { label: "Customers", value: stats.customers, icon: Users, color: "bg-green-50 text-green-600" },
    { label: "Orders", value: stats.orders, icon: ShoppingCart, color: "bg-purple-50 text-purple-600" },
    { label: "Revenue", value: `$${stats.revenue.toFixed(2)}`, icon: DollarSign, color: "bg-pink-50 text-pink-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white border rounded-xl p-5">
              <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center mb-3`}>
                <Icon size={20} />
              </div>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-sm text-gray-500">{card.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
