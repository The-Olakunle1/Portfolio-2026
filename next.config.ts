import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: 'asset/source',
    });
    return config;
  },
  // Silence Turbopack warning as we rely on Webpack for shaders
  // @ts-ignore - turbopack key is used by Next.js 16 to resolve build conflicts
  turbopack: {},
};

export default nextConfig;
