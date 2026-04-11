import type { NextConfig } from "next";

const siteBasePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "/Student-Engineer-Design-Portfolio";

const nextConfig: NextConfig = {
  /* config options here */
  // skip strict mode
  reactStrictMode: false,
  output: "export",
  basePath: siteBasePath,
  assetPrefix: siteBasePath ? `${siteBasePath}/` : undefined,
  images: {
    unoptimized: true,
  },
  env: {
    googleAnalyticsId: process.env.NODE_ENV === "production" ? process.env.GA_MEASUREMENT_ID : "",
  }
};

export default nextConfig;
