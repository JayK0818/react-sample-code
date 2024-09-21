const path = require('path')
const { override } = require('customize-cra')
const { TanStackRouterWebpack } = require('@tanstack/router-plugin/webpack')

module.exports = override(
  config => {
    config.resolve.alias = {
      '@': path.resolve(__dirname, 'src')
    }
    if (config.mode === 'production') {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          antd: {
            name: 'antd-chunk',
            test: /antd/,
            priority: 100
          },
          vendors: {
            name: 'vendors-chunk',
            test: /node_modules/,
            priority: 90
          }
        }
      }
    }
   config.plugins.push(TanStackRouterWebpack())
    return config
  }
)