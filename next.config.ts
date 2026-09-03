import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No `output: "export"` on purpose — phase two adds POST /api/leads, which
  // needs a serverless route. The landing page itself still prerenders
  // statically because it fetches nothing at request time.
};

export default nextConfig;
