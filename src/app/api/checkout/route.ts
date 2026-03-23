import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { items, guestEmail, autoEnrollMembership } = await req.json();

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  // Try authenticated user first, fall back to guest email
  const session = await getServerSession(authOptions);
  let userId: string;

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    userId = user.id;
  } else if (guestEmail) {
    // Find or create guest user
    let user = await prisma.user.findUnique({ where: { email: guestEmail } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: guestEmail,
          name: guestEmail.split("@")[0],
          role: "customer",
        },
      });
    }
    userId = user.id;
  } else {
    return NextResponse.json({ error: "Email required for checkout" }, { status: 400 });
  }

  // Build line items for Stripe
  const lineItems = items.map((item: any) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: `${item.name} (${item.size} / ${item.color})`,
        images: item.image ? [item.image] : [],
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const total = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

  // Create order
  const order = await prisma.order.create({
    data: {
      userId,
      total,
      status: "pending",
      items: {
        create: items.map((item: any) => ({
          productVariantId: item.variantId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.NEXTAUTH_URL}/checkout/success?order=${order.id}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
    customer_email: guestEmail || session?.user?.email || undefined,
    metadata: { orderId: order.id, autoEnrollMembership: autoEnrollMembership ? "true" : "false" },
  });

  // Update order with stripe session id
  await prisma.order.update({
    where: { id: order.id },
    data: { stripeSessionId: stripeSession.id },
  });

  return NextResponse.json({ url: stripeSession.url });
}
