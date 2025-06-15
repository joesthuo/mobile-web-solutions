import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'source.unsplash.com',
      'upload.wikimedia.org',
      'static.figma.com',
      'www.php.net',
      'azure.microsoft.com',
      'raw.githubusercontent.com',
      'github.githubassets.com',
      'i.pravatar.cc', // Added for Testimonials.tsx avatars
    ],
  },
  serverExternalPackages: ['three'],
  webpack: (config, { isServer }) => {
    // Add GLSL loader
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
      exclude: /node_modules/,
    });

    // Important: return the modified config
    return config;
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;