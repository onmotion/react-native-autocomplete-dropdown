const path = require('path')
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')

const packagePath = path.resolve('..')

/**
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  projectRoot: path.resolve(__dirname, '.'),
  watchFolders: [packagePath],
  resetCache: true,
  resolver: {
    nodeModulesPaths: [packagePath + '/example/node_modules'],
    blockList: [/(\/react-native-autocomplete-dropdown\/node_modules\/.*)$/],
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
}

module.exports = mergeConfig(getDefaultConfig(__dirname), config)
