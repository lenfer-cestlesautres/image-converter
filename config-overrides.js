const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = function override(config, env) {
  console.log(config);

  config.resolve.fallback = {
    fs: false,
    tls: false,
    net: false,
    path: false,
    zlib: false,
    http: false,
    https: false,
    stream: false,
    crypto: false,
  };

  config.plugins.push(
    new CopyPlugin(
      [
        {
          from: "node_modules/webp-encoder/lib/assets/a.out.wasm",
          to: "static/js",
        },
      ],
    )
  );

  return config;
};
