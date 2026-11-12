import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  // cacheComponents: true,
  // partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
	 async rewrites() {
    return [
      {
        source: "/models/c41.glb",
        destination: "https://d8wojkg2185gh.cloudfront.net/strapi/C41_QS_a3f9c78cdb.glb",
      },
    ];
  },
};

export default nextConfig;
