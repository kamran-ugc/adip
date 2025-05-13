const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const { Script } = require("vm");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, "./tsconfig.json"), [
  /* mapped paths to share */
]);

const moduleFederationPlugin = new ModuleFederationPlugin({
  name: "ramApp",
  filename: "remoteEntry.js",
  exposes: {
    "./RamModule": "./src/app/modules/ram/ram.module.ts",
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
    ...sharedMappings.getDescriptors(),
  }),
});

module.exports = {
  output: {
    uniqueName: "ramApp",
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
  plugins: [moduleFederationPlugin, sharedMappings.getPlugin()],
};
