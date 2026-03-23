import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const featured = searchParams.get("featured");

  const where: any = {};
  if (category) where.category = category;
  if (featured === "true") where.featured = true;
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { description: { contains: search } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    include: { variants: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}
