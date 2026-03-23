"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

interface Customer {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string;
  createdAt: string;
  orderCount: number;
  totalSpent: number;
}

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/admin/customers").then((r) => r.json()).then(setCustomers);
  }, []);

  const filtered = customers.filter(
    (c) =>
      !search ||
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const header = "Name,Email,Orders,Total Spent,Joined\n";
    const rows = filtered.map((c) =>
      `"${c.name || ""}","${c.email || ""}",${c.orderCount},${c.totalSpent.toFixed(2)},${new Date(c.createdAt).toLocaleDateString()}`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "twinkle-customers.csv";
    a.click();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold">Customers</h1>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      <input
        placeholder="Search customers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg text-sm mb-6 focus:outline-none focus:border-pink-300"
      />

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Orders</th>
              <th className="px-4 py-3 font-medium">Total Spent</th>
              <th className="px-4 py-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {c.image && <img src={c.image} alt="" className="w-8 h-8 rounded-full" />}
                    <span className="font-medium">{c.name || "—"}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500">{c.email}</td>
                <td className="px-4 py-3">{c.orderCount}</td>
                <td className="px-4 py-3 font-medium">${c.totalSpent.toFixed(2)}</td>
                <td className="px-4 py-3 text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-gray-400 py-8">No customers found</p>}
      </div>
    </div>
  );
}
