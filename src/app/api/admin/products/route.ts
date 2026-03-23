import { NextRequest, NextResponse } from "next/server";
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

  const products = await prisma.product.findMany({
    include: { variants: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const data = await req.json();
  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const product = await prisma.product.create({
    data: {
      name: data.name,
      slug,
      description: data.description,
      price: data.price,
      compareAtPrice: data.compareAtPrice || null,
      category: data.category,
      images: JSON.stringify(data.images || []),
      featured: data.featured || false,
      variants: {
        create: (data.variants || []).map((v: any) => ({
          size: v.size,
          color: v.color,
          sku: v.sku || `${slug}-${v.size}-${v.color}`.toUpperCase(),
          stock: v.stock || 0,
        })),
      },
    },
    include: { variants: true },
  });

  return NextResponse.json(product);
}

export async function PUT(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const data = await req.json();
  const { id, variants, ...productData } = data;

  if (productData.images && Array.isArray(productData.images)) {
    productData.images = JSON.stringify(productData.images);
  }

  const product = await prisma.product.update({
    where: { id },
    data: productData,
    include: { variants: true },
  });

  return NextResponse.json(product);
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await req.json();
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
