import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  cacheComponents: true,
  images: {
    remotePatterns: [
      // Cloudinary
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      // Urls de avatars
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        pathname: "/api/**",
      },
    ],
  },
};

export default nextConfig;
