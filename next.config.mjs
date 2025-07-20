import "dotenv/config";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: "build",
  compiler: {
    styledComponents: true,
    removeConsole: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "127.0.0.1",
        port: "1338",
      },
    ],
  },
  env: {
    LOCAL_STRAPI_ADDRESS: process.env.LOCAL_STRAPI_ADDRESS,
    DEPLOY_STRAPI_ADDRESS: process.env.LOCAL_STRAPI_ADDRESS,
  },
};

export default nextConfig;
