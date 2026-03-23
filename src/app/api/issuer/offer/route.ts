import { NextRequest, NextResponse } from "next/server";
import { createPreAuthCode, getIssuerUrl, getWalletUrl, pushNotification } from "@/lib/issuer";

function buildOffer(credConfigId: string, preAuthCode: string) {
  const issuerUrl = getIssuerUrl();
  const walletUrl = getWalletUrl();
  const credentialOffer = {
    credential_issuer: issuerUrl,
    credential_configuration_ids: [credConfigId],
    grants: {
      "urn:ietf:params:oauth:grant-type:pre-authorized_code": {
        "pre-authorized_code": preAuthCode,
      },
    },
  };
  const webWalletUrl = `${walletUrl}/receive?credential_offer=${encodeURIComponent(JSON.stringify(credentialOffer))}`;
  return { credentialOffer, webWalletUrl };
}

// Membership offer
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { memberName, memberEmail } = body;

  if (!memberName || !memberEmail) {
    return NextResponse.json({ error: "memberName and memberEmail required" }, { status: 400 });
  }

  const memberId = `TWK-${Date.now().toString(36).toUpperCase()}`;
  const payload = { memberId, memberName, memberEmail, tier: "Gold", points: 500 };
  const preAuthCode = createPreAuthCode("TwinkleLoyaltyPass", payload);
  const { credentialOffer, webWalletUrl } = buildOffer("TwinkleLoyaltyPass", preAuthCode);

  return NextResponse.json({
    credentialOffer, webWalletUrl, memberId, tier: "Gold", points: 500,
  }, { headers: { "Access-Control-Allow-Origin": "*" } });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
