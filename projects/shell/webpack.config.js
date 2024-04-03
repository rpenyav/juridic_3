const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  remotes: {
    auxiliar: "auxiliar@http://localhost:4201/remoteEntry.js",
    juridic: "juridic@http://localhost:4202/remoteEntry.js",
  },
  shared: shareAll({
    singleton: true,
    strictVersion: true,
    requiredVersion: "auto",
  }),
});
