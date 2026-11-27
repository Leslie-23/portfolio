import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // lets a phone on the same Wi-Fi open the dev server (http://<this computer's address>:3000) to test on a real device
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.16.*.*"],
  // the old site had more routes; their content now lives in Work and About
  async redirects() {
    return [
      { source: "/bench", destination: "/work?filter=Tools", permanent: true },
      { source: "/archive", destination: "/work", permanent: true },
      { source: "/toolkit", destination: "/about", permanent: true },
      { source: "/infra", destination: "/about", permanent: true },
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
