const path = require('path')
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

const packagePath = path.resolve('..')

const config = {
  //   resolver: {
  //     nodeModulesPaths: [packagePath + '/example/node_modules', packagePath, packagePath + '/..'],
  //     // rest of metro resolver options...
  //   },
  watchFolders: [packagePath, packagePath + '/example'],
}

module.exports = mergeConfig(getDefaultConfig(__dirname), config)
