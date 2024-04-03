const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "auxiliar",

  exposes: {
    // Update this whole line (both, left and right part):
    "./AuxiliarModule":
      "./projects/auxiliars/src/app/auxiliars/auxiliar.module.ts",
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
  },
});
