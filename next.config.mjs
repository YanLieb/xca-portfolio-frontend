/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "strapi",
        port: "1337",
        pathname: "/uploads/**"
      },
      {
        protocol: "https",
        hostname: "xca-portfolio-strapi.up.railway.app",
        pathname: "/uploads/**"
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
