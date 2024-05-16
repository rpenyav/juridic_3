const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "auxiliars",

  exposes: {
    // Update this whole line (both, left and right part):
    "./AuxiliarsModule":
      "./projects/auxiliars/src/app/auxiliars/auxiliars.module.ts",
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
  },
});
