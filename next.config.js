/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");
const withMDX = require("@next/mdx")();

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPlugins([withMDX], {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          options: {},
        },
      ],
    });

    return config;
  },
});
