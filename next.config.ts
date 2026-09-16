import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    // A restored production cache emitted pre-redesign CSS with current JS.
    // Compile release assets afresh until that cache invalidation is reliable.
    turbopackFileSystemCacheForBuild: false,
  },
};

export default nextConfig;
