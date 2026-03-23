import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function isAdmin() {
  const session = await getServerSession(authOptions);
  const adminEmails = (process.env.ADMIN_EMAILS || "").split(",").map((e) => e.trim());
  return session?.user?.email && adminEmails.includes(session.user.email);
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const customers = await prisma.user.findMany({
    include: {
      orders: {
        include: { items: { include: { productVariant: { include: { product: true } } } } },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const result = customers.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    image: c.image,
    role: c.role,
    createdAt: c.createdAt,
    orderCount: c.orders.length,
    totalSpent: c.orders.reduce((sum, o) => sum + o.total, 0),
    orders: c.orders,
  }));

  return NextResponse.json(result);
}
