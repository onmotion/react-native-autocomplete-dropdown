const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

const path = require('path')

const packagePath = path.resolve('..')

const config = {
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

module.exports = mergeConfig(getDefaultConfig(__dirname), config)
