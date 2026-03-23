"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Sparkles, Wallet, QrCode, ExternalLink } from "lucide-react";

export default function MembershipPage() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [loading, setLoading] = useState(false);
  const [offer, setOffer] = useState<any>(null);
  const [error, setError] = useState("");

  const handleJoin = async () => {
    if (!name || !email) {
      setError("Please enter your name and email");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/issuer/offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberName: name, memberEmail: email }),
      });
      const data = await res.json();
      setOffer(data);
    } catch {
      setError("Failed to create membership. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 text-pink-500 text-sm font-medium mb-6">
          <Sparkles size={16} /> Loyalty Program
        </div>
        <h1 className="text-4xl font-serif font-bold mb-4">Twinkle Membership</h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Join our loyalty program and save your membership pass as a verifiable credential to your digital wallet.
        </p>
      </div>

      {!offer ? (
        /* Sign up form */
        <div className="bg-white border rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-serif font-bold mb-6">Join & Get Your Digital Pass</h2>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-pink-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-pink-300"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            onClick={handleJoin}
            disabled={loading}
            className="w-full py-4 rounded-full text-white font-medium hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ backgroundColor: "#E8A0BF" }}
          >
            {loading ? "Creating membership..." : (
              <>
                <Sparkles size={18} /> Join Twinkle Membership
              </>
            )}
          </button>

          {/* Benefits */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-sm font-semibold mb-3">Member Benefits</h3>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">✦ 500 welcome points</div>
              <div className="flex items-center gap-2">✦ Gold tier status</div>
              <div className="flex items-center gap-2">✦ Early access to drops</div>
              <div className="flex items-center gap-2">✦ Exclusive K-pop collabs</div>
              <div className="flex items-center gap-2">✦ Birthday rewards</div>
              <div className="flex items-center gap-2">✦ Verifiable credential pass</div>
            </div>
          </div>
        </div>
      ) : (
        /* Success — show credential offer */
        <div className="space-y-6">
          {/* Membership card preview */}
          <div className="rounded-2xl overflow-hidden shadow-lg" style={{ background: "linear-gradient(135deg, #E8A0BF 0%, #c77dba 50%, #a855a0 100%)" }}>
            <div className="p-8 text-white">
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-serif font-bold tracking-wide">✦ TWINKLE</span>
                <span className="text-xs font-medium px-3 py-1 bg-white/20 rounded-full">{offer.tier} Member</span>
              </div>
              <div className="mb-6">
                <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Member</p>
                <p className="text-xl font-bold">{name}</p>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Member ID</p>
                  <p className="font-mono text-sm">{offer.memberId}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Points</p>
                  <p className="text-2xl font-bold">{offer.points}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Save to wallet button */}
          <a
            href={offer.webWalletUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-full text-white font-medium hover:opacity-90 transition flex items-center justify-center gap-3 text-lg"
            style={{ backgroundColor: "#1a1a1a" }}
          >
            <Wallet size={22} />
            Save to Digital Wallet
            <ExternalLink size={16} />
          </a>

          <p className="text-center text-xs text-gray-400">
            This will issue a verifiable credential (SD-JWT VC) via OpenID4VCI protocol to your digital wallet.
          </p>

          {/* Technical details (collapsible) */}
          <details className="bg-gray-50 rounded-xl p-4">
            <summary className="text-sm font-medium text-gray-600 cursor-pointer">OpenID4VCI Technical Details</summary>
            <div className="mt-3 space-y-2 text-xs font-mono text-gray-500 break-all">
              <p><strong>Protocol:</strong> OpenID for Verifiable Credential Issuance (OID4VCI)</p>
              <p><strong>Flow:</strong> Pre-Authorized Code</p>
              <p><strong>Format:</strong> vc+sd-jwt</p>
              <p><strong>Credential Type:</strong> TwinkleLoyaltyPass</p>
              <p><strong>Issuer:</strong> {offer.credentialOffer.credential_issuer}</p>
              <p><strong>Credential Offer:</strong></p>
              <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-xs">{JSON.stringify(offer.credentialOffer, null, 2)}</pre>
            </div>
          </details>
        </div>
      )}
    </div>
  );
}
