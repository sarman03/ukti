import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['buocglmujbldrthkofvu.supabase.co'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
};

export default nextConfig;
