import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    experimental: {
        reactCompiler: true,
        ppr: true,
        viewTransition: true,
        useCache: true,
    },
    typedRoutes: true,
    images: {
        remotePatterns: [
            {
                hostname: "i.scdn.co",
                protocol: "https",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
