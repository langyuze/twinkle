import { NextResponse } from "next/server";
import { getSigningKeys, getIssuerUrl } from "@/lib/issuer";

export async function GET() {
  const { publicJwk } = await getSigningKeys();
  const issuerUrl = getIssuerUrl();

  const metadata = {
    credential_issuer: issuerUrl,
    credential_endpoint: `${issuerUrl}/api/issuer/credential`,
    display: [
      {
        name: "Twinkle",
        locale: "en-US",
        logo: {
          uri: `${issuerUrl}/twinkle-logo.png`,
          alt_text: "Twinkle Logo",
        },
        description: "K-pop inspired fashion store",
      },
    ],
    credential_configurations_supported: {
      TwinkleLoyaltyPass: {
        format: "vc+sd-jwt",
        vct: "TwinkleLoyaltyPass",
        scope: "TwinkleLoyaltyPass",
        cryptographic_binding_methods_supported: ["jwk"],
        credential_signing_alg_values_supported: ["ES256"],
        display: [
          {
            name: "Twinkle Loyalty Pass",
            locale: "en-US",
            logo: { uri: `${issuerUrl}/twinkle-logo.png`, alt_text: "Twinkle" },
            description: "Twinkle K-pop Fashion membership loyalty pass",
            background_color: "#E8A0BF",
            text_color: "#FFFFFF",
          },
        ],
        claims: {
          member_id: { display: [{ name: "Member ID", locale: "en-US" }] },
          member_name: { display: [{ name: "Member Name", locale: "en-US" }] },
          member_email: { display: [{ name: "Email", locale: "en-US" }] },
          tier: { display: [{ name: "Tier", locale: "en-US" }] },
          points: { display: [{ name: "Points", locale: "en-US" }] },
          store_name: { display: [{ name: "Store", locale: "en-US" }] },
        },
      },
      TwinkleReceipt: {
        format: "vc+sd-jwt",
        vct: "TwinkleReceipt",
        scope: "TwinkleReceipt",
        cryptographic_binding_methods_supported: ["jwk"],
        credential_signing_alg_values_supported: ["ES256"],
        display: [
          {
            name: "Twinkle Receipt",
            locale: "en-US",
            logo: { uri: `${issuerUrl}/twinkle-logo.png`, alt_text: "Twinkle" },
            description: "Digital purchase receipt from Twinkle",
            background_color: "#1a1a1a",
            text_color: "#FFFFFF",
          },
        ],
        claims: {
          order_id: { display: [{ name: "Order ID", locale: "en-US" }] },
          customer_name: { display: [{ name: "Customer", locale: "en-US" }] },
          customer_email: { display: [{ name: "Email", locale: "en-US" }] },
          items: { display: [{ name: "Items", locale: "en-US" }] },
          subtotal: { display: [{ name: "Subtotal", locale: "en-US" }] },
          total: { display: [{ name: "Total", locale: "en-US" }] },
          payment_method: { display: [{ name: "Payment", locale: "en-US" }] },
        },
      },
      TwinklePromotion: {
        format: "vc+sd-jwt",
        vct: "TwinklePromotion",
        scope: "TwinklePromotion",
        cryptographic_binding_methods_supported: ["jwk"],
        credential_signing_alg_values_supported: ["ES256"],
        display: [
          {
            name: "Twinkle Promotion",
            locale: "en-US",
            logo: { uri: `${issuerUrl}/twinkle-logo.png`, alt_text: "Twinkle" },
            description: "Exclusive promotional offer from Twinkle",
            background_color: "#FF6B6B",
            text_color: "#FFFFFF",
          },
        ],
        claims: {
          promo_code: { display: [{ name: "Promo Code", locale: "en-US" }] },
          discount_percent: { display: [{ name: "Discount", locale: "en-US" }] },
          message: { display: [{ name: "Message", locale: "en-US" }] },
          cart_items: { display: [{ name: "Cart Items", locale: "en-US" }] },
          expires_at: { display: [{ name: "Expires", locale: "en-US" }] },
        },
      },
    },
    jwks: {
      keys: [publicJwk],
    },
  };

  return NextResponse.json(metadata, {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
}
