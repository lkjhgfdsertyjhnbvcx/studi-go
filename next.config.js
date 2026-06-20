/** @type {import('next').NextConfig} */
const nextConfig = {
  // 複数のlockfile（ホームディレクトリの余分なpackage-lock.json等）があると
  // Turbopackがワークスペースルートを誤検出するため、明示的にこのプロジェクトを指定。
  turbopack: {
    root: __dirname,
  },
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ['firebase-admin'],
};

module.exports = nextConfig;
