/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');

const packagePath = path.resolve('..')

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true
      }
    })
  },
  resolver: {
    nodeModulesPaths: [packagePath, packagePath + '/example/node_modules']
    // rest of metro resolver options...
  },
  watchFolders: [packagePath]
}
