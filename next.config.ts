/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "omnipressence.com",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
