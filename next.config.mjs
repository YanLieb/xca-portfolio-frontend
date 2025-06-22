/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "strapi",
        port: "1337",
        pathname: "/**"
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1338",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "natural-friendship-4e4392b7e4.media.strapiapp.com",
        pathname: "/**"
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
