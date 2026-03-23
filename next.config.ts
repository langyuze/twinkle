import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["verifiedbygoogle.com", "wallet.verifiedbygoogle.com"],
  async rewrites() {
    return [
      { source: "/deck", destination: "/deck/index.html" },
      { source: "/deck/", destination: "/deck/index.html" },
    ];
  },
};

export default nextConfig;
