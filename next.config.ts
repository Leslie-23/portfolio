import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // the old site had more routes; their content now lives in Work and About
  async redirects() {
    return [
      { source: "/bench", destination: "/work?filter=Tools", permanent: true },
      { source: "/archive", destination: "/work", permanent: true },
      { source: "/toolkit", destination: "/about", permanent: true },
      { source: "/infra", destination: "/about", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
