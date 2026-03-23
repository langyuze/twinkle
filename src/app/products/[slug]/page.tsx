import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductDetail from "./ProductDetail";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { variants: true },
  });

  if (!product) notFound();

  return <ProductDetail product={product} />;
}
