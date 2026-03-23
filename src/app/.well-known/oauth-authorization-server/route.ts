import { NextResponse } from "next/server";
import { getIssuerUrl } from "@/lib/issuer";

export async function GET() {
  const issuerUrl = getIssuerUrl();

  const metadata = {
    issuer: issuerUrl,
    token_endpoint: `${issuerUrl}/api/issuer/token`,
    response_types_supported: ["token"],
    grant_types_supported: ["urn:ietf:params:oauth:grant-type:pre-authorized_code"],
    pre_authorized_grant_anonymous_access_supported: true,
  };

  return NextResponse.json(metadata, {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
}
