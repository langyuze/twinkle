import { exportJWK, generateKeyPair, SignJWT, JWK } from "jose";

// In-memory stores
const preAuthCodes = new Map<string, { credType: string; payload: any; expiresAt: number }>();
const accessTokens = new Map<string, { credType: string; payload: any }>();
// Notification queue: walletId → pending credential offers
const notificationQueue = new Map<string, { credentialOffer: any; webWalletUrl: string; credType: string; preview: any }[]>();

let signingKey: CryptoKey | null = null;
let publicJwk: JWK | null = null;

export async function getSigningKeys() {
  if (!signingKey) {
    const keyPair = await generateKeyPair("ES256");
    signingKey = keyPair.privateKey;
    publicJwk = await exportJWK(keyPair.publicKey);
    publicJwk.kid = "twinkle-issuer-key-1";
    publicJwk.alg = "ES256";
    publicJwk.use = "sig";
  }
  return { signingKey: signingKey!, publicJwk: publicJwk! };
}

export function getIssuerUrl() {
  return process.env.NEXTAUTH_URL || "http://localhost:3000";
}

export function getWalletUrl() {
  return process.env.WALLET_URL || "http://localhost:3001";
}

export function createPreAuthCode(credType: string, payload: any) {
  const code = crypto.randomUUID();
  preAuthCodes.set(code, { credType, payload, expiresAt: Date.now() + 10 * 60 * 1000 });
  return code;
}

export function validatePreAuthCode(code: string) {
  const data = preAuthCodes.get(code);
  if (!data) return null;
  if (Date.now() > data.expiresAt) {
    preAuthCodes.delete(code);
    return null;
  }
  preAuthCodes.delete(code);
  return data;
}

export function createAccessToken(credType: string, payload: any) {
  const token = `twinkle_at_${crypto.randomUUID()}`;
  accessTokens.set(token, { credType, payload });
  return token;
}

export function validateAccessToken(token: string) {
  return accessTokens.get(token) || null;
}

// Push a credential offer to a wallet's notification queue
export function pushNotification(walletId: string, offer: { credentialOffer: any; webWalletUrl: string; credType: string; preview: any }) {
  const queue = notificationQueue.get(walletId) || [];
  queue.push(offer);
  notificationQueue.set(walletId, queue);
}

// Poll notifications for a wallet
export function pollNotifications(walletId: string) {
  const queue = notificationQueue.get(walletId) || [];
  notificationQueue.set(walletId, []); // clear after poll
  return queue;
}

export async function issueCredential(credType: string, payload: any) {
  const { signingKey: key } = await getSigningKeys();
  const issuerUrl = getIssuerUrl();
  const now = Math.floor(Date.now() / 1000);

  let claims: any;

  switch (credType) {
    case "TwinkleLoyaltyPass":
      claims = {
        vct: "TwinkleLoyaltyPass",
        iss: issuerUrl,
        iat: now,
        exp: now + 365 * 24 * 60 * 60,
        sub: payload.memberId,
        member_id: payload.memberId,
        member_name: payload.memberName,
        member_email: payload.memberEmail,
        tier: payload.tier,
        points: payload.points,
        store_name: "Twinkle",
        issued_at: new Date().toISOString(),
      };
      break;

    case "TwinkleReceipt":
      claims = {
        vct: "TwinkleReceipt",
        iss: issuerUrl,
        iat: now,
        exp: now + 2 * 365 * 24 * 60 * 60, // 2 years
        sub: payload.orderId,
        order_id: payload.orderId,
        customer_name: payload.customerName,
        customer_email: payload.customerEmail,
        items: payload.items, // array of { name, size, color, qty, price }
        item_count: payload.items.length,
        subtotal: payload.subtotal,
        tax: payload.tax || 0,
        total: payload.total,
        currency: "USD",
        payment_method: payload.paymentMethod || "Stripe (Visa ****4242)",
        store_name: "Twinkle",
        store_url: issuerUrl,
        purchased_at: payload.purchasedAt || new Date().toISOString(),
      };
      break;

    case "TwinklePromotion":
      claims = {
        vct: "TwinklePromotion",
        iss: issuerUrl,
        iat: now,
        exp: now + (payload.expiresInHours || 24) * 60 * 60,
        sub: payload.customerEmail,
        promo_code: payload.promoCode,
        discount_percent: payload.discountPercent,
        discount_type: payload.discountType || "percentage",
        message: payload.message,
        headline: payload.headline || "Don't miss out!",
        cart_items: payload.cartItems, // array of { name, size, color, price, image }
        cart_total: payload.cartTotal,
        discounted_total: payload.discountedTotal,
        customer_name: payload.customerName,
        customer_email: payload.customerEmail,
        expires_at: new Date(Date.now() + (payload.expiresInHours || 24) * 60 * 60 * 1000).toISOString(),
        checkout_url: `${issuerUrl}/cart?promo=${payload.promoCode}`,
        store_name: "Twinkle",
      };
      break;

    default:
      throw new Error(`Unknown credential type: ${credType}`);
  }

  const credential = await new SignJWT(claims)
    .setProtectedHeader({ alg: "ES256", typ: "vc+sd-jwt", kid: "twinkle-issuer-key-1" })
    .sign(key);

  return credential;
}
