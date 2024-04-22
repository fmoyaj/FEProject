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

    /* Optional natural deps */
    config.plugins.push(new webpack.IgnorePlugin({
      resourceRegExp: /webworker-threads/
    }));
    config.plugins.push(new webpack.IgnorePlugin({
      resourceRegExp: /pg-native/
    }));

    return config;
  }
};

export default nextConfig;
