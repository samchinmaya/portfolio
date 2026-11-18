import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // комп's static site lives in public/komp; serve its page at /komp and /komp/
  async rewrites() {
    return [
      { source: "/komp", destination: "/komp/index.html" },
      { source: "/komp/", destination: "/komp/index.html" },
    ];
  },
  async headers() {
    return [
      // open to anyone with the link, but kept out of search results
      {
        source: "/Chinmaya_Samantara_Resume.pdf",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
