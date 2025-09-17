import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // ⚠️ Warnings will still show locally,
    // but won't break the build/deploy.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
