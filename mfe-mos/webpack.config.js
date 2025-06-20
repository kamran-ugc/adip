const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const { Script } = require("vm");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, './tsconfig.json'),
  [/* mapped paths to share */]);

const moduleFederationPlugin = new ModuleFederationPlugin({
  name: "mosApp",
  filename: "remoteEntry.js",
  exposes: {
    './MosModule': './src/app/mos/mos.module.ts',
  },
  shared: share({
    "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/platform-browser": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/platform-browser-dynamic": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/animations": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/cdk": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/material": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    ...sharedMappings.getDescriptors()
  })
});

module.exports = {
  mode: "development",
  devServer: {
    port: 4800, // MOS port
    host: '0.0.0.0', // Docker-style host binding
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },
  output: {
    uniqueName: "mosApp",
    publicPath: "auto",
    scriptType: 'text/javascript'
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    moduleFederationPlugin,
    sharedMappings.getPlugin()
  ],
};