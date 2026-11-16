import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  allowedDevOrigins: ["192.168.1.7", "127.0.0.1", "localhost"],
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei", "@react-three/rapier", "meshline"],
  experimental: {
    optimizePackageImports: ["@react-three/drei", "@react-three/fiber"],
  },
};

export default nextConfig;
