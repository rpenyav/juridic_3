const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "juridic",

  exposes: {
    // Update this whole line (both, left and right part):
    "./JuridicModule": "./projects/juridic/src/app/juridic/juridic.module.ts",
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
  },
});
