/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const packagePath = '/Users/alexandrkozhevnikov/projects/react-native-autocomplete-dropdown'

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
