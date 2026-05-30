import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/scale-jpp" : "";
const tutorUrl =
  process.env.NEXT_PUBLIC_TUTOR_URL || "https://scale-jpp-tutor.jgrahamsport16.workers.dev";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_TUTOR_URL: tutorUrl,
  },
};

export default nextConfig;
