"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Package, Users, ShoppingCart, LayoutDashboard, Send } from "lucide-react";

const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") || [];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === "loading") return <div className="py-20 text-center text-gray-400">Loading...</div>;

  // Client-side check — real protection is on API routes
  if (!session) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-serif font-bold mb-4">Admin Access Required</h1>
        <Link href="/auth/signin" className="text-pink-400 font-medium">Sign In →</Link>
      </div>
    );
  }

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { href: "/admin/customers", label: "Customers", icon: Users },
    { href: "/admin/push", label: "Push to Wallet", icon: Send },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <nav className="w-48 flex-shrink-0 hidden md:block">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Admin</h2>
          <div className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                    active ? "bg-pink-50 text-pink-600" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={18} />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
