import { NextRequest, NextResponse } from "next/server";
import { createPreAuthCode, getIssuerUrl, getWalletUrl, pushNotification } from "@/lib/issuer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    customerName, customerEmail, cartItems, cartTotal,
    discountPercent = 20, expiresInHours = 2,
    headline, message,
  } = body;

  if (!customerEmail || !cartItems || cartItems.length === 0) {
    return NextResponse.json({ error: "customerEmail and cartItems required" }, { status: 400 });
  }

  const promoCode = `TWINKLE${discountPercent}-${Date.now().toString(36).toUpperCase()}`;
  const discountedTotal = cartTotal * (1 - discountPercent / 100);

  const payload = {
    promoCode,
    discountPercent,
    discountType: "percentage",
    headline: headline || `${discountPercent}% off — just for you ✦`,
    message: message || `Hey ${customerName || "there"}! You left some amazing pieces in your cart. Come back and save ${discountPercent}% — but hurry, this offer expires in ${expiresInHours} hours!`,
    cartItems,
    cartTotal,
    discountedTotal: Math.round(discountedTotal * 100) / 100,
    customerName,
    customerEmail,
    expiresInHours,
  };

  const preAuthCode = createPreAuthCode("TwinklePromotion", payload);
  const issuerUrl = getIssuerUrl();

  const credentialOffer = {
    credential_issuer: issuerUrl,
    credential_configuration_ids: ["TwinklePromotion"],
    grants: {
      "urn:ietf:params:oauth:grant-type:pre-authorized_code": {
        "pre-authorized_code": preAuthCode,
      },
    },
  };

  const walletUrl = getWalletUrl();
  const webWalletUrl = `${walletUrl}/receive?credential_offer=${encodeURIComponent(JSON.stringify(credentialOffer))}`;

  // Push to wallet
  pushNotification(customerEmail, {
    credentialOffer,
    webWalletUrl,
    credType: "TwinklePromotion",
    preview: {
      title: `${discountPercent}% Off Your Cart`,
      subtitle: `${cartItems.length} item${cartItems.length > 1 ? "s" : ""} waiting`,
      message: `Save $${(cartTotal - discountedTotal).toFixed(2)} — expires in ${expiresInHours}h`,
      icon: "promo",
      discountPercent,
      discountedTotal,
      expiresAt: new Date(Date.now() + expiresInHours * 60 * 60 * 1000).toISOString(),
    },
  });

  return NextResponse.json({
    credentialOffer, webWalletUrl, promoCode, discountPercent, discountedTotal,
    expiresAt: new Date(Date.now() + expiresInHours * 60 * 60 * 1000).toISOString(),
  }, { headers: { "Access-Control-Allow-Origin": "*" } });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" },
  });
}
