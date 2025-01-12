import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unsplash.it",
        port: "",
        pathname: "/200/200/",
      },
    ],
  },
};

export default nextConfig;
