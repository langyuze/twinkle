import { NextRequest, NextResponse } from "next/server";
import { validateAccessToken, issueCredential } from "@/lib/issuer";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "invalid_token" }, { status: 401 });
  }

  const token = authHeader.slice(7);
  const data = validateAccessToken(token);
  if (!data) {
    return NextResponse.json({ error: "invalid_token" }, { status: 401 });
  }

  const credential = await issueCredential(data.credType, data.payload);

  return NextResponse.json({
    credential,
    format: "vc+sd-jwt",
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
