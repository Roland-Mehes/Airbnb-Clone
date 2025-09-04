import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Cloudinary host
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // GitHub avatar host
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google avatar host
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
