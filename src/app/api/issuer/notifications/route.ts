import { NextRequest, NextResponse } from "next/server";
import { pollNotifications } from "@/lib/issuer";

// Wallet polls this endpoint for new credential offers
export async function GET(req: NextRequest) {
  const walletId = req.nextUrl.searchParams.get("wallet_id");
  if (!walletId) {
    return NextResponse.json({ error: "wallet_id required" }, { status: 400 });
  }

  const notifications = pollNotifications(walletId);

  return NextResponse.json({
    notifications,
    count: notifications.length,
  }, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" },
  });
}
