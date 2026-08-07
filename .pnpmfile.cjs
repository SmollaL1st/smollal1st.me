module.exports = {
  hooks: {
    readPackage(pkg, context) {
      if (pkg.dependencies && pkg.dependencies.postcss) {
        pkg.dependencies.postcss = '8.4.49';
      }
      if (pkg.devDependencies && pkg.devDependencies.postcss) {
        pkg.devDependencies.postcss = '8.4.49';
      }
      return pkg;
    }
  }
};
