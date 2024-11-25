import type { NextConfig } from "next";
import path from "path";
// const path = require('path')

const nextConfig: NextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    // trailingSlash: false,
    compress: false,
    skipTrailingSlashRedirect: true,
    // output: 'standalone',
    compiler: {
        styledComponents: true
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'src', 'styles')],
    },

    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '**',
            },
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    }
};

export default nextConfig;
