import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow local network access to dev assets to avoid cross-origin warnings in dev
  // See: https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://192.168.112.1:3000",
  ],
  images: {
    // Avoid proxying remote images through /_next/image in dev to reduce upstream 403/404 noise
    // and fetch directly from the browser instead.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "d1.awsstatic.com" },
      { protocol: "https", hostname: "static.redhat.com" },
      { protocol: "https", hostname: "images.credly.com" },
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
