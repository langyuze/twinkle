import { NextRequest, NextResponse } from "next/server";
import { createPreAuthCode, getIssuerUrl, getWalletUrl, pushNotification } from "@/lib/issuer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { orderId, customerName, customerEmail, items, subtotal, tax, total, paymentMethod, purchasedAt } = body;

  if (!orderId || !customerEmail || !items) {
    return NextResponse.json({ error: "orderId, customerEmail, and items required" }, { status: 400 });
  }

  const payload = { orderId, customerName, customerEmail, items, subtotal, tax, total, paymentMethod, purchasedAt };
  const preAuthCode = createPreAuthCode("TwinkleReceipt", payload);
  const issuerUrl = getIssuerUrl();

  const credentialOffer = {
    credential_issuer: issuerUrl,
    credential_configuration_ids: ["TwinkleReceipt"],
    grants: {
      "urn:ietf:params:oauth:grant-type:pre-authorized_code": {
        "pre-authorized_code": preAuthCode,
      },
    },
  };

  const walletUrl = getWalletUrl();
  const webWalletUrl = `${walletUrl}/receive?credential_offer=${encodeURIComponent(JSON.stringify(credentialOffer))}`;

  // Push to wallet notification queue
  const walletId = customerEmail; // use email as wallet identifier
  pushNotification(walletId, {
    credentialOffer,
    webWalletUrl,
    credType: "TwinkleReceipt",
    preview: {
      title: "Purchase Receipt",
      subtitle: `Order #${orderId.slice(0, 8)}`,
      message: `Your receipt for $${total.toFixed(2)} is ready`,
      icon: "receipt",
      total,
      itemCount: items.length,
    },
  });

  return NextResponse.json({
    credentialOffer, webWalletUrl, orderId,
  }, { headers: { "Access-Control-Allow-Origin": "*" } });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" },
  });
}
