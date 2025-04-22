const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, "./tsconfig.json"), [
  /* mapped paths to share */
]);

module.exports = {
  output: {
    uniqueName: "hostApp",
    publicPath: "auto",
    scriptType: "text/javascript",
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      // For remotes (please adjust)
      name: "hostApp",
      remotes: {
        dashboardApp: "http://localhost:4100/remoteEntry.js",
        admApp: "http://localhost:4200/remoteEntry.js",
        administrationApp: "http://localhost:4300/remoteEntry.js",
        agisApp: "http://localhost:4400/remoteEntry.js",
        amrApp: "http://localhost:4500/remoteEntry.js",
        ramApp: "http://localhost:4600/remoteEntry.js",
        rimApp: "http://localhost:4700/remoteEntry.js",
      },
      shared: share({
        "@angular/core": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@angular/common": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@angular/common/http": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@angular/router": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        jquery: {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "slick-carousel": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        ...sharedMappings.getDescriptors(),
      }),
    }),
    sharedMappings.getPlugin(),
  ],
};
