import { NextRequest, NextResponse } from "next/server";
import { validatePreAuthCode, createAccessToken } from "@/lib/issuer";

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";
  let grantType: string | null = null;
  let preAuthorizedCode: string | null = null;

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const body = await req.text();
    const params = new URLSearchParams(body);
    grantType = params.get("grant_type");
    preAuthorizedCode = params.get("pre-authorized_code");
  } else {
    const body = await req.json();
    grantType = body.grant_type;
    preAuthorizedCode = body["pre-authorized_code"];
  }

  if (grantType !== "urn:ietf:params:oauth:grant-type:pre-authorized_code") {
    return NextResponse.json({ error: "unsupported_grant_type" }, { status: 400 });
  }

  if (!preAuthorizedCode) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const data = validatePreAuthCode(preAuthorizedCode);
  if (!data) {
    return NextResponse.json({ error: "invalid_grant" }, { status: 400 });
  }

  const accessToken = createAccessToken(data.credType, data.payload);

  return NextResponse.json({
    access_token: accessToken,
    token_type: "Bearer",
    expires_in: 600,
  }, {
    headers: { "Access-Control-Allow-Origin": "*", "Cache-Control": "no-store" },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
