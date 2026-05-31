import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  deploymentId: process.env.DEPLOYMENT_VERSION,
  images: {
    qualities: [70, 75],
  },
};

export default nextConfig;
