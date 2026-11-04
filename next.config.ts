import type { NextConfig } from "next";

function supabaseStorageImagePatterns(): NonNullable<NextConfig["images"]>["remotePatterns"] {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!raw) return [];
  try {
    const { hostname } = new URL(raw);
    return [{ protocol: "https", hostname, pathname: "/storage/v1/object/public/nvba-media/**" }];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseStorageImagePatterns(),
  },
  async redirects() {
    return [
      { source: "/pro-shop", destination: "/", permanent: true },
      { source: "/store", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
