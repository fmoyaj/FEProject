/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: function (config, { webpack }) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
      tls: false,
      fs: false,
      net: false,
      dns: false
    });

    config.resolve.fallback = fallback;

    return config;
  }
};

export default nextConfig;
