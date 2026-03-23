import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      items: { include: { productVariant: { include: { product: true } } } },
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Fetch Stripe session metadata if available
  let autoEnrollMembership = false;
  if ((order as any).stripeSessionId) {
    try {
      const stripeSession = await stripe.checkout.sessions.retrieve((order as any).stripeSessionId);
      autoEnrollMembership = stripeSession.metadata?.autoEnrollMembership === "true";
    } catch {}
  }

  return NextResponse.json({ ...order, autoEnrollMembership });
}
