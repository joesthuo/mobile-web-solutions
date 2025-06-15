import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com',  'upload.wikimedia.org',
      'static.figma.com',
      'www.php.net',
      'azure.microsoft.com',
      'raw.githubusercontent.com',
      'github.githubassets.com'],
     // Add your image domains here
  },
  experimental: {
    esmExternals: 'loose', // Required for Three.js and other ESM packages
    serverComponentsExternalPackages: ['three'], // For Three.js SSR compatibility
  },
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
  // Enable compiler for styled-components if you're using them
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;