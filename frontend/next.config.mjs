import path from "path";
import { fileURLToPath } from "url";
import { fa } from "zod/v4/locales";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // ✅ Use absolute path so alias works in Vercel too
    //config.resolve.alias["@"] = path.resolve(__dirname);
    config.resolve.alias["@"] = path.join(__dirname, "src");
    return config;
  },
};

export default nextConfig;
