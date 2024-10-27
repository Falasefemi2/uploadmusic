/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Set this to your desired limit
    },
  },

  images: {
    remotePatterns: [{ hostname: "utfs.io" }],
  },
};

export default nextConfig;
